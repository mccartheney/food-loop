import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiSearch, FiPlus, FiX } from 'react-icons/fi';
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

interface MessageListProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  onNewMessage?: () => void;
}

const MessageList: React.FC<MessageListProps> = ({ conversations, activeConversation, onSelectConversation, onNewMessage }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter conversations based on search term
  const filteredConversations = useMemo(() => {
    if (!searchTerm.trim()) {
      return conversations;
    }

    const searchLower = searchTerm.toLowerCase();
    return conversations.filter(conversation => 
      conversation.user.name.toLowerCase().includes(searchLower) ||
      conversation.lastMessage.toLowerCase().includes(searchLower) ||
      conversation.user.location?.toLowerCase().includes(searchLower)
    );
  }, [conversations, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <motion.div 
      className={`flex flex-col h-full rounded-3xl ${styles.messageCard} overflow-hidden `}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-white/20">
        <div className="flex items-center justify-between">
          <h2 className="text-base md:text-lg font-bold gradient-text">Mensagens</h2>
          <div className="flex items-center gap-2">
            {onNewMessage && (
              <motion.button
                onClick={onNewMessage}
                className={`p-2 rounded-full ${styles.sendButton} text-white transition-all duration-200 min-w-[40px] min-h-[40px] flex items-center justify-center`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Nova mensagem"
              >
                <FiPlus size={16} />
              </motion.button>
            )}
          </div>
        </div>
      </div>
      
      {/* Search bar */}
      <div className="p-3 md:p-4 border-b border-white/10">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Procurar conversas..."
            className={`block w-full pl-10 md:pl-12 ${searchTerm ? 'pr-10 md:pr-12' : 'pr-4'} py-2 md:py-3 ${styles.searchInput} rounded-xl text-sm placeholder-gray-500 focus:outline-none`}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center"
            >
              <FiX className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
            </button>
          )}
        </div>
      </div>
      
      <div className={`flex-1 overflow-y-auto ${styles.messagesScroll}`}>
        <div className="p-2">
          {filteredConversations.length === 0 && searchTerm.trim() ? (
            <div className="flex flex-col items-center justify-center py-6 md:py-8 px-4">
              <FiSearch className="text-gray-400 mb-3 md:mb-4" size={36} />
              <p className="text-gray-500 text-center mb-2 text-sm md:text-base">Nenhuma conversa encontrada</p>
              <p className="text-gray-400 text-xs md:text-sm text-center">
                Tente procurar por um nome diferente ou mensagem
              </p>
            </div>
          ) : (
            filteredConversations.map((conversation, index) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`${styles.conversationItem} flex items-center p-3 md:p-4 m-1 md:m-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                activeConversation?.id === conversation.id 
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200' 
                  : 'hover:bg-white/20'
              }`}
              onClick={() => onSelectConversation(conversation)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative flex-shrink-0">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${styles.gradientAvatar} p-0.5 `}>
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
                      <div className="text-lg md:text-xl font-bold text-gray-600">
                        {conversation.user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
                {/* Online status indicator */}
                <div className={`absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-white ${styles.onlineIndicator}`}></div>
              </div>
              
              <div className="ml-3 md:ml-4 flex-1 overflow-hidden min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-semibold text-gray-800 truncate text-sm md:text-base pr-2">{conversation.user.name}</p>
                  <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-500 font-medium">{conversation.timestamp}</span>
                    {conversation.unread && (
                      <div className={`w-2 h-2 rounded-full ${styles.unreadBadge}`}></div>
                    )}
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-600 truncate mb-1">
                  {conversation.lastMessage}
                </p>
                {conversation.user.location && (
                  <p className="text-xs text-gray-400 truncate flex items-center">
                    📍 <span className="ml-1 truncate">{conversation.user.location}</span>
                  </p>
                )}
              </div>
            </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageList;
