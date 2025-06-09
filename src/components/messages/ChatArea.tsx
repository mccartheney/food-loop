import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiSend, FiPaperclip, FiSmile } from 'react-icons/fi';
import MessageHeader from './MessageHeader';
import styles from '../../app/app/messages/styles.module.css';

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
  id: number;
  user: User;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

interface ChatAreaProps {
  conversation: Conversation;
  onBackClick?: () => void;
}

// Fixed mock messages with proper typing
const mockMessages: Message[] = [
  { id: 1, text: "Hello there!", sender: "recipient" as const, timestamp: "10:30 AM" },
  { id: 2, text: "I'm doing well", sender: "user" as const, timestamp: "10:32 AM" },
  { id: 3, text: "Are you available tomorrow?", sender: "recipient" as const, timestamp: "10:33 AM" },
  { id: 4, text: "Yes, I'm free", sender: "user" as const, timestamp: "10:35 AM" },
];

const ChatArea: React.FC<ChatAreaProps> = ({ conversation, onBackClick }) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const message: Message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    setIsUserTyping(false);
    
    // Simulate typing response
    setTimeout(() => {
      setIsTyping(true);
    }, 1000);
    
    setTimeout(() => {
      setIsTyping(false);
    }, 3000);
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
    if (!isUserTyping && e.target.value.length > 0) {
      setIsUserTyping(true);
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
      <div className={`flex-1 overflow-y-auto p-6 space-y-4 ${styles.messagesScroll}`}>
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
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div className={`flex items-end gap-2 max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {message.sender !== 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-xs font-bold text-white mb-1">
                    {conversation?.user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                
                <div className={`rounded-2xl p-4 shadow-lg ${
                  message.sender === 'user' 
                    ? `${styles.messageBubbleUser} text-white` 
                    : `${styles.messageBubbleRecipient} text-gray-800`
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <div className={`text-xs mt-2 ${
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
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-xs font-bold text-white">
                  {conversation?.user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className={`${styles.messageBubbleRecipient} rounded-2xl p-4 shadow-lg`}>
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
      <div className="p-6 border-t border-white/20">
        <div className="flex items-end gap-4">
          <motion.button
            className="p-3 rounded-full glass-effect hover:bg-white/20 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Anexar arquivo"
          >
            <FiPaperclip className="text-gray-600" size={18} />
          </motion.button>
          
          <div className="flex-1">
            <div className={`flex items-end ${styles.messageInput} rounded-2xl p-4 shadow-lg`}>
              <textarea
                value={newMessage}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua mensagem..."
                className="w-full bg-transparent focus:outline-none resize-none text-gray-800 placeholder-gray-500 max-h-32"
                rows={1}
                style={{
                  minHeight: '24px',
                  lineHeight: '24px'
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
                }}
              />
              <motion.button
                className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Emojis"
              >
                <FiSmile className="text-gray-500" size={18} />
              </motion.button>
            </div>
          </div>
          
          <motion.button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-4 rounded-2xl ${styles.sendButton} text-white shadow-lg transition-all duration-200 ${
              !newMessage.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            whileHover={newMessage.trim() ? { scale: 1.05 } : {}}
            whileTap={newMessage.trim() ? { scale: 0.95 } : {}}
          >
            <FiSend size={20} />
          </motion.button>
        </div>
        
        {/* Typing indicator for current user */}
        {isUserTyping && (
          <motion.div 
            className="mt-2 text-xs text-gray-500 flex items-center gap-1"
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
