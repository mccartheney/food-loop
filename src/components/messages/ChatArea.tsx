import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiArrowLeft, FiSend } from 'react-icons/fi';
import Link from 'next/link'; // Novo import para navegação

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden bg-white">
      {/* Header with gray background */}
      <div className="bg-[#D9D9D9] p-4 flex items-center">
        {onBackClick && (
          <button 
            onClick={onBackClick}
            className="btn btn-ghost btn-sm btn-circle mr-2"
          >
            <FiArrowLeft />
          </button>
        )}
        <div className="avatar">
          <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center">
            {conversation?.user?.avatar ? (
              <Image
                src={conversation.user.avatar}
                alt={conversation.user.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="text-xl text-slate-600">
                {conversation?.user?.name?.charAt(0)}
              </div>
            )}
          </div>
        </div>
        
        {/* Link para o perfil do usuário */}
        <Link 
          href={`/profile/${conversation.id}`}
          className="ml-3 font-medium text-gray-800 hover:underline transition-all"
        >
          {conversation?.user?.name}
        </Link>
      </div>
      
      {/* Messages - white background with gray recipient bubbles */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[70%] rounded-xl p-3 ${
                  message.sender === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-[#D9D9D9] text-gray-800'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-content opacity-70' : 'text-gray-500'}`}>
                  {message.timestamp}
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>
      
      {/* Message Input - removed border */}
      <div className="p-4 bg-white">
        <div className="flex items-center bg-base-200 rounded-lg h-12">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full h-full px-4 bg-base-200 focus:bg-base-200 active:bg-base-200 hover:bg-base-200 focus:outline-none resize-none py-3 border-0 focus:ring-0 focus:border-0"
            style={{ 
              background: 'var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))', 
              caretColor: '#000',
              border: 'none',
              boxShadow: 'none'
            }}
          />
          <button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="btn btn-circle btn-sm btn-ghost text-primary mr-2"
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;