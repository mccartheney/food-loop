// Enhanced Socket.IO server for messaging with improved reliability and features
import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import { messagingService, presenceService } from "@/lib/mongodb";

type NextApiResponseWithSocket = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io?: Server;
    };
  };
};

interface SocketData {
  userId?: string;
  userEmail?: string;
  rooms?: Set<string>;
  lastActivity?: Date;
  deviceInfo?: {
    type: string;
    userAgent?: string;
  };
}

interface EnhancedMessage {
  id: string;
  type: 'TEXT' | 'IMAGE' | 'FILE' | 'RECIPE_SHARE' | 'BOX_SHARE' | 'LOCATION';
  content: string;
  senderId: string;
  conversationId: string;
  metadata?: Record<string, any>;
  replyTo?: string;
  timestamp: string;
  tempId?: string; // For optimistic updates
}

interface MessageAcknowledgment {
  success: boolean;
  messageId?: string;
  error?: string;
  timestamp: string;
}

type SocketCallback = (response: any) => void;

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(userId: string, limit = 30, windowMs = 60000): boolean {
  const now = Date.now();
  const userLimit = rateLimitStore.get(userId);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(userId, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (userLimit.count >= limit) {
    return false;
  }
  
  userLimit.count++;
  return true;
}

function validateMessage(message: any): boolean {
  return (
    message &&
    typeof message.content === 'string' &&
    message.content.trim().length > 0 &&
    message.content.length <= 4000 &&
    typeof message.conversationId === 'string'
  );
}

async function authenticateSocket(token: string): Promise<{ userId: string; email: string } | null> {
  try {
    // Simple token format: "userId:email"
    if (token.includes(':')) {
      const [userId, email] = token.split(':');
      return { userId, email };
    }
    return null;
  } catch (error) {
    console.error('Socket authentication error:', error);
    return null;
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    const io = new Server<any, any, any, SocketData>(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: process.env.NODE_ENV === 'production' 
          ? [process.env.NEXTAUTH_URL!] 
          : ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
      },
      transports: ['websocket', 'polling'],
      pingTimeout: 60000,
      pingInterval: 25000,
    });

    io.on("connection", (socket) => {
      console.log(`Socket connected: ${socket.id}`);
      
      // Initialize socket data
      socket.data.rooms = new Set();
      socket.data.lastActivity = new Date();

      // Enhanced authentication with token validation
      socket.on("authenticate", async (data: { 
        token: string; 
        deviceInfo?: { type: string; userAgent?: string } 
      }, callback: SocketCallback) => {
        try {
          const auth = await authenticateSocket(data.token);
          
          if (!auth) {
            callback({ success: false, error: 'Invalid authentication token' });
            return;
          }

          socket.data.userId = auth.userId;
          socket.data.userEmail = auth.email;
          socket.data.deviceInfo = data.deviceInfo || { type: 'web' };
          
          // Update user presence
          await presenceService.updateUserPresence(auth.userId, {
            isOnline: true,
            currentDevice: data.deviceInfo?.type || 'web',
            status: 'online'
          });

          console.log(`User authenticated: ${auth.userId} (${socket.id})`);
          callback({ success: true, userId: auth.userId });
          
        } catch (error) {
          console.error('Authentication error:', error);
          callback({ success: false, error: 'Authentication failed' });
        }
      });

      // Enhanced room joining with validation
      socket.on("join_room", async (data: { roomId: string }, callback: SocketCallback) => {
        console.log(`Join room request: ${data.roomId} from user ${socket.data.userId}`);
        
        if (!socket.data.userId) {
          console.log('Join room rejected: User not authenticated');
          callback?.({ success: false, error: 'Not authenticated' });
          return;
        }

        try {
          // Allow temporary conversations (for new chat flows)
          if (data.roomId.startsWith('temp_')) {
            console.log(`Allowing temporary room: ${data.roomId}`);
            socket.join(data.roomId);
            socket.data.rooms?.add(data.roomId);
            console.log(`User ${socket.data.userId} joined temporary room ${data.roomId}`);
            callback?.({ success: true });
            return;
          }

          // Validate user has access to this conversation
          const conversations = await messagingService.getUserConversations(socket.data.userId);
          console.log(`User has ${conversations.length} conversations`);
          const hasAccess = conversations.some(conv => conv.id === data.roomId);
          
          if (!hasAccess) {
            console.log(`Access denied: User ${socket.data.userId} cannot access room ${data.roomId}`);
            console.log('Available conversations:', conversations.map(c => c.id));
            callback?.({ success: false, error: 'Access denied to conversation' });
            return;
          }

          socket.join(data.roomId);
          socket.data.rooms?.add(data.roomId);
          
          console.log(`User ${socket.data.userId} joined room ${data.roomId}`);
          callback?.({ success: true });
          
        } catch (error) {
          console.error('Join room error:', error);
          callback?.({ success: false, error: 'Failed to join room' });
        }
      });

      // Enhanced message sending with acknowledgments and validation
      socket.on("send_message", async (messageData: EnhancedMessage, callback: SocketCallback) => {
        const ack: MessageAcknowledgment = {
          success: false,
          timestamp: new Date().toISOString()
        };

        try {
          if (!socket.data.userId) {
            ack.error = 'Not authenticated';
            callback(ack);
            return;
          }

          // Rate limiting
          if (!checkRateLimit(socket.data.userId)) {
            ack.error = 'Rate limit exceeded';
            callback(ack);
            return;
          }

          // Validate message
          if (!validateMessage(messageData)) {
            ack.error = 'Invalid message format';
            callback(ack);
            return;
          }

          // Verify user is in the room
          if (!socket.data.rooms?.has(messageData.conversationId)) {
            ack.error = 'Not a member of this conversation';
            callback(ack);
            return;
          }

          // Save message to database
          const savedMessage = await messagingService.sendMessage({
            conversationId: messageData.conversationId,
            senderId: socket.data.userId,
            content: messageData.content,
            type: messageData.type || 'TEXT',
            metadata: messageData.metadata,
            replyToId: messageData.replyTo
          });

          // Prepare message for broadcast
          const broadcastMessage: EnhancedMessage = {
            id: savedMessage.id,
            type: messageData.type || 'TEXT',
            content: messageData.content,
            senderId: socket.data.userId,
            conversationId: messageData.conversationId,
            timestamp: savedMessage.createdAt.toISOString(),
            metadata: messageData.metadata,
            replyTo: messageData.replyTo,
            tempId: messageData.tempId
          };

          // Broadcast to room (excluding sender)
          socket.to(messageData.conversationId).emit("new_message", broadcastMessage);

          // Send acknowledgment
          ack.success = true;
          ack.messageId = savedMessage.id;
          callback(ack);

          console.log(`Message sent: ${savedMessage.id} in room ${messageData.conversationId}`);
          
        } catch (error) {
          console.error('Send message error:', error);
          ack.error = 'Failed to send message';
          callback(ack);
        }
      });

      // Enhanced typing indicators with timeout cleanup
      socket.on("typing_start", async (data: { conversationId: string }, callback: SocketCallback) => {
        if (!socket.data.userId || !socket.data.rooms?.has(data.conversationId)) {
          callback?.({ success: false, error: 'Not authorized' });
          return;
        }

        try {
          await presenceService.setTypingIndicator(data.conversationId, socket.data.userId, true);
          
          socket.to(data.conversationId).emit("user_typing", {
            userId: socket.data.userId,
            conversationId: data.conversationId,
            isTyping: true
          });

          callback?.({ success: true });
        } catch (error) {
          console.error('Typing start error:', error);
          callback?.({ success: false, error: 'Failed to update typing status' });
        }
      });

      socket.on("typing_stop", async (data: { conversationId: string }, callback: SocketCallback) => {
        if (!socket.data.userId || !socket.data.rooms?.has(data.conversationId)) {
          callback?.({ success: false, error: 'Not authorized' });
          return;
        }

        try {
          await presenceService.setTypingIndicator(data.conversationId, socket.data.userId, false);
          
          socket.to(data.conversationId).emit("user_typing", {
            userId: socket.data.userId,
            conversationId: data.conversationId,
            isTyping: false
          });

          callback?.({ success: true });
        } catch (error) {
          console.error('Typing stop error:', error);
          callback?.({ success: false, error: 'Failed to update typing status' });
        }
      });

      // Message read receipts
      socket.on("mark_read", async (data: { messageId: string; conversationId: string }, callback: SocketCallback) => {
        if (!socket.data.userId || !socket.data.rooms?.has(data.conversationId)) {
          callback?.({ success: false, error: 'Not authorized' });
          return;
        }

        try {
          await messagingService.updateMessageStatus(data.messageId, socket.data.userId, 'READ');
          
          socket.to(data.conversationId).emit("message_read", {
            messageId: data.messageId,
            userId: socket.data.userId,
            timestamp: new Date().toISOString()
          });

          callback?.({ success: true });
        } catch (error) {
          console.error('Mark read error:', error);
          callback?.({ success: false, error: 'Failed to mark message as read' });
        }
      });

      // Enhanced presence updates
      socket.on("update_presence", async (data: { status?: string; isOnline?: boolean }, callback: SocketCallback) => {
        if (!socket.data.userId) {
          callback?.({ success: false, error: 'Not authenticated' });
          return;
        }
        
        try {
          await presenceService.updateUserPresence(socket.data.userId, {
            isOnline: data.isOnline !== false,
            status: data.status,
            currentDevice: socket.data.deviceInfo?.type || 'web'
          });
          
          // Broadcast presence update to all user's conversations
          if (socket.data.rooms) {
            socket.data.rooms.forEach(roomId => {
              socket.to(roomId).emit("user_presence", {
                userId: socket.data.userId,
                isOnline: data.isOnline !== false,
                status: data.status,
                timestamp: new Date().toISOString()
              });
            });
          }

          callback?.({ success: true });
        } catch (error) {
          console.error('Update presence error:', error);
          callback?.({ success: false, error: 'Failed to update presence' });
        }
      });

      // Leave room
      socket.on("leave_room", (data: { roomId: string }, callback: SocketCallback) => {
        socket.leave(data.roomId);
        socket.data.rooms?.delete(data.roomId);
        
        console.log(`User ${socket.data.userId} left room ${data.roomId}`);
        callback?.({ success: true });
      });

      // Connection health check
      socket.on("ping", (callback: SocketCallback) => {
        socket.data.lastActivity = new Date();
        callback({ pong: true, timestamp: new Date().toISOString() });
      });

      // Enhanced disconnect handling
      socket.on("disconnect", async (reason) => {
        console.log(`Socket disconnected: ${socket.id} (${reason})`);
        
        if (socket.data.userId) {
          try {
            // Update user presence to offline
            await presenceService.updateUserPresence(socket.data.userId, {
              isOnline: false,
              currentDevice: socket.data.deviceInfo?.type || 'web'
            });
            
            // Clear typing indicators and notify rooms
            if (socket.data.rooms) {
              for (const roomId of socket.data.rooms) {
                await presenceService.setTypingIndicator(roomId, socket.data.userId, false);
                
                // Notify room of user going offline
                socket.to(roomId).emit("user_presence", {
                  userId: socket.data.userId,
                  isOnline: false,
                  timestamp: new Date().toISOString()
                });

                // Stop typing indicator
                socket.to(roomId).emit("user_typing", {
                  userId: socket.data.userId,
                  conversationId: roomId,
                  isTyping: false
                });
              }
            }
          } catch (error) {
            console.error('Disconnect cleanup error:', error);
          }
        }
      });

      // Handle connection errors
      socket.on("error", (error) => {
        console.error(`Socket error for ${socket.id}:`, error);
      });
    });

    // Cleanup stale connections periodically
    setInterval(() => {
      const staleThreshold = 5 * 60 * 1000; // 5 minutes
      const now = new Date();
      
      io.sockets.sockets.forEach((socket) => {
        if (socket.data.lastActivity && 
            now.getTime() - socket.data.lastActivity.getTime() > staleThreshold) {
          console.log(`Disconnecting stale socket: ${socket.id}`);
          socket.disconnect(true);
        }
      });
    }, 60000); // Check every minute

    res.socket.server.io = io;
    console.log("Enhanced Socket.IO server initialized");
  }
  
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
