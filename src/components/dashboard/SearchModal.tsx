'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiX, FiSearch, FiUsers } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

// Define types to match the actual API response
interface User {
  id: string;
  name: string;
  email: string;
  authMethod: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FriendProfile {
  id: string;
  userId: string;
  profileImg: string | null;
  bio: string | null;
  address: string | null;
  user: User;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FriendProfile[]>([]);
  const [friends, setFriends] = useState<FriendProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  console.log(friends)

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Fetch user's friends when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchFriends();
    }
  }, [isOpen]);

  const fetchFriends = async () => {
    setLoading(true);
    try {
      // Get current user's email from localStorage or session
      const userEmail = localStorage.getItem('userEmail') || 'mccartheney@gmail.com';
      
      const response = await fetch(`/api/me?email=${encodeURIComponent(userEmail)}`);
      if (response.ok) {
        const userData = await response.json();
        // Combine friends and friendOf arrays
        const allFriends = [
          ...(userData.friends || []),
          ...(userData.friendOf || [])
        ];
        // Remove duplicates based on id
        const uniqueFriends = allFriends.filter((friend, index, self) =>
          index === self.findIndex((f) => f.id === friend.id)
        );
        setFriends(uniqueFriends);
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
      setFriends([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = friends.filter(
      friend => 
        friend.user.name.toLowerCase().includes(query) || 
        friend.user.email.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
  }, [searchQuery, friends]);
  
  // Handle click outside to close
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
  
  // Prevent body scroll when modal is open
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

  const handleProfileClick = (friend: FriendProfile) => {
    // Navigate to profile page using the profile id
    router.push(`/app/profile/${friend.id}`);
    onClose();
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40">
          {/* This overlay covers everything except the navbar */}
          <motion.div 
            className="absolute inset-0 bg-black/50" 
            style={{ marginLeft: '56px' }} // 56px is the width of the navigation bar (14rem)
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          
          <div className="flex h-full">
            {/* This empty space represents where the navbar is */}
            <div className="w-14 flex-shrink-0"></div>
            
            {/* Search modal panel - Changed to white background */}
            <motion.div
              ref={modalRef}
              className="w-[400px] h-full bg-white text-gray-800 overflow-hidden flex flex-col z-50 shadow-xl"
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="p-5 pb-3 border-b border-gray-200">
                <h2 className="text-2xl font-bold mb-5 text-gray-900">Search</h2>
                
                <div className="relative">
                  <div className="relative flex items-center">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search friends"
                      className="input input-bordered w-full bg-gray-100 border-gray-200 text-gray-800 focus:border-primary focus:outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery ? (
                      <button 
                        className="btn btn-ghost btn-sm btn-circle absolute right-2 text-gray-400 hover:text-primary"
                        onClick={() => setSearchQuery('')}
                      >
                        <FiX size={18} />
                      </button>
                    ) : (
                      <FiSearch className="absolute right-3 text-gray-400" size={18} />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="flex flex-col items-center justify-center p-8">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                    <p className="text-sm text-gray-500 mt-2">Loading friends...</p>
                  </div>
                ) : searchQuery ? (
                  // Search results
                  searchResults.length > 0 ? (
                    searchResults.map(friend => (
                      <div 
                        key={friend.id}
                        className="px-5 py-3 flex items-center hover:bg-gray-50 cursor-pointer border-b border-gray-200 transition-colors"
                        onClick={() => handleProfileClick(friend)}
                      >
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                            {friend.profileImg ? (
                              <Image
                                src={friend.profileImg}
                                alt={friend.user.name}
                                width={48}
                                height={48}
                                className="rounded-full"
                              />
                            ) : (
                              <div className="font-medium text-lg text-gray-700">
                                {friend.user.name[0].toUpperCase()}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center">
                            <span className="font-semibold text-sm text-gray-900">{friend.user.name}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {friend.user.email}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <FiSearch className="text-4xl text-gray-300 mb-4" />
                      <p className="text-gray-500 mb-2">No friends found</p>
                      <p className="text-sm text-gray-400">Try searching with a different name</p>
                    </div>
                  )
                ) : (
                  // Show friends or empty state
                  friends.length > 0 ? (
                    <>
                      <div className="px-5 py-3 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900 flex items-center">
                          <FiUsers className="mr-2" />
                          Your Friends ({friends.length})
                        </h3>
                      </div>
                      
                      {friends.map(friend => (
                        <div 
                          key={friend.id}
                          className="px-5 py-3 flex items-center hover:bg-gray-50 cursor-pointer border-b border-gray-200 transition-colors"
                          onClick={() => handleProfileClick(friend)}
                        >
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                              {friend.profileImg ? (
                                <Image
                                  src={friend.profileImg}
                                  alt={friend.user.name}
                                  width={48}
                                  height={48}
                                  className="rounded-full"
                                />
                              ) : (
                                <div className="font-medium text-lg text-gray-700">
                                  {friend.user.name[0].toUpperCase()}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex items-center">
                              <span className="font-semibold text-sm text-gray-900">{friend.user.name}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {friend.user.email}
                            </div>
                            {friend.bio && (
                              <div className="text-xs text-gray-400 mt-1">
                                {friend.bio}
                              </div>
                            )}
                          </div>
                          <div className="badge badge-success badge-sm">Friend</div>
                        </div>
                      ))}
                    </>
                  ) : (
                    // No friends state
                    <div className="flex flex-col items-center justify-center p-8 text-center h-full">
                      <div className="avatar placeholder mb-6">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                          <FiUsers className="text-4xl" />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Friends Yet</h3>
                      <p className="text-gray-500 mb-6 max-w-xs">
                        Start connecting with people in your community to build your network and share food resources.
                      </p>
                      
                      <Link 
                        href="/app/friends" 
                        className="btn btn-primary btn-wide"
                        onClick={onClose}
                      >
                        <FiUsers className="mr-2" />
                        Find Friends
                      </Link>
                      
                      <div className="divider my-6 max-w-xs">or</div>
                      
                      <p className="text-sm text-gray-400 text-center max-w-xs">
                        Search above to find specific friends by their username or display name.
                      </p>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;