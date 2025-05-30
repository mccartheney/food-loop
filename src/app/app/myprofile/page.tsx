'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiSettings } from 'react-icons/fi';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Define types directly in the file as requested
interface Highlight {
  id: string;
  title: string;
  imageUrl?: string;
}

interface Friend {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isFollowing: boolean;
}

interface Profile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  website?: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isVerified?: boolean;
  occupation?: string;
  location: string;
  highlights: Highlight[];
}

interface Post {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

// Friend Modal Component
const FriendModal = ({ 
  isOpen, 
  onClose, 
  friends,
  onFriendClick
}: { 
  isOpen: boolean; 
  onClose: () => void;
  friends: Friend[];
  onFriendClick: (friendId: string) => void;
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

  // Toggle following status
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
  
  if (!isOpen) return null;
  
  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-20" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
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
        </AnimatePresence>
      </div>
    </>
  );
};

// Generate mock posts for the user
const generateMockPosts = (): Post[] => {
  const count = 9;
  const posts: Post[] = [];
  
  for (let i = 0; i < count; i++) {
    posts.push({
      id: `post-my-${i}`,
      imageUrl: `/images/mock-post-${i % 3 + 1}.jpg`,
      likes: Math.floor(Math.random() * 200) + 50,
      comments: Math.floor(Math.random() * 30) + 5
    });
  }
  
  return posts;
};

// Mock friends data
const MOCK_FRIENDS: Friend[] = [
  {
    id: '1',
    username: 'manuel_tomas',
    displayName: 'Manuel Tomas',
    avatar: '/avatars/user1.png',
    isFollowing: true,
  },
  {
    id: '2',
    username: 'manuel_luis',
    displayName: 'Manuel Luis',
    avatar: '/avatars/user2.png',
    isFollowing: true,
  },
  {
    id: '3',
    username: 'manuel_mc',
    displayName: 'Manuel MC',
    avatar: '/avatars/user3.png',
    isFollowing: false,
  },
  {
    id: '4',
    username: 'manuel_joao',
    displayName: 'Manuel Joao',
    avatar: '/avatars/user4.png',
    isFollowing: true,
  },
  {
    id: '5',
    username: 'manuel_afonso',
    displayName: 'Manuel Afonso',
    avatar: '/avatars/user5.png',
    isFollowing: false,
  }
];

export default function MyProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);
  const [friendsList, setFriendsList] = useState<Friend[]>([]);

  // Handler for friend click
  const handleFriendClick = (friendId: string) => {
    setIsFriendsModalOpen(false);
    router.push(`/app/profile/${friendId}`);
  };

  // Handler for friends modal
  const handleFriendsClick = () => {
    setIsFriendsModalOpen(true);
  };

  useEffect(() => {
    // Load friends list when modal opens
    if (isFriendsModalOpen) {
      setFriendsList(MOCK_FRIENDS);
    }
  }, [isFriendsModalOpen]);
  
  useEffect(() => {
    // Simulate loading user data with Google profile info
    setLoading(true);
    
    // Wait for session data
    if (status === "loading") return;
    
    // Create a profile using Google auth data
    if (session?.user) {
      const userProfile: Profile = {
        id: 'my-profile',
        username: session.user.email?.split('@')[0] || 'user',
        displayName: session.user.name || 'User',
        avatar: session.user.image || '',
        bio: 'Add your bio here',
        postsCount: 0,
        followersCount: MOCK_FRIENDS.filter(f => f.isFollowing).length,
        followingCount: MOCK_FRIENDS.length,
        location: '',
        highlights: [
          { id: '1', title: 'Memories' }
        ]
      };
      
      setProfile(userProfile);
      setPosts(generateMockPosts());
    }
    
    setLoading(false);
  }, [session, status]);
  
  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }
  
  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Please log in</h1>
        <p className="text-gray-600 mb-6">You need to log in to view your profile.</p>
        <Link href="/auth/login" className="btn btn-primary">
          Go to login
        </Link>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Error loading profile</h1>
        <p className="text-gray-600 mb-6">There was an error loading your profile data.</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  const profileContent = (
    <main className="max-w-4xl mx-auto pb-16 bg-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white p-4 flex items-center">
        <h1 className="text-lg font-medium">My Profile</h1>
        <div className="ml-auto">
          <button className="btn btn-ghost btn-sm btn-circle">
            <FiSettings size={20} />
          </button>
        </div>
      </header>

      <div className="p-4">
        <div className="flex items-start">
          {/* Avatar from Google - Using regular img tag instead of Next/Image */}
          <div className="avatar">
            <div className="w-20 h-20 rounded-full bg-base-200 border-2 border-base-200 ring-2 ring-primary ring-offset-2 overflow-hidden">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="text-3xl flex items-center justify-center h-full text-gray-400">
                  {session.user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 flex justify-around ml-4">
            <div className="text-center">
              <div className="font-semibold">{profile.postsCount}</div>
              <div className="text-xs text-gray-500">posts</div>
            </div>
            <motion.div 
              className="text-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFriendsClick}
            >
              <div className="font-semibold">{profile.followersCount}</div>
              <div className="text-xs text-gray-500">Friends</div>
            </motion.div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4">
          <h2 className="font-semibold text-sm">
            {session.user.name}
          </h2>
          <div className="text-sm text-gray-500">@{profile.username}</div>
          <p className="text-sm mt-1">{profile.bio || "Add your bio"}</p>
          <button className="text-xs text-primary font-medium mt-2">
            Edit Profile
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="btn btn-sm btn-primary flex-1">Share Profile</button>
          <Link href="/app/messages" className="btn btn-sm btn-outline flex-1">
            Messages
          </Link>
          <button className="btn btn-sm btn-outline btn-square">⋯</button>
        </div>
      </div>

      {/* Posts Section */}
      <div className="border-t py-3 flex justify-center">
        <h3 className="text-primary font-medium">My Posts</h3>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div 
              key={post.id} 
              className={`aspect-square flex items-center justify-center ${
                index % 4 === 0 ? 'bg-blue-100' : 
                index % 4 === 1 ? 'bg-amber-100' : 
                index % 4 === 2 ? 'bg-rose-100' : 
                'bg-emerald-100'
              }`}
            >
              <div className="text-lg text-gray-500">Post {index + 1}</div>
            </div>
          ))
        ) : (
          <div className="col-span-3 py-10 text-center text-gray-500">
            <p>You haven't posted anything yet</p>
            <button className="btn btn-sm btn-primary mt-4">Create your first post</button>
          </div>
        )}
      </div>

      {/* Friends Modal */}
      <FriendModal 
        isOpen={isFriendsModalOpen} 
        onClose={() => setIsFriendsModalOpen(false)}
        friends={friendsList}
        onFriendClick={handleFriendClick}
      />
    </main>
  );

  return <DashboardLayout>{profileContent}</DashboardLayout>;
}