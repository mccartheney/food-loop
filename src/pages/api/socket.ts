// Socket.IO server for Next.js (Node.js API route)
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
  rooms?: string[];
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
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      // Handle user authentication and joining rooms
      socket.on("authenticate", async (data: { userId: string }) => {
        socket.data.userId = data.userId;
        
        // Update user presence
        try {
          await presenceService.updateUserPresence(data.userId, {
            isOnline: true,
            currentDevice: "web"
          });
        } catch (error) {
          console.error("Error updating presence:", error);
        }
        
        socket.emit("authenticated", { success: true });
      });

      // Join conversation room
      socket.on("join", (roomId: string) => {
        socket.join(roomId);
        if (!socket.data.rooms) socket.data.rooms = [];
        if (!socket.data.rooms.includes(roomId)) {
          socket.data.rooms.push(roomId);
        }
        console.log(`User ${socket.data.userId} joined room ${roomId}`);
      });

      // Leave conversation room
      socket.on("leave", (roomId: string) => {
        socket.leave(roomId);
        if (socket.data.rooms) {
          socket.data.rooms = socket.data.rooms.filter(r => r !== roomId);
        }
        console.log(`User ${socket.data.userId} left room ${roomId}`);
      });

      // Handle message broadcasting
      socket.on("message", async (data: { roomId: string; message: any }) => {
        try {
          // Broadcast to room (excluding sender)
          socket.to(data.roomId).emit("message", data);
          
          // Update conversation last activity
          // Note: Message persistence is handled by the API endpoint
          console.log(`Message broadcasted in room ${data.roomId}`);
        } catch (error) {
          console.error("Error handling message:", error);
        }
      });

      // Handle typing indicators
      socket.on("typing", async (data: { roomId: string; userId: string; isTyping?: boolean }) => {
        try {
          // Update typing indicator in database
          await presenceService.setTypingIndicator(data.roomId, data.userId, data.isTyping !== false);
          
          // Broadcast typing status to room (excluding sender)
          socket.to(data.roomId).emit("typing", data);
          
          console.log(`Typing indicator: ${data.userId} in ${data.roomId}`);
        } catch (error) {
          console.error("Error handling typing:", error);
        }
      });

      // Handle user presence updates
      socket.on("presence", async (data: { status?: string; isOnline?: boolean }) => {
        if (!socket.data.userId) return;
        
        try {
          await presenceService.updateUserPresence(socket.data.userId, {
            isOnline: data.isOnline !== false,
            status: data.status,
            currentDevice: "web"
          });
          
          // Broadcast presence update to all user's conversations
          if (socket.data.rooms) {
            socket.data.rooms.forEach(roomId => {
              socket.to(roomId).emit("presence", {
                userId: socket.data.userId,
                ...data
              });
            });
          }
        } catch (error) {
          console.error("Error updating presence:", error);
        }
      });

      // Handle disconnection
      socket.on("disconnect", async () => {
        console.log("User disconnected:", socket.id);
        
        if (socket.data.userId) {
          try {
            // Update user presence to offline
            await presenceService.updateUserPresence(socket.data.userId, {
              isOnline: false,
              currentDevice: "web"
            });
            
            // Clear typing indicators
            if (socket.data.rooms) {
              for (const roomId of socket.data.rooms) {
                await presenceService.setTypingIndicator(roomId, socket.data.userId, false);
                
                // Notify room of user going offline
                socket.to(roomId).emit("presence", {
                  userId: socket.data.userId,
                  isOnline: false
                });
              }
            }
          } catch (error) {
            console.error("Error handling disconnect:", error);
          }
        }
      });
    });

    res.socket.server.io = io;
    console.log("Socket.IO server initialized");
  }
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
