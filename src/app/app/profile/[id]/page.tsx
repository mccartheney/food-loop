'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiUser, FiHeart, FiShare2, FiMessageCircle, FiGrid, FiBookmark, FiUserPlus, FiUserMinus, FiLoader, FiMapPin, FiEdit3 } from 'react-icons/fi';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { ToastContainer, useToast } from '@/components/ui/Toast';
import ProfileTradeGrid from '@/components/trades/ProfileTradeGrid';
import styles from './styles.module.css';

// User Recipes Tab Component
const UserRecipesTab = ({ userId }: { userId: string }) => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/recipes?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setRecipes(data.recipes);
          }
        }
      } catch (err) {
        setError('Failed to load recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRecipes();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <motion.div
          className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center ${styles.floatingIcon}`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiHeart className="text-white" size={32} />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Nenhuma receita ainda</h3>
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
          Este usuário ainda não compartilhou receitas.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <motion.div
          key={recipe.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          whileHover={{ y: -5 }}
          onClick={() => router.push(`/app/recipes/${recipe.id}`)}
        >
          <div className="aspect-video bg-gray-200 relative">
            {recipe.imageUrl && (
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
              {recipe.cookTime}min
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-semibold text-gray-800 mb-2">{recipe.title}</h4>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.category}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{recipe.difficulty}</span>
              <span>{recipe.servings} porções</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

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
      <div className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          <motion.div
            ref={modalRef}
            className="modern-card rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col shadow-2xl pointer-events-auto mx-4"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="border-b border-white/20 p-6 flex items-center justify-center relative">
              <h3 className="font-semibold text-lg gradient-text">Amigos ({friends.length})</h3>
              <button 
                className="absolute right-6 text-gray-600 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100" 
                onClick={onClose}
              >
                <FiX size={20} />
              </button>
            </div>
            
            {/* Search */}
            {friends.length > 0 && (
              <div className="p-4 border-b border-white/10">
                <div className="relative flex items-center">
                  <FiSearch className="absolute left-4 text-gray-400" size={18} />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Procurar amigos..."
                    className="w-full glass-effect pl-12 pr-4 py-3 text-sm rounded-xl border border-white/20 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 placeholder-gray-500"
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
                  <FiLoader className="animate-spin text-blue-500" size={24} />
                </div>
              ) : friends.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <FiUser className="mx-auto mb-4 text-gray-300" size={56} />
                  <p className="font-semibold text-lg mb-2">Nenhum amigo ainda</p>
                  <p className="text-sm">Este usuário não tem amigos adicionados.</p>
                </div>
              ) : displayedFriends.length > 0 ? (
                displayedFriends.map(friend => (
                  <motion.div 
                    key={friend.id}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-all duration-200 group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => onFriendClick(friend.userId)}
                  >
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-0.5">
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            {friend.profileImg ? (
                              <img
                                src={friend.profileImg}
                                alt={friend.name}
                                className="w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              <div className="font-medium text-gray-600 text-lg">
                                {friend.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 flex-1 min-w-0">
                        <div className="font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                          {friend.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate">{friend.email}</div>
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
                  <p>Nenhum amigo encontrado.</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const toast = useToast();
  
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [profile, setProfile] = useState<RealProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  // Check if this is the current user's own profile
  const isOwnProfile = Boolean(session?.user?.email && profile?.user.email === session.user.email);

  // Fetch profile data
  const fetchProfile = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/profile?userId=${encodeURIComponent(userId)}`);
      
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

  // Handler for friend click
  const handleFriendClick = (friendUserId: string) => {
    setIsFriendsModalOpen(false);
    router.push(`/app/profile/${friendUserId}`);
  };

  // Handler for friends modal
  const handleFriendsClick = () => {
    setIsFriendsModalOpen(true);
  };

  // Handler for follow/unfollow
  const handleFollowToggle = async () => {
    if (!profile || !session?.user?.email) return;
    
    setFollowLoading(true);
    try {
      const response = await fetch('/api/friends', {
        method: isFollowing ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: session.user.email,
          friendEmail: profile.user.email,
        }),
      });

      if (response.ok) {
        setIsFollowing(!isFollowing);
        toast.success(
          isFollowing ? 'Deixou de seguir' : 'Seguindo!', 
          isFollowing ? `Você deixou de seguir ${profile.user.name}` : `Agora você segue ${profile.user.name}`
        );
      } else {
        throw new Error('Failed to update follow status');
      }
    } catch (error) {
      toast.error('Erro', 'Não foi possível atualizar o status de seguidor.');
    } finally {
      setFollowLoading(false);
    }
  };

  // Load profile data when userId changes
  useEffect(() => {
    if (userId) {
      fetchProfile(userId);
    }
  }, [userId]);

  // Check if user is already following this profile
  useEffect(() => {
    const checkFollowingStatus = async () => {
      if (profile && session?.user?.email) {
        try {
          // Get current user's profile to check if this user is in their friends list
          const response = await fetch(`/api/profile?email=${encodeURIComponent(session.user.email)}`);
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              const isCurrentlyFollowing = data.profile.friends.some(
                (friend: any) => friend.email === profile.user.email
              );
              setIsFollowing(isCurrentlyFollowing);
            }
          }
        } catch (error) {
          console.error('Error checking following status:', error);
        }
      }
    };
    
    checkFollowingStatus();
  }, [profile, session]);
  
  // Loading state
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <FiLoader className="animate-spin text-white" size={24} />
            </div>
            <p className="text-gray-600 font-medium">Carregando perfil...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  // Error state
  if (error || !profile) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="modern-card p-8 text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4 gradient-text">Perfil não encontrado</h1>
            <p className="text-gray-600 mb-6">
              {error || 'Este perfil não existe ou foi removido.'}
            </p>
            <button 
              onClick={() => router.back()} 
              className="btn btn-primary"
            >
              Voltar
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const profileContent = (
    <main className="max-w-6xl mx-auto pb-16 min-h-screen">
      {/* Header with Glassmorphism */}
      <motion.header 
        className="sticky top-0 z-10 glass-effect border-b border-white/20 p-6 mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <h1 className="text-xl font-bold gradient-text">
            {isOwnProfile ? 'Meu Perfil' : profile.user.name}
          </h1>
          <div className="ml-auto flex gap-2">
            <motion.button 
              className="btn btn-ghost btn-sm btn-circle hover:bg-white/20"
              onClick={() => router.back()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiX size={20} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="px-6 space-y-8">
        {/* Profile Header Section */}
        <motion.div 
          className={`${styles.profileCard} p-8 rounded-3xl`}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 shadow-2xl ${styles.profileAvatar}`}>
                  <div className="w-full h-full rounded-full bg-white p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                      {profile.profileImg || session?.user?.image ? (
                        <img
                          src={profile.profileImg || session?.user?.image || ''}
                          alt={profile.user.name || 'User'}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="text-4xl flex items-center justify-center h-full text-gray-400 font-bold">
                          {profile.user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full">
                {!isOwnProfile ? (
                  <>
                    <motion.button 
                      className={`flex-1 ${isFollowing ? styles.unfollowButton : styles.followButton} text-white py-3 px-6 rounded-xl font-semibold`}
                      onClick={handleFollowToggle}
                      disabled={followLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {followLoading ? (
                        <FiLoader className="animate-spin mx-auto" size={16} />
                      ) : (
                        <>
                          {isFollowing ? <FiUserMinus className="inline mr-2" size={16} /> : <FiUserPlus className="inline mr-2" size={16} />}
                          {isFollowing ? 'Deixar de seguir' : 'Seguir'}
                        </>
                      )}
                    </motion.button>
                    <Link href={`/app/messages?user=${profile.user.email}`}>
                      <motion.button 
                        className="glass-effect border border-white/30 py-3 px-6 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiMessageCircle className="inline mr-2" size={16} />
                        Mensagem
                      </motion.button>
                    </Link>
                  </>
                ) : (
                  <>
                    <motion.button 
                      className={`flex-1 ${styles.gradientButton} text-white py-3 px-6 rounded-xl font-semibold`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiShare2 className="inline mr-2" size={16} />
                      Compartilhar
                    </motion.button>
                    <Link href="/app/messages">
                      <motion.button 
                        className="glass-effect border border-white/30 py-3 px-6 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiMessageCircle className="inline mr-2" size={16} />
                        Mensagens
                      </motion.button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className={`flex-1 space-y-6 ${styles.profileInfo}`}>
              {/* User Details */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {profile.user.name}
                </h2>
                <div className="text-lg text-gray-500 mb-4">@{profile.user.email.split('@')[0]}</div>
                
                {profile.bio ? (
                  <p className="text-gray-600 text-lg leading-relaxed">{profile.bio}</p>
                ) : (
                  <p className="text-gray-400 italic text-lg">
                    {isOwnProfile ? 'Adicione uma bio para se apresentar' : 'Este usuário não tem bio'}
                  </p>
                )}
                
                {profile.address && (
                  <div className="flex items-center gap-2 mt-4 text-gray-600">
                    <FiMapPin size={18} />
                    <span className="text-lg">{profile.address}</span>
                  </div>
                )}

                {isOwnProfile && (
                  <motion.button 
                    className="text-blue-600 font-semibold mt-4 flex items-center gap-2 hover:text-blue-700 transition-colors"
                    onClick={() => router.push('/app/myprofile')}
                    whileHover={{ x: 5 }}
                  >
                    <FiEdit3 size={16} />
                    Editar Perfil
                  </motion.button>
                )}
              </div>

              {/* Stats */}
              <div className={`grid grid-cols-3 gap-6 ${styles.statsGrid}`}>
                <motion.div 
                  className={`text-center p-4 glass-effect rounded-2xl border border-white/20 ${styles.statsCard}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-gray-800">{profile.counts.recipes}</div>
                  <div className="text-sm text-gray-500 font-medium">Receitas</div>
                </motion.div>
                <motion.div 
                  className={`text-center p-4 glass-effect rounded-2xl border border-white/20 cursor-pointer ${styles.statsCard}`}
                  onClick={handleFriendsClick}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-gray-800">{profile.counts.friends}</div>
                  <div className="text-sm text-gray-500 font-medium">Amigos</div>
                </motion.div>
                <motion.div 
                  className={`text-center p-4 glass-effect rounded-2xl border border-white/20 ${styles.statsCard}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-gray-800">0</div>
                  <div className="text-sm text-gray-500 font-medium">Posts</div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Tabs */}
        <motion.div 
          className={`${styles.profileCard} rounded-3xl overflow-hidden`}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Tab Navigation */}
          <div className="flex border-b border-white/20">
            {[
              { id: 'posts', label: 'Posts', icon: FiGrid },
              { id: 'recipes', label: 'Receitas', icon: FiHeart },
              ...(isOwnProfile ? [{ id: 'saved', label: 'Salvos', icon: FiBookmark }] : [])
            ].map((tab) => (
              <motion.button
                key={tab.id}
                className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <tab.icon size={20} />
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <div className={`p-8 ${styles.tabContent}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'posts' && (
                  <ProfileTradeGrid
                    userId={profile.user.id}
                    userEmail={session?.user?.email || undefined}
                    isOwnProfile={isOwnProfile}
                    className="mt-0"
                  />
                )}
                {activeTab === 'recipes' && (
                  <UserRecipesTab userId={profile.user.id} />
                )}
                {activeTab === 'saved' && isOwnProfile && (
                  <div className="text-center py-16">
                    <motion.div
                      className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center ${styles.floatingIcon}`}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <FiBookmark className="text-white" size={32} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Itens salvos</h3>
                    <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                      Seus itens salvos aparecerão aqui.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Friends Modal */}
      <FriendModal 
        isOpen={isFriendsModalOpen} 
        onClose={() => setIsFriendsModalOpen(false)}
        friends={profile.friends}
        onFriendClick={handleFriendClick}
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
