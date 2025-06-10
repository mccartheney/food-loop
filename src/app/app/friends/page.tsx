'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUsers, FiUserPlus, FiSearch, FiHeart, FiMessageCircle } from 'react-icons/fi';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import FriendCard from '@/components/friends/FriendCard';
import FriendRequestCard from '@/components/friends/FriendRequestCard';
import SearchInterface from '@/components/friends/SearchInterface';
import styles from './styles.module.css';

type TabType = 'friends' | 'requests' | 'search';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

interface Profile {
  id: string;
  userId: string;
  bio: string | null;
  profileImg: string | null;
  address: string | null;
  user: User;
}

interface Friend {
  id: string;
  userId: string;
  name: string;
  email: string;
  bio: string | null;
  profileImg: string | null;
  address: string | null;
}

interface FriendRequest {
  id: string;
  receiverId?: string;
  receiverName?: string;
  receiverEmail?: string;
  receiverBio?: string | null;
  receiverProfileImg?: string | null;
  requesterId?: string;
  requesterName?: string;
  requesterEmail?: string;
  requesterBio?: string | null;
  requesterProfileImg?: string | null;
  status: string;
  createdAt: string;
  type: 'sent' | 'received';
}

interface SearchedUser {
  id: string;
  userId: string;
  name: string;
  email: string;
  bio: string | null;
  profileImg: string | null;
  address: string | null;
  isActive: boolean;
  friendshipStatus: 'friend' | 'pending_sent' | 'pending_received' | 'none';
  requestId?: string;
}

