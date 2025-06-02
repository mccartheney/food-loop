'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiUserPlus, FiSearch, FiCheck, FiX } from 'react-icons/fi';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useCurrentUser, useFriends, useFriendRequests, useUserSearch } from '@/lib/hooks/useFriends';
import { Friend, FriendRequest } from '@/lib/friendsApi';

type TabType = 'friends' | 'requests' | 'search';

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('friends');
  const [searchQuery, setSearchQuery] = useState('');

  const { user: currentUser } = useCurrentUser();
  const { friends, loading: friendsLoading, removeFriend } = useFriends(currentUser?.id);
  const { 
    requests, 
    loading: requestsLoading, 
    acceptRequest, 
    rejectRequest, 
    cancelRequest 
  } = useFriendRequests(currentUser?.id);
  const { searchResults, loading: searchLoading, searchUsers, clearResults } = useUserSearch();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchUsers(searchQuery.trim());
    } else {
      clearResults();
    }
  };

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
          ) : null}
        </div>
      </div>
    );
  };

  const content = (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Friends</h1>
        <p className="text-gray-600">Manage your connections and discover new friends</p>
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
