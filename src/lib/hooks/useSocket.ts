import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type MessageData = {
  roomId: string;
  message: any;
};

type TypingData = {
  roomId: string;
  userId: string;
  isTyping?: boolean;
};

type PresenceData = {
  userId: string;
  isOnline: boolean;
  status?: string;
};

export function useSocket(
  roomId: string, 
  onMessage: (data: MessageData) => void, 
  onTyping?: (data: TypingData) => void,
  onPresence?: (data: PresenceData) => void,
  userId?: string
) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io({
      path: "/api/socket",
      transports: ["websocket", "polling"],
      autoConnect: true,
    });
    socketRef.current = socket;

    // Connection event handlers
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
      
      // Authenticate if userId is provided
      if (userId) {
        socket.emit("authenticate", { userId });
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
      setIsAuthenticated(false);
    });

    socket.on("authenticated", (data: { success: boolean }) => {
      console.log("Socket authenticated:", data.success);
      setIsAuthenticated(data.success);
      
      // Join the room after authentication
      if (data.success && roomId) {
        socket.emit("join", roomId);
      }
    });

    // Message and event listeners
    socket.on("message", onMessage);
    
    if (onTyping) {
      socket.on("typing", onTyping);
    }
    
    if (onPresence) {
      socket.on("presence", onPresence);
    }

    // Join room if no authentication is needed
    if (!userId && roomId) {
      socket.emit("join", roomId);
    }

    return () => {
      if (roomId) {
        socket.emit("leave", roomId);
      }
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, userId]);

  // Emit a message
  const sendMessage = (data: MessageData) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("message", data);
    }
  };

  // Emit typing event
  const sendTyping = (data: TypingData) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("typing", data);
    }
  };

  // Update presence
  const updatePresence = (data: { status?: string; isOnline?: boolean }) => {
    if (socketRef.current?.connected && isAuthenticated) {
      socketRef.current.emit("presence", data);
    }
  };

  // Join a new room
  const joinRoom = (newRoomId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("join", newRoomId);
    }
  };

  // Leave a room
  const leaveRoom = (roomIdToLeave: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("leave", roomIdToLeave);
    }
  };

  return {
    socket: socketRef.current,
    isConnected,
    isAuthenticated,
    sendMessage,
    sendTyping,
    updatePresence,
    joinRoom,
    leaveRoom,
  };
}
