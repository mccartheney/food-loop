'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMapPin, FiLoader } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  profile: {
    id: string;
    bio: string | null;
    address: string | null;
    profileImg: string | null;
  } | null;
}

interface UserSearchResultsProps {
  query: string;
  onUserClick?: (userId: string) => void;
}

export default function UserSearchResults({ query, onUserClick }: UserSearchResultsProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const searchUsers = async () => {
      if (!query || query.trim().length < 2) {
        setUsers([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/users/search?q=${encodeURIComponent(query.trim())}`);
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUsers(data.users);
          } else {
            setError('Erro ao buscar usuários');
          }
        } else {
          setError('Erro ao buscar usuários');
        }
      } catch (err) {
        console.error('Error searching users:', err);
        setError('Erro ao buscar usuários');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleUserClick = (userId: string) => {
    if (onUserClick) {
      onUserClick(userId);
    } else {
      router.push(`/app/profile/${userId}`);
    }
  };

  if (!query || query.trim().length < 2) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <FiLoader className="animate-spin text-blue-500" size={24} />
        <span className="ml-2 text-gray-600">Buscando usuários...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <FiUser className="mx-auto mb-4 text-gray-300" size={48} />
        <p className="text-gray-500 font-semibold">Nenhum usuário encontrado</p>
        <p className="text-gray-400 text-sm">Tente buscar por nome ou email</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-800 mb-4">Usuários ({users.length})</h3>
      {users.map((user, index) => (
        <motion.div
          key={user.id}
          className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          onClick={() => handleUserClick(user.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-0.5">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  {user.profile?.profileImg ? (
                    <img
                      src={user.profile.profileImg}
                      alt={user.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="font-medium text-gray-600 text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-800 truncate">
                {user.name}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {user.email}
              </div>
              {user.profile?.bio && (
                <div className="text-xs text-gray-400 truncate mt-1">
                  {user.profile.bio}
                </div>
              )}
              {user.profile?.address && (
                <div className="text-xs text-gray-400 truncate flex items-center gap-1 mt-1">
                  <FiMapPin size={10} />
                  {user.profile.address}
                </div>
              )}
            </div>

            {/* Action indicator */}
            <div className="text-blue-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
