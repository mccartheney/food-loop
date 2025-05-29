'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

interface Friend {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isFollowing: boolean;
}

interface FriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  friends: Friend[];
  onFriendClick: (friendId: string) => void;
}

const FriendModal: React.FC<FriendModalProps> = ({ 
  isOpen, 
  onClose, 
  friends,
  onFriendClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedFriends, setDisplayedFriends] = useState(friends);
  const modalRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isOpen && searchRef.current) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);
  
  useEffect(() => {
    setDisplayedFriends(friends);
  }, [friends]);
  
  useEffect(() => {
    if (!searchQuery) {
      setDisplayedFriends(friends);
      return;
    }
    
    const filtered = friends.filter(
      friend => 
        friend.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
        friend.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setDisplayedFriends(filtered);
  }, [searchQuery, friends]);

  const toggleFollow = (friendId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setDisplayedFriends(prev => 
      prev.map(friend => 
        friend.id === friendId 
          ? { ...friend, isFollowing: !friend.isFollowing } 
          : friend
      )
    );
  };
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40">
          {/* Background overlay with opacity - like SearchModal */}
          <motion.div 
            className="absolute inset-0 bg-black/50"
            style={{ marginLeft: '56px' }} // 56px is the width of the navigation bar
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Modal centered - like original design */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none" style={{ marginLeft: '56px' }}>
            <motion.div
              ref={modalRef}
              className="bg-white rounded-xl w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl pointer-events-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="border-b p-4 flex items-center justify-center relative">
                <h3 className="font-semibold text-center">Friends</h3>
                <button 
                  className="absolute right-4 text-gray-600" 
                  onClick={onClose}
                >
                  <FiX size={24} />
                </button>
              </div>
              
              {/* Search */}
              <div className="p-3 border-b">
                <div className="relative flex items-center">
                  <FiSearch className="absolute left-3 text-gray-400" size={16} />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-full bg-gray-100 pl-10 py-2 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Friends List */}
              <div className="overflow-y-auto flex-1">
                {displayedFriends.length > 0 ? (
                  displayedFriends.map(friend => (
                    <motion.div 
                      key={friend.id}
                      className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => onFriendClick(friend.id)}
                    >
                      <div className="flex items-center">
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center">
                            <div className="font-medium text-gray-500 text-lg">
                              {friend.displayName.charAt(0).toUpperCase()}
                            </div>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-sm">{friend.username}</div>
                          <div className="text-xs text-gray-500">{friend.displayName}</div>
                        </div>
                      </div>
                      <motion.button
                        className={`btn btn-sm ${friend.isFollowing ? 'btn-outline' : 'btn-primary'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => toggleFollow(friend.id, e)}
                      >
                        {friend.isFollowing ? 'Friends' : 'Add Friend'}
                      </motion.button>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No friends match your search.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FriendModal;