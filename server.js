const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Helper function to make API calls to our existing endpoints
async function makeApiCall(url, options = {}) {
  try {
    const response = await fetch(`http://localhost:${port}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    return await response.json();
  } catch (error) {
    console.error(`API call failed to ${url}:`, error.message);
    return { success: false, error: error.message };
  }
}

app.prepare().then(async () => {
  console.log('✅ Using existing API routes for database operations');

  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // Initialize Socket.IO with enhanced configuration
  const io = new Server(httpServer, {
    path: "/socket.io",
    cors: {
      origin: dev ? "*" : process.env.NEXTAUTH_URL,
      methods: ["GET", "POST"],
      credentials: true
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // Enhanced socket handlers with database integration
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);
    
    // Initialize socket data
    socket.rooms = new Set();
    socket.lastActivity = new Date();

    socket.on('authenticate', async (data, callback) => {
      console.log('Authentication attempt:', data);
      try {
        if (data.token && data.token.includes(':')) {
          const [userId, email] = data.token.split(':');
          socket.userId = userId;
          socket.userEmail = email;
          socket.deviceInfo = data.deviceInfo || { type: 'web' };
          
          console.log(`User authenticated: ${userId}`);
          callback({ success: true, userId });
        } else {
          callback({ success: false, error: 'Invalid token' });
        }
      } catch (error) {
        console.error('Authentication error:', error);
        callback({ success: false, error: 'Authentication failed' });
      }
    });

    socket.on('join_room', async (data, callback) => {
      console.log(`Join room: ${data.roomId} by ${socket.userId}`);
      
      if (!socket.userId) {
        callback({ success: false, error: 'Not authenticated' });
        return;
      }

      try {
        // Allow temporary rooms (for testing)
        if (data.roomId.startsWith('temp_')) {
          socket.join(data.roomId);
          socket.rooms.add(data.roomId);
          callback({ success: true });
          return;
        }

        // For real conversations, validate access through API
        const response = await makeApiCall(`/api/messages?userId=${socket.userId}&conversationId=${data.roomId}`);
        
        if (response.success || response.messages) {
          // User has access to this conversation
          socket.join(data.roomId);
          socket.rooms.add(data.roomId);
          callback({ success: true });
        } else {
          console.log(`Access denied: User ${socket.userId} cannot access room ${data.roomId}`);
          callback({ success: false, error: 'Access denied to conversation' });
        }
        
      } catch (error) {
        console.error('Join room error:', error);
        callback({ success: false, error: 'Failed to join room' });
      }
    });

    socket.on('send_message', async (messageData, callback) => {
      console.log('Message received:', messageData);
      
      const ack = {
        success: false,
        timestamp: new Date().toISOString()
      };

      try {
        if (!socket.userId) {
          ack.error = 'Not authenticated';
          callback(ack);
          return;
        }

        // Verify user is in the room
        if (!socket.rooms.has(messageData.conversationId)) {
          ack.error = 'Not a member of this conversation';
          callback(ack);
          return;
        }

        let savedMessage;

        // Save to database via API if not a temp conversation
        if (!messageData.conversationId.startsWith('temp_')) {
          try {
            const response = await makeApiCall('/api/messages', {
              method: 'POST',
              body: JSON.stringify({
                conversationId: messageData.conversationId,
                senderId: socket.userId,
                content: messageData.content,
                type: messageData.type || 'TEXT',
                metadata: messageData.metadata,
                replyToId: messageData.replyTo
              })
            });

            if (response.success && response.message) {
              savedMessage = response.message;
              console.log(`Message saved to database via API: ${savedMessage.id}`);
            } else {
              console.warn('Database save via API failed:', response.error);
            }
          } catch (dbError) {
            console.warn('Database save failed, continuing with broadcast:', dbError.message);
          }
        }

        // Prepare message for broadcast
        const broadcastMessage = {
          id: savedMessage?.id || `temp_${Date.now()}_${Math.random()}`,
          type: messageData.type || 'TEXT',
          content: messageData.content,
          senderId: socket.userId,
          conversationId: messageData.conversationId,
          timestamp: savedMessage?.createdAt || new Date().toISOString(),
          metadata: messageData.metadata,
          replyTo: messageData.replyTo,
          tempId: messageData.tempId
        };

        // Broadcast to room (excluding sender)
        socket.to(messageData.conversationId).emit('new_message', broadcastMessage);

        // Send acknowledgment
        ack.success = true;
        ack.messageId = broadcastMessage.id;
        callback(ack);

        console.log(`Message sent: ${broadcastMessage.id} in room ${messageData.conversationId}`);
        
      } catch (error) {
        console.error('Send message error:', error);
        ack.error = 'Failed to send message';
        callback(ack);
      }
    });

    socket.on('typing_start', async (data, callback) => {
      if (!socket.userId || !socket.rooms.has(data.conversationId)) {
        callback?.({ success: false, error: 'Not authorized' });
        return;
      }

      try {
        // Broadcast typing indicator to room
        socket.to(data.conversationId).emit('user_typing', {
          userId: socket.userId,
          conversationId: data.conversationId,
          isTyping: true
        });

        callback?.({ success: true });
      } catch (error) {
        console.error('Typing start error:', error);
        callback?.({ success: false, error: 'Failed to update typing status' });
      }
    });

    socket.on('typing_stop', async (data, callback) => {
      if (!socket.userId || !socket.rooms.has(data.conversationId)) {
        callback?.({ success: false, error: 'Not authorized' });
        return;
      }

      try {
        // Broadcast typing stop to room
        socket.to(data.conversationId).emit('user_typing', {
          userId: socket.userId,
          conversationId: data.conversationId,
          isTyping: false
        });

        callback?.({ success: true });
      } catch (error) {
        console.error('Typing stop error:', error);
        callback?.({ success: false, error: 'Failed to update typing status' });
      }
    });

    socket.on('mark_read', async (data, callback) => {
      if (!socket.userId || !socket.rooms.has(data.conversationId)) {
        callback?.({ success: false, error: 'Not authorized' });
        return;
      }

      try {
        // Broadcast read receipt to room
        socket.to(data.conversationId).emit('message_read', {
          messageId: data.messageId,
          userId: socket.userId,
          timestamp: new Date().toISOString()
        });

        callback?.({ success: true });
      } catch (error) {
        console.error('Mark read error:', error);
        callback?.({ success: false, error: 'Failed to mark message as read' });
      }
    });

    socket.on('ping', (callback) => {
      socket.lastActivity = new Date();
      callback({ pong: true, timestamp: new Date().toISOString() });
    });

    socket.on('disconnect', async (reason) => {
      console.log('Socket disconnected:', socket.id, reason);
      
      if (socket.userId && socket.rooms) {
        try {
          // Notify rooms that user went offline
          for (const roomId of socket.rooms) {
            socket.to(roomId).emit('user_presence', {
              userId: socket.userId,
              isOnline: false,
              timestamp: new Date().toISOString()
            });
            
            // Stop typing indicators
            socket.to(roomId).emit('user_typing', {
              userId: socket.userId,
              conversationId: roomId,
              isTyping: false
            });
          }
        } catch (error) {
          console.error('Disconnect cleanup error:', error);
        }
      }
    });
  });

  // Cleanup stale connections periodically
  setInterval(() => {
    const staleThreshold = 5 * 60 * 1000; // 5 minutes
    const now = new Date();
    
    io.sockets.sockets.forEach((socket) => {
      if (socket.lastActivity && 
          now.getTime() - socket.lastActivity.getTime() > staleThreshold) {
        console.log(`Disconnecting stale socket: ${socket.id}`);
        socket.disconnect(true);
      }
    });
  }, 60000); // Check every minute

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      console.log('> Socket.IO server running with database integration');
    });
});
