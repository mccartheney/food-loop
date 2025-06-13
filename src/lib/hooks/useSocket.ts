import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

// Enhanced interfaces matching the server
interface EnhancedMessage {
  id: string;
  type: 'TEXT' | 'IMAGE' | 'FILE' | 'RECIPE_SHARE' | 'BOX_SHARE' | 'LOCATION';
  content: string;
  senderId: string;
  conversationId: string;
  metadata?: Record<string, any>;
  replyTo?: string;
  timestamp: string;
  tempId?: string;
}

interface MessageAcknowledgment {
  success: boolean;
  messageId?: string;
  error?: string;
  timestamp: string;
}

interface TypingData {
  userId: string;
  conversationId: string;
  isTyping: boolean;
}

interface PresenceData {
  userId: string;
  isOnline: boolean;
  status?: string;
  timestamp: string;
}

interface ReadReceiptData {
  messageId: string;
  userId: string;
  timestamp: string;
}

interface SocketResponse {
  success: boolean;
  error?: string;
  [key: string]: any;
}

export function useSocket(
  conversationId: string | null,
  userId: string | null,
  userEmail: string | null,
  options: {
    onMessage?: (message: EnhancedMessage) => void;
    onTyping?: (data: TypingData) => void;
    onPresence?: (data: PresenceData) => void;
    onReadReceipt?: (data: ReadReceiptData) => void;
    autoConnect?: boolean;
  } = {}
) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { autoConnect = true } = options;

  // Create authentication token
  const createAuthToken = useCallback(() => {
    if (!userId || !userEmail) return null;
    return `${userId}:${userEmail}`;
  }, [userId, userEmail]);

  // Connect and authenticate
  const connect = useCallback(() => {
    if (!userId || !userEmail) {
      console.log("Cannot connect: missing userId or userEmail", { userId, userEmail });
      return;
    }

    // Don't create new connection if already connected
    if (socketRef.current?.connected) {
      console.log("Socket already connected");
      return;
    }

    console.log("Initiating socket connection...");
    const socket = io({
      path: "/socket.io",
      transports: ["websocket", "polling"],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    socketRef.current = socket;

    // Connection event handlers
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
      setConnectionError(null);
      setIsReconnecting(false);

      // Authenticate after connection
      const token = createAuthToken();
      if (token) {
        console.log("Authenticating with token...");
        socket.emit("authenticate", {
          token,
          deviceInfo: {
            type: 'web',
            userAgent: navigator.userAgent
          }
        }, (response: SocketResponse) => {
          console.log("Authentication response:", response);
          if (response.success) {
            setIsAuthenticated(true);
            console.log("Socket authenticated successfully");
          } else {
            console.error("Authentication failed:", response.error);
            setConnectionError(response.error || 'Authentication failed');
          }
        });
      } else {
        console.error("No authentication token available");
        setConnectionError("No authentication token");
      }
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
      setIsAuthenticated(false);
      
      if (reason === "io server disconnect") {
        // Server disconnected, manual reconnection needed
        setConnectionError("Disconnected by server");
      }
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setConnectionError(error.message);
      setIsConnected(false);
      setIsAuthenticated(false);
    });

    socket.on("reconnect", (attemptNumber) => {
      console.log("Socket reconnected after", attemptNumber, "attempts");
      setIsReconnecting(false);
    });

    socket.on("reconnect_attempt", (attemptNumber) => {
      console.log("Socket reconnection attempt", attemptNumber);
      setIsReconnecting(true);
    });

    socket.on("reconnect_error", (error) => {
      console.error("Socket reconnection error:", error);
      setConnectionError("Reconnection failed");
    });

    socket.on("reconnect_failed", () => {
      console.error("Socket reconnection failed");
      setConnectionError("Failed to reconnect");
      setIsReconnecting(false);
    });

    // Enhanced message handlers
    socket.on("new_message", (message: EnhancedMessage) => {
      options.onMessage?.(message);
    });

    socket.on("user_typing", (data: TypingData) => {
      options.onTyping?.(data);
    });

    socket.on("user_presence", (data: PresenceData) => {
      options.onPresence?.(data);
    });

    socket.on("message_read", (data: ReadReceiptData) => {
      options.onReadReceipt?.(data);
    });

    // Handle authentication response
    socket.on("authenticated", (data: SocketResponse) => {
      console.log("Received authenticated event:", data);
      if (data.success) {
        setIsAuthenticated(true);
        console.log("Authentication state updated to true");
      } else {
        setConnectionError(data.error || 'Authentication failed');
      }
    });

    socket.connect();
  }, [userId, userEmail, createAuthToken]); // Removed conversationId and options from dependencies

  // Disconnect socket
  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setIsConnected(false);
    setIsAuthenticated(false);
    setConnectionError(null);
  }, []);

  // Join a conversation room
  const joinRoom = useCallback((roomId: string) => {
    if (!socketRef.current?.connected || !isAuthenticated) return Promise.reject('Not connected or authenticated');

    return new Promise<void>((resolve, reject) => {
      socketRef.current!.emit("join_room", { roomId }, (response: SocketResponse) => {
        if (response.success) {
          console.log(`Joined room: ${roomId}`);
          resolve();
        } else {
          console.error(`Failed to join room ${roomId}:`, response.error);
          reject(new Error(response.error));
        }
      });
    });
  }, [isAuthenticated]);

  // Leave a conversation room
  const leaveRoom = useCallback((roomId: string) => {
    if (!socketRef.current?.connected) return Promise.resolve();

    return new Promise<void>((resolve, reject) => {
      socketRef.current!.emit("leave_room", { roomId }, (response: SocketResponse) => {
        if (response.success) {
          console.log(`Left room: ${roomId}`);
          resolve();
        } else {
          console.error(`Failed to leave room ${roomId}:`, response.error);
          reject(new Error(response.error));
        }
      });
    });
  }, []);

  // Send a message with acknowledgment
  const sendMessage = useCallback((messageData: Partial<EnhancedMessage>) => {
    if (!socketRef.current?.connected || !isAuthenticated || !conversationId) {
      return Promise.reject('Not connected, authenticated, or no conversation ID');
    }

    const message: EnhancedMessage = {
      id: '', // Will be set by server
      type: 'TEXT',
      content: '',
      senderId: userId!,
      conversationId,
      timestamp: new Date().toISOString(),
      tempId: `temp_${Date.now()}_${Math.random()}`,
      ...messageData
    };

    return new Promise<MessageAcknowledgment>((resolve, reject) => {
      socketRef.current!.emit("send_message", message, (ack: MessageAcknowledgment) => {
        if (ack.success) {
          resolve(ack);
        } else {
          reject(new Error(ack.error));
        }
      });
    });
  }, [isAuthenticated, conversationId, userId]);

  // Start typing indicator
  const startTyping = useCallback(() => {
    if (!socketRef.current?.connected || !isAuthenticated || !conversationId) return;

    socketRef.current.emit("typing_start", { conversationId }, (response: SocketResponse) => {
      if (!response.success) {
        console.error('Failed to start typing indicator:', response.error);
      }
    });

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Auto-stop typing after 3 seconds
    typingTimeoutRef.current = setTimeout(() => {
      stopTyping();
    }, 3000);
  }, [isAuthenticated, conversationId]);

  // Stop typing indicator
  const stopTyping = useCallback(() => {
    if (!socketRef.current?.connected || !isAuthenticated || !conversationId) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    socketRef.current.emit("typing_stop", { conversationId }, (response: SocketResponse) => {
      if (!response.success) {
        console.error('Failed to stop typing indicator:', response.error);
      }
    });
  }, [isAuthenticated, conversationId]);

  // Mark message as read
  const markAsRead = useCallback((messageId: string) => {
    if (!socketRef.current?.connected || !isAuthenticated || !conversationId) {
      return Promise.reject('Not connected, authenticated, or no conversation ID');
    }

    return new Promise<void>((resolve, reject) => {
      socketRef.current!.emit("mark_read", { messageId, conversationId }, (response: SocketResponse) => {
        if (response.success) {
          resolve();
        } else {
          reject(new Error(response.error));
        }
      });
    });
  }, [isAuthenticated, conversationId]);

  // Update user presence
  const updatePresence = useCallback((data: { status?: string; isOnline?: boolean }) => {
    if (!socketRef.current?.connected || !isAuthenticated) return Promise.reject('Not connected or authenticated');

    return new Promise<void>((resolve, reject) => {
      socketRef.current!.emit("update_presence", data, (response: SocketResponse) => {
        if (response.success) {
          resolve();
        } else {
          reject(new Error(response.error));
        }
      });
    });
  }, [isAuthenticated]);

  // Ping the server for health check
  const ping = useCallback(() => {
    if (!socketRef.current?.connected) return Promise.reject('Not connected');

    return new Promise<{ pong: boolean; timestamp: string }>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Ping timeout'));
      }, 5000);

      socketRef.current!.emit("ping", (response: any) => {
        clearTimeout(timeout);
        resolve(response);
      });
    });
  }, []);

  // Effect to handle connection - only connect once when user data is available
  useEffect(() => {
    if (autoConnect && userId && userEmail && !socketRef.current) {
      console.log("Starting socket connection for user:", userId);
      connect();
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      // Don't auto-disconnect on dependency changes - only on unmount
    };
  }, [autoConnect, userId, userEmail, connect]);

  // Effect to handle cleanup on component unmount
  useEffect(() => {
    return () => {
      console.log("Component unmounting, cleaning up socket");
      disconnect();
    };
  }, [disconnect]);

  // Effect to join/leave rooms when conversation changes
  useEffect(() => {
    if (isAuthenticated && conversationId) {
      joinRoom(conversationId).catch(console.error);
    }

    return () => {
      if (conversationId) {
        leaveRoom(conversationId).catch(console.error);
      }
    };
  }, [isAuthenticated, conversationId, joinRoom, leaveRoom]);

  return {
    // Connection state
    isConnected,
    isAuthenticated,
    connectionError,
    isReconnecting,
    
    // Connection methods
    connect,
    disconnect,
    
    // Room methods
    joinRoom,
    leaveRoom,
    
    // Messaging methods
    sendMessage,
    markAsRead,
    
    // Typing indicators
    startTyping,
    stopTyping,
    
    // Presence
    updatePresence,
    
    // Health check
    ping,
    
    // Socket instance (for advanced usage)
    socket: socketRef.current
  };
}
