import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiSearch, FiMoreHorizontal } from 'react-icons/fi';
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

interface MessageListProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
}

const MessageList: React.FC<MessageListProps> = ({ conversations, activeConversation, onSelectConversation }) => {
  return (
    <motion.div 
      className={`flex flex-col h-full rounded-3xl ${styles.messageCard} overflow-hidden `}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold gradient-text">Messages</h2>
          <motion.button
            className="p-2 rounded-full glass-effect hover:bg-white/20 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiMoreHorizontal className="text-gray-600" size={18} />
          </motion.button>
        </div>
      </div>
      
      {/* Search bar */}
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search conversations..."
            className={`block w-full pl-12 pr-4 py-3 ${styles.searchInput} rounded-xl text-sm placeholder-gray-500 focus:outline-none`}
          />
        </div>
      </div>
      
      <div className={`flex-1 overflow-y-auto ${styles.messagesScroll}`}>
        <div className="p-2">
          {conversations.map((conversation, index) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`${styles.conversationItem} flex items-center p-4 m-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                activeConversation?.id === conversation.id 
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200' 
                  : 'hover:bg-white/20'
              }`}
              onClick={() => onSelectConversation(conversation)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <div className={`w-12 h-12 rounded-full ${styles.gradientAvatar} p-0.5 `}>
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {conversation.user.avatar ? (
                      <Image
                        src={conversation.user.avatar}
                        alt={conversation.user.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="text-xl font-bold text-gray-600">
                        {conversation.user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
                {/* Online status indicator */}
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white ${styles.onlineIndicator}`}></div>
              </div>
              
              <div className="ml-4 flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold text-gray-800 truncate">{conversation.user.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium">{conversation.timestamp}</span>
                    {conversation.unread && (
                      <div className={`w-2 h-2 rounded-full ${styles.unreadBadge}`}></div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 truncate mb-1">
                  {conversation.lastMessage}
                </p>
                {conversation.user.location && (
                  <p className="text-xs text-gray-400 truncate flex items-center">
                    📍 {conversation.user.location}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageList;