import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import MessageHeader from './MessageHeader';
import styles from '../../app/app/messages/styles.module.css';
import { useSocket } from '@/lib/hooks/useSocket';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'recipient';
  timestamp: string;
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
  const [isTyping, setIsTyping] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Real-time socket integration
  const roomId = String(conversation.id);

  // Get user ID from profile API
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (status === 'authenticated' && session?.user?.email) {
        try {
          const response = await fetch(`/api/me?email=${encodeURIComponent(session.user.email)}`);
          const profileData = await response.json();
          
          if (response.ok && profileData.user?.id) {
            setUserId(profileData.user.id);
          } else {
            console.error('Failed to fetch user profile:', profileData);
            // Fallback to email if profile fetch fails
            setUserId(session.user.email);
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
          // Fallback to email if API fails
          setUserId(session.user.email);
        }
      }
    };

    fetchUserProfile();
  }, [session, status]);

  // Fetch messages for this conversation
  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/messages?userId=${userId}&conversationId=${conversation.id}`);
      const data = await response.json();
      
      if (data.success) {
        // Transform API messages to match UI interface
        const transformedMessages: Message[] = data.messages.reverse().map((msg: ApiMessage) => ({
          id: parseInt(msg.id) || Date.now(),
          text: msg.content,
          sender: msg.senderId === userId ? 'user' : 'recipient',
          timestamp: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));
        
        setMessages(transformedMessages);
      } else {
        // No messages found - show empty conversation
        setMessages([]);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setMessages([]);
    }
  };

  // Load messages when conversation changes
  useEffect(() => {
    if (userId) {
      fetchMessages();
    }
  }, [conversation.id, userId]);

  // Handle incoming messages
  const handleSocketMessage = (data: { roomId: string; message: any }) => {
    if (data.roomId === roomId) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: data.message.text,
          sender: data.message.sender === userId ? 'user' : 'recipient',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  // Handle typing indicator from other users
  const handleSocketTyping = (data: { roomId: string; userId: string }) => {
    if (data.roomId === roomId && data.userId !== userId) {
      setIsTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const { sendMessage, sendTyping } = useSocket(
    roomId, 
    handleSocketMessage, 
    handleSocketTyping,
    undefined, // onPresence
    userId || undefined // Pass userId for authentication
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !userId) return;

    const messageText = newMessage;
    setNewMessage('');
    setIsUserTyping(false);

    // Always add message to local state for immediate UI feedback
    const newMsg: Message = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, newMsg]);
    
    // Send via socket for real-time updates (works even without API)
    sendMessage({ roomId, message: { text: messageText, sender: userId } });

    // Check if this is a temporary conversation (starts with "temp_")
    if (conversation.id.startsWith('temp_')) {
      console.log('Temporary conversation detected, message will be sent when conversation is created');
      return;
    }

    // Try to persist to API, but don't block UI if it fails
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId: conversation.id,
          senderId: userId,
          content: messageText,
          type: 'TEXT'
        })
      });

      const data = await response.json();
      
      if (!data.success) {
        console.log('Message sent locally and via socket, but not persisted to database');
      }
    } catch (err) {
      console.log('Message sent locally and via socket, but API unavailable:', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);

    // Show typing indicator
    if (!isUserTyping && e.target.value.length > 0 && userId) {
      setIsUserTyping(true);
      sendTyping({ roomId, userId });
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to hide typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsUserTyping(false);
    }, 2000);
  };

  return (
    <motion.div 
      className={`flex flex-col h-full rounded-3xl overflow-hidden ${styles.chatArea}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Modern Header */}
      <MessageHeader 
        conversation={conversation}
        onBackClick={onBackClick}
        isOnline={true}
        isTyping={isTyping}
      />
      
      {/* Messages Area */}
      <div className={`flex-1 overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4 ${styles.messagesScroll}`}>
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
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
                
                <div className={`rounded-2xl p-3 md:p-4 shadow-lg ${
                  message.sender === 'user' 
                    ? `${styles.messageBubbleUser} text-white` 
                    : `${styles.messageBubbleRecipient} text-gray-800`
                }`}>
                  <p className="text-sm md:text-sm leading-relaxed break-words">{message.text}</p>
                  <div className={`text-xs mt-1 md:mt-2 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
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
                placeholder="Digite sua mensagem..."
                className="w-full bg-transparent focus:outline-none resize-none text-gray-800 placeholder-gray-500 max-h-24 md:max-h-32 text-sm md:text-base"
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
            disabled={!newMessage.trim()}
            className={`p-3 md:p-4 rounded-2xl ${styles.sendButton} text-white shadow-lg transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
              !newMessage.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            whileHover={newMessage.trim() ? { scale: 1.05 } : {}}
            whileTap={newMessage.trim() ? { scale: 0.95 } : {}}
          >
            <FiSend size={18} className="md:w-5 md:h-5" />
          </motion.button>
        </div>
        
        {/* Typing indicator for current user */}
        {isUserTyping && (
          <motion.div 
            className="mt-2 text-xs text-gray-500 flex items-center gap-1 px-1"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            <div className={`flex space-x-1 ${styles.typingDots}`}>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            </div>
            <span>Você está digitando...</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatArea;
