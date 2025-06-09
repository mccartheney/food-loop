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
  id: number;
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
    <div className="glass-effect border-b border-white/20 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          {onBackClick && (
            <motion.button 
              onClick={onBackClick}
              className="p-2 rounded-full glass-effect hover:bg-white/20 transition-all duration-200 mr-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowLeft className="text-gray-700" size={20} />
            </motion.button>
          )}
          
          <div className="relative">
            <div className={`w-12 h-12 rounded-full ${styles.gradientAvatar} p-0.5 shadow-lg`}>
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
                  <div className="text-xl font-bold text-gray-600">
                    {conversation?.user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            {isOnline && (
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white ${styles.onlineIndicator}`}></div>
            )}
          </div>
          
          <div className="ml-4 flex-1 min-w-0">
            <Link 
              href={`/app/profile/${conversation.id}`}
              className="font-bold text-gray-800 hover:text-blue-600 transition-colors block truncate"
            >
              {conversation?.user?.name}
            </Link>
            <div className="flex items-center gap-2">
              {isTyping ? (
                <motion.div 
                  className="flex items-center gap-1 text-blue-600 text-sm font-medium"
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
                <p className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                  {isOnline ? 'Online agora' : 'Visto por último há 5min'}
                </p>
              )}
              {conversation.user.location && (
                <span className="text-xs text-gray-400 truncate">
                  • {conversation.user.location}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            className="p-3 rounded-full glass-effect hover:bg-white/20 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Ligar"
          >
            <FiPhone className="text-gray-600" size={18} />
          </motion.button>
          <motion.button
            className="p-3 rounded-full glass-effect hover:bg-white/20 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Videochamada"
          >
            <FiVideo className="text-gray-600" size={18} />
          </motion.button>
          <motion.button
            className="p-3 rounded-full glass-effect hover:bg-white/20 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Informações"
          >
            <FiInfo className="text-gray-600" size={18} />
          </motion.button>
          <motion.button
            className="p-3 rounded-full glass-effect hover:bg-white/20 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Mais opções"
          >
            <FiMoreVertical className="text-gray-600" size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MessageHeader;
