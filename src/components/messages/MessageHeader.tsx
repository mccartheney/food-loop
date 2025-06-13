'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiPhone, FiVideo, FiMoreVertical, FiInfo } from 'react-icons/fi';
import styles from '../../app/app/messages/styles.module.css';

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

interface MessageHeaderProps {
  conversation: Conversation;
  onBackClick?: () => void;
  isOnline?: boolean;
  isTyping?: boolean;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ 
  conversation, 
  onBackClick, 
  isOnline = true,
  isTyping = false 
}) => {
  return (
    <div className="glass-effect border-b border-white/20 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 min-w-0">
          {onBackClick && (
            <motion.button 
              onClick={onBackClick}
              className="p-2 rounded-full glass-effect hover:bg-white/20 transition-all duration-200 mr-2 md:mr-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowLeft className="text-gray-700" size={18} />
            </motion.button>
          )}
          
          <div className="relative flex-shrink-0">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${styles.gradientAvatar} p-0.5 shadow-lg`}>
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                {conversation?.user?.avatar ? (
                  <Image
                    src={conversation.user.avatar}
                    alt={conversation.user.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="text-lg md:text-xl font-bold text-gray-600">
                    {conversation?.user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            {isOnline && (
              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-white ${styles.onlineIndicator}`}></div>
            )}
          </div>
          
          <div className="ml-3 md:ml-4 flex-1 min-w-0">
            <Link 
              href={`/app/profile/${conversation.id}`}
              className="font-bold text-gray-800 hover:text-blue-600 transition-colors block truncate text-sm md:text-base"
            >
              {conversation?.user?.name}
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              {isTyping ? (
                <motion.div 
                  className="flex items-center gap-1 text-blue-600 text-xs md:text-sm font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`flex space-x-1 ${styles.typingDots}`}>
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  </div>
                  <span>digitando...</span>
                </motion.div>
              ) : (
                <p className={`text-xs md:text-sm font-medium ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                  {isOnline ? 'Online agora' : 'Visto há 5min'}
                </p>
              )}
              {conversation.user.location && (
                <span className="text-xs text-gray-400 truncate sm:max-w-[120px] md:max-w-none">
                  {!isTyping && <span className="hidden sm:inline">• </span>}{conversation.user.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageHeader;
