'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiSearch, FiUser, FiUserPlus, FiCheck, FiX, FiEye, FiMapPin, FiLoader } from 'react-icons/fi';
import styles from '../../app/app/friends/styles.module.css';

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

interface SearchInterfaceProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
  searchResults: SearchedUser[];
  isLoading: boolean;
  onSendRequest: (userId: string) => void;
  onAcceptRequest: (requestId: string) => void;
  onRejectRequest: (requestId: string) => void;
  onCancelRequest: (requestId: string) => void;
  onViewProfile: (userId: string) => void;
}

const SearchInterface: React.FC<SearchInterfaceProps> = ({
  searchQuery,
  onSearchChange,
  onSearch,
  searchResults,
  isLoading,
  onSendRequest,
  onAcceptRequest,
  onRejectRequest,
  onCancelRequest,
  onViewProfile
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'friend':
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles.friendBadge} ${styles.statusBadge}`}>
            ✓ Friend
          </span>
        );
      case 'pending_sent':
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles.pendingBadge} ${styles.statusBadge}`}>
            ⏳ Sent
          </span>
        );
      case 'pending_received':
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles.requestBadge} ${styles.statusBadge}`}>
            📩 Received
          </span>
        );
      default:
        return null;
    }
  };

  const renderActionButtons = (user: SearchedUser) => {
    switch (user.friendshipStatus) {
      case 'friend':
        return (
          <motion.button
            onClick={() => onViewProfile(user.userId)}
            className={`p-3 rounded-xl ${styles.secondaryButton} flex items-center gap-2`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiEye size={16} />
            <span className="hidden sm:inline text-sm font-medium">View Profile</span>
          </motion.button>
        );
      
      case 'pending_sent':
        return (
          <div className="flex items-center gap-2">
            {user.requestId && (
              <motion.button
                onClick={() => onCancelRequest(user.requestId!)}
                className={`p-3 rounded-xl ${styles.dangerButton} flex items-center gap-2`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiX size={16} />
                <span className="hidden sm:inline text-sm font-medium">Cancel</span>
              </motion.button>
            )}
          </div>
        );
      
      case 'pending_received':
        return (
          <div className="flex items-center gap-2">
            {user.requestId && (
              <>
                <motion.button
                  onClick={() => onAcceptRequest(user.requestId!)}
                  className={`p-3 rounded-xl ${styles.primaryButton} flex items-center gap-2`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiCheck size={16} />
                  <span className="hidden sm:inline text-sm font-medium">Accept</span>
                </motion.button>
                <motion.button
                  onClick={() => onRejectRequest(user.requestId!)}
                  className={`p-3 rounded-xl ${styles.secondaryButton} flex items-center gap-2`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiX size={16} />
                  <span className="hidden sm:inline text-sm font-medium">Decline</span>
                </motion.button>
              </>
            )}
          </div>
        );
      
      default:
        return (
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => onViewProfile(user.userId)}
              className={`p-3 rounded-xl ${styles.secondaryButton} flex items-center gap-2`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiEye size={16} />
              <span className="hidden sm:inline text-sm font-medium">View Profile</span>
            </motion.button>
            <motion.button
              onClick={() => onSendRequest(user.userId)}
              className={`p-3 rounded-xl ${styles.primaryButton} flex items-center gap-2`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiUserPlus size={16} />
              <span className="hidden sm:inline text-sm font-medium">Add</span>
            </motion.button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <motion.div 
        className={`${styles.searchContainer} rounded-2xl p-6`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FiSearch className="text-blue-500" />
          Find Friends
        </h3>
        
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Enter name, email or user ID..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`w-full px-4 py-3 pl-12 rounded-xl ${styles.searchInput} focus:outline-none text-gray-800 placeholder-gray-500`}
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          
          <motion.button
            onClick={onSearch}
            disabled={isLoading}
            className={`px-6 py-3 rounded-xl ${styles.primaryButton} flex items-center gap-2 min-w-[120px] justify-center`}
            whileHover={!isLoading ? { scale: 1.05 } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
          >
            {isLoading ? (
              <FiLoader className="animate-spin" size={18} />
            ) : (
              <FiSearch size={18} />
            )}
            <span className="font-medium">
              {isLoading ? 'Searching...' : 'Search'}
            </span>
          </motion.button>
        </div>
        
        <p className="text-sm text-gray-500 mt-3">
          💡 Leave empty to see all available users
        </p>
      </motion.div>

      {/* Search Results */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className={`w-8 h-8 rounded-full ${styles.loadingSpinner}`}></div>
        </div>
      ) : searchResults.length > 0 ? (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FiUser className="text-purple-500" />
            Search Results ({searchResults.length})
          </h3>
          
          {searchResults.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 300
              }}
              className={`${styles.friendCard} rounded-2xl p-6 relative`}
            >
              {/* Status badge */}
              <div className="absolute top-4 right-4">
                {getStatusBadge(user.friendshipStatus)}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1 min-w-0 pr-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-full ${styles.gradientAvatar} p-0.5 shadow-lg`}>
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                        {user.profileImg ? (
                          <Image
                            src={user.profileImg}
                            alt={user.name}
                            width={64}
                            height={64}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <FiUser className="text-gray-500" size={24} />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Active status */}
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-lg ${
                      user.isActive ? `bg-green-500 ${styles.onlineIndicator}` : styles.offlineIndicator
                    }`}></div>
                  </div>

                  {/* User info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-800 truncate mb-1">
                      {user.name}
                    </h3>
                    
                    {user.bio && (
                      <p className="text-sm text-gray-600 truncate mb-1">
                        {user.bio}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="truncate">{user.email}</span>
                      {user.address && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <FiMapPin size={12} />
                            <span className="truncate">{user.address}</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="mt-2">
                      <span className={`text-xs font-medium ${
                        user.isActive ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {user.isActive ? '🟢 Active' : '⚫ Inactive'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className={styles.actionButtons}>
                  {renderActionButtons(user)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : searchQuery && !isLoading ? (
        <motion.div 
          className={`${styles.emptyState} rounded-2xl p-12 text-center`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FiSearch className={`mx-auto mb-4 ${styles.emptyIcon}`} size={48} />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No users found</h3>
          <p className="text-gray-500">
            Try searching with a different term or check your spelling.
          </p>
        </motion.div>
      ) : !searchQuery.trim() && searchResults.length === 0 && !isLoading ? (
        <motion.div 
          className={`${styles.emptyState} rounded-2xl p-12 text-center`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FiUser className={`mx-auto mb-4 ${styles.emptyIcon}`} size={48} />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Discover New Friends</h3>
          <p className="text-gray-500 mb-4">
            Use the search above to find people by name, email or ID.
          </p>
          <p className="text-sm text-gray-400">
            💡 Tip: Leave the field empty and click "Search" to see all users!
          </p>
        </motion.div>
      ) : null}
    </div>
  );
};

export default SearchInterface;