export default function FriendsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<TabType>('friends');
  const [searchQuery, setSearchQuery] = useState('');

  // State for current user and friends data
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<{
    sent: FriendRequest[];
    received: FriendRequest[];
  }>({ sent: [], received: [] });
  const [searchResults, setSearchResults] = useState<SearchedUser[]>([]);

  // Loading states
  const [userLoading, setUserLoading] = useState(true);
  const [friendsLoading, setFriendsLoading] = useState(false);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Direct API calls
  const fetchCurrentUser = useCallback(async () => {
    if (!session?.user?.email) {
      setCurrentUser(null);
      setUserLoading(false);
      return;
    }

    try {
      setUserLoading(true);
      const response = await fetch(`/api/me?email=${encodeURIComponent(session.user.email)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const data = await response.json();
      setCurrentUser(data);
    } catch (error) {
      console.error('Error fetching current user:', error);
    } finally {
      setUserLoading(false);
    }
  }, [session?.user?.email]);

  const fetchFriends = useCallback(async () => {
    if (!currentUser?.userId) {
      setFriends([]);
      return;
    }

    try {
      setFriendsLoading(true);
      const response = await fetch(`/api/friends?userId=${currentUser.userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch friends');
      }
      
      const data = await response.json();
      setFriends(data.success ? data.friends : []);
    } catch (error) {
      console.error('Error fetching friends:', error);
      setFriends([]);
    } finally {
      setFriendsLoading(false);
    }
  }, [currentUser?.userId]);

  const fetchFriendRequests = useCallback(async () => {
    if (!currentUser?.userId) {
      setRequests({ sent: [], received: [] });
      return;
    }

    try {
      setRequestsLoading(true);
      const response = await fetch(`/api/friends/requests?userId=${currentUser.userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch friend requests');
      }
      
      const data = await response.json();
      if (data.success) {
        setRequests({
          sent: data.sentRequests || [],
          received: data.receivedRequests || []
        });
      }
    } catch (error) {
      console.error('Error fetching friend requests:', error);
      setRequests({ sent: [], received: [] });
    } finally {
      setRequestsLoading(false);
    }
  }, [currentUser?.userId]);

  // Friend actions
  const removeFriend = useCallback(async (friendId: string) => {
    if (!currentUser?.userId) return;

    console.log('Removing friend:', { friendId, userId: currentUser.userId });

    try {
      const url = `/api/friends/${friendId}?userId=${currentUser.userId}`;
      console.log('Request URL:', url);
      
      const response = await fetch(url, {
        method: 'DELETE',
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Remove friend error:', errorData);
        throw new Error(errorData.error || 'Failed to remove friend');
      }
      
      const data = await response.json();
      console.log('Success response:', data);
      
      if (data.success) {
        setFriends(prev => prev.filter(friend => friend.id !== friendId));
      }
    } catch (error) {
      console.error('Error removing friend:', error);
      alert('Failed to remove friend. Please try again.');
    }
  }, [currentUser?.userId]);

  const acceptRequest = useCallback(async (requestId: string) => {
    if (!currentUser?.userId) return;

    try {
      const response = await fetch('/api/friends/requests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: currentUser.userId, 
          requestId, 
          action: 'accept' 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to accept friend request');
      }
      
      const data = await response.json();
      if (data.success) {
        await fetchFriendRequests();
        await fetchFriends();
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  }, [currentUser?.userId, fetchFriendRequests, fetchFriends]);

  const rejectRequest = useCallback(async (requestId: string) => {
    if (!currentUser?.userId) return;

    try {
      const response = await fetch('/api/friends/requests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: currentUser.userId, 
          requestId, 
          action: 'reject' 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to reject friend request');
      }
      
      const data = await response.json();
      if (data.success) {
        await fetchFriendRequests();
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  }, [currentUser?.userId, fetchFriendRequests]);

  const cancelRequest = useCallback(async (requestId: string) => {
    if (!currentUser?.userId) return;

    try {
      const response = await fetch(`/api/friends/requests?userId=${currentUser.userId}&requestId=${requestId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to cancel friend request');
      }
      
      const data = await response.json();
      if (data.success) {
        await fetchFriendRequests();
      }
    } catch (error) {
      console.error('Error cancelling friend request:', error);
    }
  }, [currentUser?.userId, fetchFriendRequests]);

  // Search functionality
  const handleSearch = useCallback(async () => {
    if (!currentUser?.userId) return;

    try {
      setSearchLoading(true);
      let url = `/api/friends/search?userId=${currentUser.userId}`;
      
      if (searchQuery.trim()) {
        url += `&q=${encodeURIComponent(searchQuery.trim())}`;
      } else {
        url += `&showAll=true`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      if (data.success) {
        setSearchResults(data.users || []);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching users:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, [searchQuery, currentUser?.userId]);

  const clearResults = useCallback(() => {
    setSearchResults([]);
  }, []);

  // Load all users when search tab is opened
  const loadAllUsers = useCallback(async () => {
    if (!currentUser?.userId) return;

    try {
      setSearchLoading(true);
      const response = await fetch(`/api/friends/search?userId=${currentUser.userId}&showAll=true`);
      
      if (!response.ok) {
        throw new Error('Failed to load users');
      }
      
      const data = await response.json();
      if (data.success) {
        setSearchResults(data.users || []);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error loading users:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, [currentUser?.userId]);

  // Friend request actions
  const sendFriendRequest = useCallback(async (friendUserId: string) => {
    if (!currentUser?.userId) return;

    try {
      const response = await fetch('/api/friends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser.userId,
          friendUserId: friendUserId,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (data.canAccept && data.requestId) {
          // There's a pending request from the other user
          await acceptRequest(data.requestId);
          return;
        }
        throw new Error(data.error || 'Failed to send friend request');
      }

      if (data.success) {
        // Refresh the users list to update the status
        if (searchQuery.trim()) {
          await handleSearch();
        } else {
          await loadAllUsers();
        }
        // Also refresh friend requests
        await fetchFriendRequests();
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
      alert(`Failed to send friend request: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [currentUser?.userId, searchQuery, handleSearch, loadAllUsers, fetchFriendRequests, acceptRequest]);

  // Effects
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    if (currentUser?.userId) {
      fetchFriends();
      fetchFriendRequests();
    }
  }, [currentUser?.userId, fetchFriends, fetchFriendRequests]);

  // Load all users when search tab is opened
  useEffect(() => {
    if (activeTab === 'search' && currentUser?.userId && searchResults.length === 0 && !searchQuery.trim()) {
      loadAllUsers();
    }
  }, [activeTab, currentUser?.userId, searchResults.length, searchQuery, loadAllUsers]);

  // Navigation to messages
  const handleMessage = useCallback((userId: string) => {
    window.open(`/app/messages`, '_blank');
  }, []);

  // Tab configuration
  const tabs = [
    {
      id: 'friends' as TabType,
      label: 'Friends',
      icon: FiUsers,
      count: friends.length,
    },
    {
      id: 'requests' as TabType,
      label: 'Requests',
      icon: FiUserPlus,
      count: requests.received.length + requests.sent.length,
    },
    {
      id: 'search' as TabType,
      label: 'Search',
      icon: FiSearch,
    },
  ];

  const renderFriendsList = () => {
    if (friendsLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className={`w-8 h-8 rounded-full ${styles.loadingSpinner}`}></div>
        </div>
      );
    }

    if (friends.length === 0) {
      return (
        <motion.div 
          className={`${styles.emptyState} rounded-2xl p-12 text-center`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FiUsers className={`mx-auto mb-6 ${styles.emptyIcon}`} size={64} />
          <h3 className="text-2xl font-bold text-gray-800 mb-4">No friends yet</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Start connecting with amazing people! Use the search to find friends and expand your network.
          </p>
          <motion.button 
            onClick={() => setActiveTab('search')}
            className={`px-6 py-3 rounded-xl ${styles.primaryButton} flex items-center gap-2 mx-auto`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiSearch size={18} />
            <span className="font-medium">Find Friends</span>
          </motion.button>
        </motion.div>
      );
    }

    return (
      <motion.div 
        className={`${styles.customScroll} space-y-2 max-h-[70vh] overflow-y-auto`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {friends.map((friend: Friend, index: number) => (
          <FriendCard
            key={friend.id}
            friend={friend}
            onRemove={removeFriend}
            onViewProfile={(userId) => window.open(`/app/profile/${userId}`, '_blank')}
            onMessage={handleMessage}
            index={index}
          />
        ))}
      </motion.div>
    );
  };

  const renderRequestsList = () => {
    if (requestsLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className={`w-8 h-8 rounded-full ${styles.loadingSpinner}`}></div>
        </div>
      );
    }

    const hasRequests = requests.received.length > 0 || requests.sent.length > 0;

    if (!hasRequests) {
      return (
        <motion.div 
          className={`${styles.emptyState} rounded-2xl p-12 text-center`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FiUserPlus className={`mx-auto mb-6 ${styles.emptyIcon}`} size={64} />
          <h3 className="text-2xl font-bold text-gray-800 mb-4">All caught up!</h3>
          <p className="text-gray-500">
            You don't have any pending friend requests at the moment.
          </p>
        </motion.div>
      );
    }

    const allRequests = [
      ...requests.received.map(req => ({ ...req, type: 'received' as const })),
      ...requests.sent.map(req => ({ ...req, type: 'sent' as const }))
    ];

    return (
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div 
            className={`${styles.statsCard} rounded-xl p-4 text-center`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-2xl font-bold text-blue-600">{requests.received.length}</div>
            <div className="text-sm text-gray-600">Received</div>
          </motion.div>
          <motion.div 
            className={`${styles.statsCard} rounded-xl p-4 text-center`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-2xl font-bold text-yellow-600">{requests.sent.length}</div>
            <div className="text-sm text-gray-600">Sent</div>
          </motion.div>
        </div>

        {/* Requests list */}
        <div className={`${styles.customScroll} space-y-2 max-h-[60vh] overflow-y-auto`}>
          {allRequests.map((request, index) => (
            <FriendRequestCard
              key={request.id}
              request={request}
              onAccept={acceptRequest}
              onReject={rejectRequest}
              onCancel={cancelRequest}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    );
  };

  const renderSearch = () => {
    return (
      <SearchInterface
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
        searchResults={searchResults}
        isLoading={searchLoading}
        onSendRequest={sendFriendRequest}
        onAcceptRequest={acceptRequest}
        onRejectRequest={rejectRequest}
        onCancelRequest={cancelRequest}
        onViewProfile={(userId) => window.open(`/app/profile/${userId}`, '_blank')}
      />
    );
  };

  if (userLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center py-12">
          <div className={`w-8 h-8 rounded-full ${styles.loadingSpinner}`}></div>
        </div>
      </DashboardLayout>
    );
  }

  const content = (
    <div className="max-w-6xl mx-auto">
      {/* Modern Header with Glassmorphism */}
      <motion.header 
        className={`${styles.headerGlass} rounded-2xl p-6 mb-6 sticky top-0 z-10`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2 flex items-center gap-3">
              <FiHeart className="text-pink-500" />
              Friends
            </h1>
            <p className="text-gray-600">Manage your connections and discover new friends</p>
            {currentUser && (
              <p className="text-sm text-gray-500 mt-2">
                Hello, {currentUser.user.name}! 
                {currentUser.bio && ` • ${currentUser.bio}`}
              </p>
            )}
          </div>
          
          {/* Statistics Cards */}
          <div className="flex gap-4">
            <motion.div 
              className={`${styles.statsCard} rounded-xl p-4 text-center min-w-[80px]`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-blue-600">{friends.length}</div>
              <div className="text-xs text-gray-600">Friends</div>
            </motion.div>
            <motion.div 
              className={`${styles.statsCard} rounded-xl p-4 text-center min-w-[80px]`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-purple-600">
                {requests.received.length + requests.sent.length}
              </div>
              <div className="text-xs text-gray-600">Pending</div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Modern Tab Navigation */}
      <motion.div 
        className={`${styles.tabNav} rounded-2xl mb-6 overflow-hidden`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? `${styles.tabButtonActive}`
                  : `${styles.tabButton}`
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`${styles.tabBadge} text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center font-medium`}>
                  {tab.count}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content with Enhanced Animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === 'search' ? 20 : activeTab === 'friends' ? -20 : 0, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: activeTab === 'search' ? -20 : activeTab === 'friends' ? 20 : 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {activeTab === 'friends' && renderFriendsList()}
          {activeTab === 'requests' && renderRequestsList()}
          {activeTab === 'search' && renderSearch()}
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return <DashboardLayout>{content}</DashboardLayout>;
}