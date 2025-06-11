import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSearch, FiUser, FiLoader } from 'react-icons/fi';
import Image from 'next/image';
import styles from '../../app/app/messages/styles.module.css';

interface Friend {
  id: string;
  userId: string;
  name: string;
  email: string;
  bio?: string;
  profileImg?: string;
  address?: string;
}

interface NewConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFriend: (friend: Friend) => void;
  currentUserId: string;
}

const NewConversationModal: React.FC<NewConversationModalProps> = ({
  isOpen,
  onClose,
  onSelectFriend,
  currentUserId
}) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch friends when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchFriends();
      setSearchQuery('');
    }
  }, [isOpen, currentUserId]);

  // Filter friends based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFriends(friends);
    } else {
      const filtered = friends.filter(friend =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFriends(filtered);
    }
  }, [friends, searchQuery]);

  const fetchFriends = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/friends?userId=${currentUserId}`);
      const data = await response.json();
      
      if (data.success) {
        setFriends(data.friends);
      } else {
        setError('Failed to fetch friends');
        // Mock friends for demo if API fails
        setFriends([
          {
            id: '1',
            userId: 'friend1',
            name: 'Ana Silva',
            email: 'ana@example.com',
            bio: 'Love sharing fresh produce!',
            address: 'Porto, Portugal'
          },
          {
            id: '2',
            userId: 'friend2',
            name: 'Carlos Santos',
            email: 'carlos@example.com',
            bio: 'Passionate about cooking',
            address: 'Lisboa, Portugal'
          },
        ]);
      }
    } catch (err) {
      console.error('Error fetching friends:', err);
      setError('Unable to load friends');
      // Mock friends for demo if API fails
      setFriends([
        {
          id: '1',
          userId: 'friend1',
          name: 'Ana Silva',
          email: 'ana@example.com',
          bio: 'Love sharing fresh produce!',
          address: 'Porto, Portugal'
        },
        {
          id: '2',
          userId: 'friend2',
          name: 'Carlos Santos',
          email: 'carlos@example.com',
          bio: 'Passionate about cooking',
          address: 'Lisboa, Portugal'
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFriend = (friend: Friend) => {
    onSelectFriend(friend);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className={`${styles.messageCard} rounded-3xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold gradient-text">Nova Mensagem</h2>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full glass-effect hover:bg-white/20 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX className="text-gray-600" size={20} />
              </motion.button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Procurar amigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`block w-full pl-12 pr-4 py-3 ${styles.searchInput} rounded-xl text-sm placeholder-gray-500 focus:outline-none`}
                autoFocus
              />
            </div>
          </div>

          {/* Friends List */}
          <div className={`flex-1 overflow-y-auto ${styles.messagesScroll}`}>
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <FiLoader className="animate-spin text-gray-400" size={24} />
                <span className="ml-2 text-gray-500">Carregando amigos...</span>
              </div>
            ) : error ? (
              <div className="p-6 text-center">
                <div className="text-gray-500 mb-2">⚠️ {error}</div>
                <div className="text-sm text-gray-400">Usando dados de demonstração</div>
              </div>
            ) : filteredFriends.length === 0 ? (
              <div className="p-8 text-center">
                {searchQuery ? (
                  <div>
                    <FiSearch className="mx-auto text-gray-400 mb-4" size={32} />
                    <p className="text-gray-500 mb-2">Nenhum amigo encontrado</p>
                    <p className="text-sm text-gray-400">Tente um termo de busca diferente</p>
                  </div>
                ) : (
                  <div>
                    <FiUser className="mx-auto text-gray-400 mb-4" size={32} />
                    <p className="text-gray-500 mb-2">Nenhum amigo ainda</p>
                    <p className="text-sm text-gray-400">Adicione amigos para começar a conversar</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-2">
                {filteredFriends.map((friend, index) => (
                  <motion.div
                    key={friend.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`${styles.conversationItem} flex items-center p-4 m-2 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white/20`}
                    onClick={() => handleSelectFriend(friend)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full ${styles.gradientAvatar} p-0.5`}>
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                          {friend.profileImg ? (
                            <Image
                              src={friend.profileImg}
                              alt={friend.name}
                              width={48}
                              height={48}
                              className="rounded-full object-cover"
                            />
                          ) : (
                            <div className="text-xl font-bold text-gray-600">
                              {friend.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 flex-1 overflow-hidden">
                      <p className="font-semibold text-gray-800 truncate">{friend.name}</p>
                      <p className="text-sm text-gray-600 truncate">{friend.email}</p>
                      {friend.bio && (
                        <p className="text-xs text-gray-500 truncate mt-1">{friend.bio}</p>
                      )}
                      {friend.address && (
                        <p className="text-xs text-gray-400 truncate flex items-center mt-1">
                          📍 {friend.address}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <p className="text-xs text-gray-500 text-center">
              Selecione um amigo para iniciar uma nova conversa
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewConversationModal;
