'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiUsers } from 'react-icons/fi';
import MessageList from '@/components/messages/MessageList';
import ChatArea from '@/components/messages/ChatArea';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import styles from './styles.module.css';

// Define types
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

const conversations: Conversation[] = [
  {
    id: 1,
    user: { name: 'Ana Silva', avatar: '/avatars/user1.png', location: 'Porto' },
    lastMessage: 'Olá! Tenho tomates frescos para compartilhar',
    timestamp: '2h',
    unread: false
  },
  {
    id: 2,
    user: { name: 'Carlos Santos', avatar: '/avatars/user2.png', location: 'Lisboa' },
    lastMessage: 'Obrigado pela receita!',
    timestamp: '5h',
    unread: true
  },
  {
    id: 3,
    user: { name: 'Maria Costa', avatar: '/avatars/user3.png', location: 'Faro' },
    lastMessage: 'Você está disponível amanhã?',
    timestamp: '1d',
    unread: false
  },
  {
    id: 4,
    user: { name: 'João Pereira', avatar: '/avatars/user4.png', location: 'Braga' },
    lastMessage: 'Tenho alguns ingredientes para partilhar',
    timestamp: '2d',
    unread: false
  },
  {
    id: 5,
    user: { name: 'Sofia Oliveira', avatar: '/avatars/user5.png', location: 'Coimbra' },
    lastMessage: 'Perfeito! Muito obrigada',
    timestamp: '3d',
    unread: false
  },
  {
    id: 6,
    user: { name: 'Pedro Martins', avatar: '/avatars/user6.png', location: 'Setúbal' },
    lastMessage: 'Vemo-nos em breve',
    timestamp: '1s',
    unread: false
  },
  {
    id: 7,
    user: { name: 'Rita Fernandes', avatar: '/avatars/user7.png', location: 'Aveiro' },
    lastMessage: 'Adorei a receita!',
    timestamp: '1s',
    unread: false
  }
];

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showConversations, setShowConversations] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      if (!isMobileView) {
        setShowConversations(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    if (isMobile) {
      setShowConversations(false);
    }
  };

  const handleBackToConversations = () => {
    setShowConversations(true);
  };

  const EmptyState = () => (
    <motion.div 
      className={`flex-1 ${styles.chatArea} rounded-3xl flex items-center justify-center`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center p-8">
        <motion.div
          className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center"
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <FiMessageCircle className="text-white" size={32} />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Selecione uma conversa</h3>
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
          Escolha uma conversa da lista para começar a trocar mensagens com outros usuários.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <FiUsers size={16} />
          <span>{conversations.length} conversas ativas</span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <DashboardLayout>
      {/* Header with Glassmorphism */}
      <motion.header 
        className="sticky top-2 z-10 glass-effect rounded-xl  border-b border-white/20 p-6 mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <h1 className="text-xl font-bold gradient-text">Mensagens</h1>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>{conversations.filter(c => c.unread).length} não lidas</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="px-6">
        <div className="h-[calc(100vh-10rem)] md:p-10 flex gap-6 overflow-hidden">
          {/* Message List - Left Panel */}
          <AnimatePresence mode="wait">
            {(!isMobile || showConversations) && (
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={isMobile ? 'w-full' : 'w-96'}
              >
                <MessageList 
                  conversations={conversations} 
                  activeConversation={activeConversation}
                  onSelectConversation={handleSelectConversation}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Area - Right Panel */}
          <AnimatePresence mode="wait">
            {(!isMobile || !showConversations) && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex-1"
              >
                {activeConversation ? (
                  <ChatArea 
                    conversation={activeConversation} 
                    onBackClick={isMobile ? handleBackToConversations : undefined}
                  />
                ) : (
                  <EmptyState />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}
