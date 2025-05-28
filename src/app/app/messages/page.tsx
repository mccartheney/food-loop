'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageList from '@/components/messages/MessageList';
import ChatArea from '@/components/messages/ChatArea';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

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
    user: { name: 'Manuel Tomas', avatar: '/avatars/user1.png', location: 'Porto' },
    lastMessage: 'Hello there!',
    timestamp: '7:43',
    unread: false
  },
  {
    id: 2,
    user: { name: 'Manuel Luis', avatar: '/avatars/user2.png', location: 'Lisbon' },
    lastMessage: 'How are you doing?',
    timestamp: '7:43',
    unread: true
  },
  {
    id: 3,
    user: { name: 'Manuel MC', avatar: '/avatars/user3.png', location: 'Faro' },
    lastMessage: 'Are you available tomorrow?',
    timestamp: '7:43',
    unread: false
  },
  {
    id: 4,
    user: { name: 'Manuel Joao', avatar: '/avatars/user4.png', location: 'Braga' },
    lastMessage: 'I have some food to share',
    timestamp: '7:43',
    unread: false
  },
  {
    id: 5,
    user: { name: 'Manuel Afonso', avatar: '/avatars/user5.png', location: 'Coimbra' },
    lastMessage: 'Thanks for your help!',
    timestamp: '7:43',
    unread: false
  },
  {
    id: 6,
    user: { name: 'Manuel Lenadro', avatar: '/avatars/user6.png', location: 'Setubal' },
    lastMessage: 'See you soon',
    timestamp: '7:43',
    unread: false
  },
  {
    id: 7,
    user: { name: 'Manuel Zacarias', avatar: '/avatars/user7.png', location: 'Aveiro' },
    lastMessage: 'Perfect!',
    timestamp: '7:43',
    unread: false
  }
];

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState<Conversation>(conversations[0]);
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

  return (
    <DashboardLayout>
      {/* Added negative left margin to entire container */}
      <div className="h-[calc(100vh-2rem)] flex overflow-hidden -ml-8 pl-0">
        {/* Message List - Left Panel */}
        <AnimatePresence mode="wait">
          {(!isMobile || showConversations) && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: isMobile ? '100%' : '300px', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full bg-transparent z-10 -ml-3"
            >
              <MessageList 
                conversations={conversations} 
                activeConversation={activeConversation}
                onSelectConversation={handleSelectConversation}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reduced spacer width between components */}
        {!isMobile && <div className="w-4"></div>}

        {/* Chat Area - Right Panel */}
        <AnimatePresence mode="wait">
          {(!isMobile || !showConversations) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 bg-gray-50 rounded-2xl shadow-sm"
            >
              <div className="h-full w-full">
                <ChatArea 
                  conversation={activeConversation} 
                  onBackClick={isMobile ? handleBackToConversations : undefined}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}