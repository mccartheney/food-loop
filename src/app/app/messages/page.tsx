'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiUsers, FiLoader } from 'react-icons/fi';
import MessageList from '@/components/messages/MessageList';
import ChatArea from '@/components/messages/ChatArea';
import NewConversationModal from '@/components/messages/NewConversationModal';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import styles from './styles.module.css';

// Define types
interface User {
  name: string;
  avatar: string;
  location?: string;
  email?: string;
}

interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

interface Friend {
  id: string;
  userId: string;
  name: string;
  email: string;
  bio?: string;
  profileImg?: string;
  address?: string;
}

// API response types
interface ApiConversation {
  id: string;
  participants: string[];
  type: 'DIRECT' | 'GROUP';
  name?: string;
  lastActivity: string;
  lastMessage?: {
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
  };
  messages: unknown[];
}

export default function MessagesPage() {
  const { data: session, status } = useSession();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showConversations, setShowConversations] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [showNewConversationModal, setShowNewConversationModal] = useState(false);

  // Get user ID from profile API
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (status === 'authenticated' && session?.user?.email) {
        try {
          const response = await fetch(`/api/me?email=${encodeURIComponent(session.user.email)}`);
          const profileData = await response.json();
          
          if (response.ok && profileData.user?.id) {
            setCurrentUserId(profileData.user.id);
          } else {
            console.error('Failed to fetch user profile:', profileData);
            // Fallback to email if profile fetch fails
            setCurrentUserId(session.user.email);
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
          // Fallback to email if API fails
          setCurrentUserId(session.user.email);
        }
      }
    };

    fetchUserProfile();
  }, [session, status]);

  // Fetch conversations from API
  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/messages?userId=${currentUserId}`);
      const data = await response.json();
      
      if (data.success) {
        // Transform API response to match UI interface
        const transformedConversations: Conversation[] = await Promise.all(
          data.conversations.map(async (conv: ApiConversation) => {
            // Get other participant (assuming DIRECT conversation)
            const otherParticipantId = conv.participants.find(p => p !== currentUserId) || conv.participants[0];
            
            // Try to get participant's name from user API
            let participantName = `User ${otherParticipantId}`;
            try {
              const userResponse = await fetch(`/api/users?id=${otherParticipantId}`);
              const userData = await userResponse.json();
              if (userData.success && userData.user) {
                participantName = userData.user.name || userData.user.email || participantName;
              }
            } catch (err) {
              console.warn('Could not fetch participant name:', err);
            }
            
            return {
              id: conv.id,
              user: {
                name: participantName,
                avatar: '', // No placeholder avatars
                location: ''
              },
              lastMessage: conv.lastMessage?.content || 'No messages yet',
              timestamp: formatTimestamp(conv.lastMessage?.createdAt || conv.lastActivity),
              unread: false // TODO: Implement unread logic based on message status
            };
          })
        );
        
        setConversations(transformedConversations);
        setError(null);
      } else {
        // No conversations found - show empty state
        setConversations([]);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setConversations([]);
      setError('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'now';
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInHours < 48) return '1d';
    return `${Math.floor(diffInHours / 24)}d`;
  };

  useEffect(() => {
    if (currentUserId) {
      fetchConversations();
    }
  }, [currentUserId]);

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
    // Mark conversation as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversation.id ? { ...conv, unread: false } : conv
      )
    );
    if (isMobile) {
      setShowConversations(false);
    }
  };

  const handleBackToConversations = () => {
    setShowConversations(true);
  };

  // Handle starting a new conversation
  const handleNewMessage = () => {
    setShowNewConversationModal(true);
  };

  // Handle friend selection from modal
  const handleSelectFriend = async (friend: Friend) => {
    try {
      // Check if conversation already exists with this friend
      const existingConversation = conversations.find(conv => 
        conv.user.name === friend.name || conv.user.email === friend.email
      );

      if (existingConversation) {
        // If conversation exists, just select it
        setActiveConversation(existingConversation);
        if (isMobile) {
          setShowConversations(false);
        }
        return;
      }

      if (!currentUserId) {
        console.error('No current user ID available');
        return;
      }

      // Create conversation in database first to get proper MongoDB ObjectID
      try {
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            participants: [currentUserId, friend.userId],
            senderId: currentUserId,
            conversationType: 'DIRECT'
          })
        });

        const data = await response.json();
        
        if (data.success && data.conversation) {
          // Create new conversation object with proper MongoDB ID
          const newConversation: Conversation = {
            id: data.conversation.id,
            user: {
              name: friend.name,
              avatar: friend.profileImg || '',
              location: friend.address || ''
            },
            lastMessage: 'Conversa criada',
            timestamp: 'now',
            unread: false
          };

          // Add to conversations list
          setConversations(prev => [newConversation, ...prev]);
          
          // Set as active conversation
          setActiveConversation(newConversation);
          
          // Close the modal
          setShowNewConversationModal(false);
          
          // Refresh conversations list to ensure persistence
          setTimeout(() => {
            fetchConversations();
          }, 1000);
          
          if (isMobile) {
            setShowConversations(false);
          }
        } else {
          console.error('Failed to create conversation:', data);
        }
      } catch (err) {
        console.error('Error creating conversation:', err);
      }

    } catch (err) {
      console.error('Error starting new conversation:', err);
    }
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
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FiLoader className="animate-spin" size={16} />
                <span>Carregando...</span>
              </div>
            ) : error ? (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <span>{error}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{conversations.filter(c => c.unread).length} não lidas</span>
              </div>
            )}
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
                  onNewMessage={handleNewMessage}
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

      {/* New Conversation Modal */}
      {currentUserId && (
        <NewConversationModal
          isOpen={showNewConversationModal}
          onClose={() => setShowNewConversationModal(false)}
          onSelectFriend={handleSelectFriend}
          currentUserId={currentUserId}
        />
      )}
    </DashboardLayout>
  );
}
