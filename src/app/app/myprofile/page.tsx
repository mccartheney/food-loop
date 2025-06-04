'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiSettings, FiEdit3, FiMapPin, FiLoader, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EditProfileModal from '@/components/profile/EditProfileModal';
import { ToastContainer, useToast } from '@/components/ui/Toast';

// Types for real data
interface RealFriend {
  id: string;
  userId: string;
  name: string;
  email: string;
  bio: string | null;
  profileImg: string | null;
  address: string | null;
}

interface RealProfile {
  id: string;
  userId: string;
  bio: string | null;
  address: string | null;
  profileImg: string | null;
  user: {
    id: string;
    name: string;
    email: string;
  };
  friends: RealFriend[];
  counts: {
    friends: number;
    recipes: number;
  };
}

// Friend Modal Component
const FriendModal = ({ 
  isOpen, 
  onClose, 
  friends,
  onFriendClick,
  loading = false
}: { 
  isOpen: boolean; 
  onClose: () => void;
  friends: RealFriend[];
  onFriendClick: (friendId: string) => void;
  loading?: boolean;
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
        friend.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        friend.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setDisplayedFriends(filtered);
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
            className="bg-white rounded-xl w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl pointer-events-auto mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="border-b p-4 flex items-center justify-center relative">
              <h3 className="font-semibold text-center">Friends ({friends.length})</h3>
              <button 
                className="absolute right-4 text-gray-600 hover:text-gray-800 transition-colors" 
                onClick={onClose}
              >
                <FiX size={24} />
              </button>
            </div>
            
            {/* Search */}
            {friends.length > 0 && (
              <div className="p-3 border-b">
                <div className="relative flex items-center">
                  <FiSearch className="absolute left-3 text-gray-400" size={16} />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search friends..."
                    className="w-full bg-gray-100 pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            {/* Friends List */}
            <div className="overflow-y-auto flex-1">
              {loading ? (
                <div className="p-8 flex items-center justify-center">
                  <FiLoader className="animate-spin text-gray-400" size={24} />
                </div>
              ) : friends.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <FiUser className="mx-auto mb-3 text-gray-300" size={48} />
                  <p className="font-medium">No friends yet</p>
                  <p className="text-sm mt-1">Start connecting with people!</p>
                </div>
              ) : displayedFriends.length > 0 ? (
                displayedFriends.map(friend => (
                  <motion.div 
                    key={friend.id}
                    className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => onFriendClick(friend.userId)}
                  >
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center overflow-hidden">
                          {friend.profileImg ? (
                            <img
                              src={friend.profileImg}
                              alt={friend.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="font-medium text-gray-500 text-lg">
                              {friend.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{friend.name}</div>
                        <div className="text-xs text-gray-500 truncate">{friend.email}</div>
                        {friend.address && (
                          <div className="text-xs text-gray-400 truncate flex items-center gap-1 mt-1">
                            <FiMapPin size={10} />
                            {friend.address}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p>No friends match your search.</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default function MyProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const toast = useToast();
  
  const [profile, setProfile] = useState<RealProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [friendsLoading, setFriendsLoading] = useState(false);

  // Fetch profile data
  const fetchProfile = async (email: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/profile?email=${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const data = await response.json();
      
      if (data.success) {
        setProfile(data.profile);
      } else {
        throw new Error('Profile not found');
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  // Update profile data with toast notifications
  const updateProfile = async (updatedData: { bio: string; address: string; profileImg?: string }) => {
    if (!session?.user?.email) throw new Error('No session');

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user.email,
          ...updatedData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      const data = await response.json();
      
      if (data.success) {
        setProfile(data.profile);
        toast.success('Profile updated successfully!', 'Your changes have been saved.');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile', error instanceof Error ? error.message : 'Please try again.');
      throw error;
    }
  };

  // Handler for friend click
  const handleFriendClick = (friendUserId: string) => {
    setIsFriendsModalOpen(false);
    router.push(`/app/profile/${friendUserId}`);
  };

  // Handler for friends modal
  const handleFriendsClick = () => {
    setIsFriendsModalOpen(true);
  };

  // Load profile data when session is available
  useEffect(() => {
    if (status === "loading") return;
    
    if (session?.user?.email) {
      fetchProfile(session.user.email);
    } else {
      setLoading(false);
      setError('No session found');
    }
  }, [session, status]);
  
  // Loading state
  if (status === "loading" || loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <FiLoader className="animate-spin mx-auto mb-4 text-primary" size={32} />
            <p className="text-gray-600">Loading your profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  // Error state
  if (error || !session?.user) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold mb-4">
            {!session?.user ? 'Please log in' : 'Error loading profile'}
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            {!session?.user 
              ? 'You need to log in to view your profile.' 
              : error || 'There was an error loading your profile data.'
            }
          </p>
          {!session?.user ? (
            <Link href="/auth/login" className="btn btn-primary">
              Go to login
            </Link>
          ) : (
            <button 
              onClick={() => session?.user?.email && fetchProfile(session.user.email)} 
              className="btn btn-primary"
            >
              Try again
            </button>
          )}
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
          <p className="text-gray-600 mb-6">Your profile data could not be loaded.</p>
          <button 
            onClick={() => session?.user?.email && fetchProfile(session.user.email)} 
            className="btn btn-primary"
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const profileContent = (
    <main className="max-w-4xl mx-auto pb-16 bg-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white p-4 flex items-center border-b">
        <h1 className="text-lg font-medium">My Profile</h1>
        <div className="ml-auto">
          <button 
            className="btn btn-ghost btn-sm btn-circle"
            onClick={() => setIsEditModalOpen(true)}
          >
            <FiSettings size={20} />
          </button>
        </div>
      </header>

      <div className="p-4">
        <div className="flex items-start">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-20 h-20 rounded-full bg-base-200 border-2 border-base-200 ring-2 ring-primary ring-offset-2 overflow-hidden">
              {profile.profileImg || session.user.image ? (
                <img
                  src={profile.profileImg || session.user.image || ''}
                  alt={profile.user.name || 'User'}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="text-3xl flex items-center justify-center h-full text-gray-400">
                  {profile.user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 flex justify-around ml-4">
            <div className="text-center">
              <div className="font-semibold">{profile.counts.recipes}</div>
              <div className="text-xs text-gray-500">recipes</div>
            </div>
            <motion.div 
              className="text-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFriendsClick}
            >
              <div className="font-semibold">{profile.counts.friends}</div>
              <div className="text-xs text-gray-500">Friends</div>
            </motion.div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4">
          <h2 className="font-semibold text-sm">
            {profile.user.name}
          </h2>
          <div className="text-sm text-gray-500">@{profile.user.email.split('@')[0]}</div>
          
          {profile.bio ? (
            <p className="text-sm mt-2">{profile.bio}</p>
          ) : (
            <p className="text-sm mt-2 text-gray-400 italic">No bio yet</p>
          )}
          
          {profile.address && (
            <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
              <FiMapPin size={14} />
              {profile.address}
            </div>
          )}

          <button 
            className="text-xs text-primary font-medium mt-3 flex items-center gap-1 hover:underline"
            onClick={() => setIsEditModalOpen(true)}
          >
            <FiEdit3 size={12} />
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

      {/* Posts Grid - Placeholder */}
      <div className="p-4">
        <div className="text-center py-10 text-gray-500">
          <FiUser className="mx-auto mb-3 text-gray-300" size={48} />
          <p className="font-medium">No posts yet</p>
          <p className="text-sm mt-1">Share your first recipe or pantry item!</p>
          <button className="btn btn-sm btn-primary mt-4">Create your first post</button>
        </div>
      </div>

      {/* Friends Modal */}
      <FriendModal 
        isOpen={isFriendsModalOpen} 
        onClose={() => setIsFriendsModalOpen(false)}
        friends={profile.friends}
        onFriendClick={handleFriendClick}
        loading={friendsLoading}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onUpdate={updateProfile}
      />
    </main>
  );

  return (
    <DashboardLayout>
      {profileContent}
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />
    </DashboardLayout>
  );
}
