'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiX, FiSearch } from 'react-icons/fi';
import Image from 'next/image';

// Define types
interface Profile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followers?: number;
  verified?: boolean;
  following?: boolean;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock profiles data - these would typically come from a centralized data store
const MOCK_PROFILES = {
  '1': {
    id: '1',
    username: 'manuel_tomas',
    displayName: 'Manuel Tomas',
    avatar: '/avatars/user1.png',
    bio: 'Photographer and traveler based in Porto.',
    followers: 1046,
    verified: false,
    following: true,
  },
  '2': {
    id: '2',
    username: 'manuel_luis',
    displayName: 'Manuel Luis',
    avatar: '/avatars/user2.png',
    bio: 'Digital creator and content maker from Lisbon.',
    followers: 1832,
    verified: true,
    following: false,
  },
  '3': {
    id: '3',
    username: 'manuel_mc',
    displayName: 'Manuel MC',
    avatar: '/avatars/user3.png',
    bio: 'Music producer and artist from Faro.',
    followers: 1240,
    verified: false,
    following: true,
  },
  '4': {
    id: '4',
    username: 'manuel_joao',
    displayName: 'Manuel Joao',
    avatar: '/avatars/user4.png',
    bio: 'Chef and food lover from Braga.',
    followers: 2340,
    verified: false,
    following: true,
  },
  '5': {
    id: '5',
    username: 'manuel_afonso',
    displayName: 'Manuel Afonso',
    avatar: '/avatars/user5.png',
    bio: 'Tech student from Coimbra University.',
    followers: 542,
    verified: false,
    following: false,
  },
  '6': {
    id: '6',
    username: 'manuel_leandro',
    displayName: 'Manuel Leandro',
    avatar: '/avatars/user6.png',
    bio: 'Surf instructor and ocean lover.',
    followers: 1320,
    verified: false,
    following: true,
  },
  '7': {
    id: '7',
    username: 'manuel_zacarias',
    displayName: 'Manuel Zacarias',
    avatar: '/avatars/user7.png',
    bio: 'Digital designer from Aveiro.',
    followers: 876,
    verified: false,
    following: false,
  },
  '8': {
    id: '8',
    username: '_lauraimartins_',
    displayName: 'Laura Martins',
    avatar: '/avatars/user8.png',
    bio: 'Food enthusiast and blogger.',
    followers: 2345,
    verified: false,
    following: false,
  },
  '9': {
    id: '9',
    username: 'a_carolina_torres',
    displayName: 'Carolina Torres',
    avatar: '/avatars/user9.png',
    bio: 'Fashion model and influencer.',
    followers: 141000,
    verified: true,
    following: false,
  },
  '10': {
    id: '10',
    username: 'roddy44__',
    displayName: 'RODDY',
    avatar: '/avatars/user10.png',
    bio: 'Music lover',
    followers: 4500,
    verified: false,
    following: false,
  },
  '11': {
    id: '11',
    username: 'nandoooogomess',
    displayName: 'Semogodnan',
    avatar: '/avatars/user11.png',
    bio: 'Adventurer',
    followers: 3200,
    verified: false,
    following: false,
  },
  '12': {
    id: '12',
    username: 'carolina_augusto',
    displayName: 'Carolina Maeiro Augusto',
    avatar: '/avatars/user12.png',
    bio: 'Digital artist',
    followers: 2800,
    verified: false,
    following: false,
  }
};

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [recentSearches, setRecentSearches] = useState<Profile[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = Object.values(MOCK_PROFILES).filter(
      profile => 
        profile.username.toLowerCase().includes(query) || 
        profile.displayName.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
  }, [searchQuery]);
  
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

  // Load recent searches from localStorage
  useEffect(() => {
    if (isOpen) {
      try {
        const savedSearches = localStorage.getItem('recentSearches');
        if (savedSearches) {
          setRecentSearches(JSON.parse(savedSearches));
        } else {
          // For demo purposes, initialize with some mock data
          const initialRecent = [
            MOCK_PROFILES['8'], 
            MOCK_PROFILES['9'], 
            MOCK_PROFILES['10'],
            MOCK_PROFILES['11'],
            MOCK_PROFILES['12']
          ];
          setRecentSearches(initialRecent);
          localStorage.setItem('recentSearches', JSON.stringify(initialRecent));
        }
      } catch (error) {
        console.error('Failed to load recent searches:', error);
      }
    }
  }, [isOpen]);
  
  const handleProfileClick = (profile: Profile) => {
    // Add to recent searches
    const updatedSearches = [
      profile,
      ...recentSearches.filter(item => item.id !== profile.id)
    ].slice(0, 10); // Keep only 10 most recent
    
    setRecentSearches(updatedSearches);
    
    try {
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    } catch (error) {
      console.error('Failed to save recent searches:', error);
    }
    
    // Navigate to profile page
    router.push(`/app/profile/${profile.id}`);
    onClose();
  };
  
  const removeFromRecent = (e: React.MouseEvent, profileId: string) => {
    e.stopPropagation();
    const updatedSearches = recentSearches.filter(profile => profile.id !== profileId);
    setRecentSearches(updatedSearches);
    
    try {
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    } catch (error) {
      console.error('Failed to save recent searches:', error);
    }
  };
  
  const clearAllRecent = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('recentSearches');
    } catch (error) {
      console.error('Failed to clear recent searches:', error);
    }
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
                      placeholder="Search"
                      className="w-full bg-gray-100 border border-gray-200 rounded-lg text-gray-800 py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery ? (
                      <button 
                        className="absolute right-3 text-gray-400 hover:text-primary"
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
                {searchQuery ? (
                  // Search results
                  searchResults.length > 0 ? (
                    searchResults.map(profile => (
                      <div 
                        key={profile.id}
                        className="px-5 py-3 flex items-center hover:bg-gray-50 cursor-pointer border-b border-gray-200"
                        onClick={() => handleProfileClick(profile)}
                      >
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <div className="font-medium text-lg text-gray-700">
                              {profile.displayName[0].toUpperCase()}
                            </div>
                          </div>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center">
                            <span className="font-semibold text-sm text-gray-900">{profile.username}</span>
                            {profile.verified && (
                              <span className="ml-1 text-primary">•</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {profile.displayName}
                            {profile.followers && profile.followers > 1000 && (
                              <span className="ml-2">• {(profile.followers / 1000).toFixed(profile.followers >= 100000 ? 0 : 1)}k followers</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      No results found
                    </div>
                  )
                ) : (
                  // Recent searches
                  <>
                    <div className="px-5 py-3 flex items-center justify-between border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Recent</h3>
                      {recentSearches.length > 0 && (
                        <button 
                          className="text-sm text-primary font-semibold hover:underline"
                          onClick={clearAllRecent}
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                    
                    {recentSearches.length > 0 ? (
                      recentSearches.map(profile => (
                        <div 
                          key={profile.id}
                          className="px-5 py-3 flex items-center hover:bg-gray-50 cursor-pointer border-b border-gray-200"
                          onClick={() => handleProfileClick(profile)}
                        >
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                              <div className="font-medium text-lg text-gray-700">
                                {profile.displayName[0].toUpperCase()}
                              </div>
                            </div>
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex items-center">
                              <span className="font-semibold text-sm text-gray-900">{profile.username}</span>
                              {profile.verified && (
                                <span className="ml-1 text-primary">•</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              {profile.following ? 'friends' : profile.followers ? `${profile.followers} friends` : profile.displayName}
                            </div>
                          </div>
                          <button 
                            className="btn btn-ghost btn-sm btn-circle text-gray-400 hover:text-primary"
                            onClick={(e) => removeFromRecent(e, profile.id)}
                          >
                            <FiX size={16} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-gray-500">
                        No recent searches
                      </div>
                    )}
                  </>
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