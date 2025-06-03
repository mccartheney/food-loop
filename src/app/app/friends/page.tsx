'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FiUsers, FiUserPlus, FiSearch, FiCheck, FiX } from 'react-icons/fi';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

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
      label: 'Find Friends',
      icon: FiSearch,
    },
  ];

  const renderFriendsList = () => {
    if (friendsLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      );
    }

    if (friends.length === 0) {
      return (
        <div className="text-center py-12">
          <FiUsers className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No friends yet</h3>
          <p className="text-gray-500 mb-4">Start connecting with people!</p>
          <button 
            onClick={() => setActiveTab('search')}
            className="btn btn-primary"
          >
            Find Friends
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {friends.map((friend: Friend) => (
          <motion.div
            key={friend.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-4 shadow-sm border flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                {friend.profileImg ? (
                  <img 
                    src={friend.profileImg} 
                    alt={friend.name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-medium text-gray-600">
                    {friend.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{friend.name}</h3>
                <p className="text-sm text-gray-500">{friend.bio || friend.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => window.open(`/app/profile/${friend.userId}`, '_blank')}
                className="btn btn-sm btn-outline"
              >
                View Profile
              </button>
              <button
                onClick={() => removeFriend(friend.id)}
                className="btn btn-sm btn-error btn-outline"
              >
                Remove
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderRequestsList = () => {
    if (requestsLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      );
    }

    const hasRequests = requests.received.length > 0 || requests.sent.length > 0;

    if (!hasRequests) {
      return (
        <div className="text-center py-12">
          <FiUserPlus className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No friend requests</h3>
          <p className="text-gray-500">All caught up!</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Received Requests */}
        {requests.received.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Received Requests ({requests.received.length})
            </h3>
            <div className="space-y-4">
              {requests.received.map((request: FriendRequest) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg p-4 shadow-sm border flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      {request.requesterProfileImg ? (
                        <img 
                          src={request.requesterProfileImg} 
                          alt={request.requesterName || 'User'} 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-medium text-gray-600">
                          {request.requesterName?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{request.requesterName}</h3>
                      <p className="text-sm text-gray-500">{request.requesterBio || request.requesterEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => acceptRequest(request.id)}
                      className="btn btn-sm btn-primary"
                    >
                      <FiCheck size={16} />
                      Accept
                    </button>
                    <button
                      onClick={() => rejectRequest(request.id)}
                      className="btn btn-sm btn-outline"
                    >
                      <FiX size={16} />
                      Decline
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Sent Requests */}
        {requests.sent.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Sent Requests ({requests.sent.length})
            </h3>
            <div className="space-y-4">
              {requests.sent.map((request: FriendRequest) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg p-4 shadow-sm border flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      {request.receiverProfileImg ? (
                        <img 
                          src={request.receiverProfileImg} 
                          alt={request.receiverName || 'User'} 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-medium text-gray-600">
                          {request.receiverName?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{request.receiverName}</h3>
                      <p className="text-sm text-gray-500">{request.receiverBio || request.receiverEmail}</p>
                      <p className="text-xs text-gray-400">Request pending...</p>
                    </div>
                  </div>
                  <button
                    onClick={() => cancelRequest(request.id)}
                    className="btn btn-sm btn-outline"
                  >
                    Cancel
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSearch = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Find Friends</h3>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Enter user ID, name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="input input-bordered flex-1"
            />
            <button
              onClick={handleSearch}
              disabled={searchLoading}
              className="btn btn-primary"
            >
              {searchLoading ? <div className="loading loading-spinner loading-sm"></div> : <FiSearch size={20} />}
              Search
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div>
          {searchLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="loading loading-spinner loading-lg"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Search Results</h3>
              {searchResults.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg p-4 shadow-sm border flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      {user.profileImg ? (
                        <img 
                          src={user.profileImg} 
                          alt={user.name} 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-medium text-gray-600">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.bio || user.email}</p>
                      {user.address && (
                        <p className="text-xs text-gray-400">📍 {user.address}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => window.open(`/app/profile/${user.userId}`, '_blank')}
                      className="btn btn-sm btn-outline"
                    >
                      View Profile
                    </button>
                    {user.friendshipStatus === 'friend' && (
                      <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                        Already Friend
                      </span>
                    )}
                    {user.friendshipStatus === 'pending_sent' && (
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
                          Request Sent
                        </span>
                        {user.requestId && (
                          <button
                            onClick={() => cancelRequest(user.requestId!)}
                            className="btn btn-sm btn-outline"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    )}
                    {user.friendshipStatus === 'pending_received' && user.requestId && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => acceptRequest(user.requestId!)}
                          className="btn btn-sm btn-primary"
                        >
                          <FiCheck size={16} />
                          Accept Request
                        </button>
                        <button
                          onClick={() => rejectRequest(user.requestId!)}
                          className="btn btn-sm btn-outline"
                        >
                          <FiX size={16} />
                          Decline
                        </button>
                      </div>
                    )}
                    {user.friendshipStatus === 'none' && (
                      <button
                        onClick={() => sendFriendRequest(user.userId)}
                        className="btn btn-sm btn-primary"
                      >
                        <FiUserPlus size={16} />
                        Add Friend
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : searchQuery && !searchLoading ? (
            <div className="text-center py-12">
              <FiSearch className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500">Try searching with a different term</p>
            </div>
          ) : !searchLoading && searchResults.length === 0 && !searchQuery.trim() ? (
            <div className="text-center py-12">
              <FiUsers className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">All Users</h3>
              <p className="text-gray-500">Here you can see all users and connect with them!</p>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  if (userLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center py-12">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </DashboardLayout>
    );
  }

  const content = (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Friends</h1>
        <p className="text-gray-600">Manage your connections and discover new friends</p>
        {currentUser && (
          <p className="text-sm text-gray-500 mt-2">
            Welcome back, {currentUser.user.name}! 
            {currentUser.bio && ` • ${currentUser.bio}`}
          </p>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className="bg-primary text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'friends' && renderFriendsList()}
        {activeTab === 'requests' && renderRequestsList()}
        {activeTab === 'search' && renderSearch()}
      </motion.div>
    </div>
  );

  return <DashboardLayout>{content}</DashboardLayout>;
}
