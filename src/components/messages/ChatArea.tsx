import { useState, useRef, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiWifi, FiWifiOff } from 'react-icons/fi';
import MessageHeader from './MessageHeader';
import styles from '../../app/app/messages/styles.module.css';
import { useSocket } from '@/lib/hooks/useSocket';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'recipient';
  timestamp: string;
  tempId?: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
}

interface User {
  name: string;
  avatar: string;
  location?: string;
}

interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

interface ChatAreaProps {
  conversation: Conversation;
  onBackClick?: () => void;
}

// API response types
interface ApiMessage {
  id: string;
  content: string;
  senderId: string;
  type: string;
  createdAt: string;
  replyTo?: any;
  reactions?: any[];
  status?: any[];
}

const ChatArea: React.FC<ChatAreaProps> = ({ conversation, onBackClick }) => {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isUserOnline, setIsUserOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get user ID and email from profile API
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (status === 'authenticated' && session?.user?.email) {
        try {
          const response = await fetch(`/api/me?email=${encodeURIComponent(session.user.email)}`);
          const profileData = await response.json();
          
          if (response.ok && profileData.user?.id) {
            setUserId(profileData.user.id);
            setUserEmail(session.user.email);
          } else {
            console.error('Failed to fetch user profile:', profileData);
            // Fallback to email
            setUserId(session.user.email);
            setUserEmail(session.user.email);
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
          // Fallback to email
          setUserId(session.user.email);
          setUserEmail(session.user.email);
        }
      }
    };

    fetchUserProfile();
  }, [session, status]);

  // Socket event handlers
  const handleNewMessage = useCallback((message: any) => {
    const newMsg: Message = {
      id: message.id,
      text: message.content,
      sender: message.senderId === userId ? 'user' : 'recipient',
      timestamp: new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered'
    };
    
    setMessages(prev => {
      // Check if message already exists (by tempId or id)
      const exists = prev.some(msg => 
        msg.id === message.id || 
        (message.tempId && msg.tempId === message.tempId)
      );
      
      if (exists) {
        // Update existing message
        return prev.map(msg => {
          if (msg.tempId === message.tempId || msg.id === message.id) {
            return { ...msg, id: message.id, status: 'delivered' };
          }
          return msg;
        });
      }
      
      return [...prev, newMsg];
    });
  }, [userId]);

  const handleTyping = useCallback((data: any) => {
    if (data.userId !== userId && data.conversationId === conversation.id) {
      setIsOtherUserTyping(data.isTyping);
      
      if (data.isTyping) {
        // Clear existing timeout
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        // Auto-hide typing indicator after 5 seconds
        typingTimeoutRef.current = setTimeout(() => setIsOtherUserTyping(false), 5000);
      }
    }
  }, [userId, conversation.id]);

  const handlePresence = useCallback((data: any) => {
    if (data.userId !== userId) {
      setIsUserOnline(data.isOnline);
    }
  }, [userId]);

  const handleReadReceipt = useCallback((data: any) => {
    if (data.userId !== userId) {
      setMessages(prev => prev.map(msg => {
        if (msg.id === data.messageId) {
          return { ...msg, status: 'read' };
        }
        return msg;
      }));
    }
  }, [userId]);

  // Enhanced socket integration
  const {
    isConnected,
    isAuthenticated,
    connectionError,
    sendMessage: socketSendMessage,
    startTyping,
    stopTyping,
    markAsRead,
    updatePresence
  } = useSocket(
    conversation.id,
    userId,
    userEmail,
    {
      onMessage: handleNewMessage,
      onTyping: handleTyping,
      onPresence: handlePresence,
      onReadReceipt: handleReadReceipt,
      autoConnect: true
    }
  );

  // Fetch messages for this conversation
  const fetchMessages = useCallback(async () => {
    if (!userId) {
      console.log('Cannot fetch messages: userId not available');
      return;
    }
    
    console.log(`Fetching messages for conversation: ${conversation.id}, user: ${userId}`);
    
    try {
      const response = await fetch(`/api/messages?userId=${userId}&conversationId=${conversation.id}`);
      const data = await response.json();
      
      console.log(`Messages API response:`, data);
      
      if (data.success && data.messages) {
        const transformedMessages: Message[] = data.messages.map((msg: ApiMessage) => ({
          id: msg.id,
          text: msg.content,
          sender: msg.senderId === userId ? 'user' : 'recipient',
          timestamp: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'delivered'
        }));
        
        console.log(`Loaded ${transformedMessages.length} messages from database`);
        setMessages(transformedMessages);
      } else {
        console.log('No messages found or API error:', data);
        setMessages([]);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setMessages([]);
    }
  }, [userId, conversation.id]);

  // Load messages when conversation changes or user is authenticated
  useEffect(() => {
    if (userId && conversation.id) {
      console.log('Loading messages for conversation change');
      fetchMessages();
    }
  }, [fetchMessages, userId, conversation.id]);

  // Reload messages when socket reconnects (to get any missed messages)
  useEffect(() => {
    if (isAuthenticated && userId && conversation.id) {
      console.log('Socket authenticated, reloading messages');
      fetchMessages();
    }
  }, [isAuthenticated, fetchMessages]);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Mark messages as read when conversation is viewed
  useEffect(() => {
    if (isAuthenticated && messages.length > 0) {
      const unreadMessages = messages.filter(msg => 
        msg.sender === 'recipient' && msg.status !== 'read'
      );
      
      unreadMessages.forEach(msg => {
        markAsRead(msg.id).catch(console.error);
      });
    }
  }, [isAuthenticated, messages, markAsRead]);

  // Enhanced message sending
  const handleSendMessage = useCallback(async () => {
    if (newMessage.trim() === '' || !userId || !isAuthenticated) return;

    const messageText = newMessage.trim();
    const tempId = `temp_${Date.now()}_${Math.random()}`;
    
    setNewMessage('');

    // Add optimistic message
    const optimisticMessage: Message = {
      id: tempId,
      text: messageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tempId,
      status: 'sending'
    };
    
    setMessages(prev => [...prev, optimisticMessage]);

    try {
      // Send via socket with acknowledgment
      const ack = await socketSendMessage({
        content: messageText,
        type: 'TEXT',
        tempId
      });

      // Update message status
      setMessages(prev => prev.map(msg => {
        if (msg.tempId === tempId) {
          return { ...msg, id: ack.messageId!, status: 'sent' };
        }
        return msg;
      }));

    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Mark message as failed
      setMessages(prev => prev.map(msg => {
        if (msg.tempId === tempId) {
          return { ...msg, status: 'failed' };
        }
        return msg;
      }));

      // Fallback to API if socket fails and not a temporary conversation
      if (!conversation.id.startsWith('temp_')) {
        try {
          const response = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              conversationId: conversation.id,
              senderId: userId,
              content: messageText,
              type: 'TEXT'
            })
          });

          if (response.ok) {
            const data = await response.json();
            setMessages(prev => prev.map(msg => {
              if (msg.tempId === tempId) {
                return { ...msg, id: data.message.id, status: 'sent' };
              }
              return msg;
            }));
          }
        } catch (apiError) {
          console.error('API fallback also failed:', apiError);
        }
      }
    }
  }, [newMessage, userId, isAuthenticated, conversation.id, socketSendMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);

    // Handle typing indicators
    if (e.target.value.length > 0) {
      startTyping();
    } else {
      stopTyping();
    }
  }, [startTyping, stopTyping]);

  // Stop typing when user stops
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (newMessage.length === 0) {
        stopTyping();
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [newMessage, stopTyping]);

  // Connection status indicator
  const getConnectionStatus = () => {
    if (!isConnected) return { icon: FiWifiOff, text: 'Disconnected', color: 'text-red-500' };
    if (!isAuthenticated) return { icon: FiWifiOff, text: 'Authenticating...', color: 'text-yellow-500' };
    return { icon: FiWifi, text: 'Connected', color: 'text-green-500' };
  };

  const connectionStatus = getConnectionStatus();

  return (
    <motion.div 
      className={`flex flex-col h-full rounded-3xl overflow-hidden ${styles.chatArea}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Enhanced Header with connection status */}
      <div className="relative">
        <MessageHeader 
          conversation={conversation}
          onBackClick={onBackClick}
          isOnline={isUserOnline}
          isTyping={isOtherUserTyping}
        />
        
        {/* Connection status indicator */}
        {(!isConnected || connectionError) && (
          <div className={`absolute top-2 right-2 flex items-center gap-1 text-xs ${connectionStatus.color}`}>
            <connectionStatus.icon size={12} />
            <span>{connectionError || connectionStatus.text}</span>
          </div>
        )}
      </div>
      
      {/* Messages Area */}
      <div className={`flex-1 overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4 ${styles.messagesScroll}`}>
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id || message.tempId}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 300
              }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3 md:mb-4`}
            >
              <div className={`flex items-end gap-2 max-w-[85%] md:max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {message.sender !== 'user' && (
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-xs font-bold text-white mb-1 flex-shrink-0">
                    {conversation?.user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                
                <div className={`rounded-2xl p-3 md:p-4 shadow-lg relative ${
                  message.sender === 'user' 
                    ? `${styles.messageBubbleUser} text-white` 
                    : `${styles.messageBubbleRecipient} text-gray-800`
                }`}>
                  <p className="text-sm md:text-sm leading-relaxed break-words">{message.text}</p>
                  
                  <div className={`flex items-center gap-2 text-xs mt-1 md:mt-2 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    <span>{message.timestamp}</span>
                    
                    {/* Message status indicator */}
                    {message.sender === 'user' && message.status && (
                      <span className={`text-xs ${
                        message.status === 'sending' ? 'text-yellow-300' :
                        message.status === 'sent' ? 'text-blue-300' :
                        message.status === 'delivered' ? 'text-green-300' :
                        message.status === 'read' ? 'text-green-400' :
                        message.status === 'failed' ? 'text-red-300' : ''
                      }`}>
                        {message.status === 'sending' ? '⏳' :
                         message.status === 'sent' ? '✓' :
                         message.status === 'delivered' ? '✓✓' :
                         message.status === 'read' ? '✓✓' :
                         message.status === 'failed' ? '❌' : ''}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Typing Indicator */}
          {isOtherUserTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex justify-start mb-4"
            >
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {conversation?.user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className={`${styles.messageBubbleRecipient} rounded-2xl p-3 md:p-4 shadow-lg`}>
                  <div className={`flex space-x-1 ${styles.typingDots}`}>
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>
      
      {/* Enhanced Message Input */}
      <div className="p-3 md:p-6 border-t border-white/20">
        <div className="flex items-end gap-2 md:gap-4">
          <div className="flex-1">
            <div className={`flex items-end ${styles.messageInput} rounded-2xl p-3 md:p-4 shadow-lg`}>
              <textarea
                value={newMessage}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={isAuthenticated ? "Digite sua mensagem..." : "Conectando..."}
                disabled={!isAuthenticated}
                className="w-full bg-transparent focus:outline-none resize-none text-gray-800 placeholder-gray-500 max-h-24 md:max-h-32 text-sm md:text-base disabled:opacity-50"
                rows={1}
                style={{
                  minHeight: '20px',
                  lineHeight: '20px'
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${Math.min(target.scrollHeight, window.innerWidth < 768 ? 96 : 128)}px`;
                }}
              />
            </div>
          </div>
          
          <motion.button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || !isAuthenticated}
            className={`p-3 md:p-4 rounded-2xl ${styles.sendButton} text-white shadow-lg transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
              (!newMessage.trim() || !isAuthenticated) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            whileHover={(newMessage.trim() && isAuthenticated) ? { scale: 1.05 } : {}}
            whileTap={(newMessage.trim() && isAuthenticated) ? { scale: 0.95 } : {}}
          >
            <FiSend size={18} className="md:w-5 md:h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatArea;
