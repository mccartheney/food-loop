'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiUser, FiMapPin, FiMessageCircle, FiUserMinus, FiEye } from 'react-icons/fi';
import styles from '../../app/app/friends/styles.module.css';

interface Friend {
  id: string;
  userId: string;
  name: string;
  email: string;
  bio: string | null;
  profileImg: string | null;
  address: string | null;
}

interface FriendCardProps {
  friend: Friend;
  onRemove: (friendId: string) => void;
  onViewProfile: (userId: string) => void;
  onMessage?: (userId: string) => void;
  index: number;
  isOnline?: boolean;
}

const FriendCard: React.FC<FriendCardProps> = ({ 
  friend, 
  onRemove, 
  onViewProfile, 
  onMessage,
  index,
  isOnline = Math.random() > 0.3 // Simulation of online status
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 300
      }}
      className={`${styles.friendCard} rounded-2xl p-6 m-2`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          {/* Avatar with gradient border and status */}
          <div className="relative">
            <div className={`w-16 h-16 rounded-full ${styles.gradientAvatar} p-0.5 shadow-lg`}>
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                {friend.profileImg ? (
                  <Image
                    src={friend.profileImg}
                    alt={friend.name}
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
            {/* Online/Offline status indicator */}
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-lg ${
              isOnline 
                ? `bg-green-500 ${styles.onlineIndicator}` 
                : `${styles.offlineIndicator}`
            }`}></div>
          </div>

          {/* Friend info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-800 truncate mb-1">
              {friend.name}
            </h3>
            
            {friend.bio && (
              <p className="text-sm text-gray-600 truncate mb-1">
                {friend.bio}
              </p>
            )}
            
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="truncate">{friend.email}</span>
              {friend.address && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <FiMapPin size={12} />
                    <span className="truncate">{friend.address}</span>
                  </div>
                </>
              )}
            </div>
            
            {/* Online status text */}
            <div className="mt-2">
              <span className={`text-xs font-medium ${
                isOnline ? 'text-green-600' : 'text-gray-500'
              }`}>
                {isOnline ? '🟢 Online now' : '⚫ Offline'}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className={`${styles.actionButtons} ml-4`}>
          {onMessage && (
            <motion.button
              onClick={() => onMessage(friend.userId)}
              className={`p-3 rounded-xl ${styles.primaryButton} flex items-center gap-2`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Send message"
            >
              <FiMessageCircle size={16} />
              <span className="hidden sm:inline text-sm font-medium">Message</span>
            </motion.button>
          )}
          
          <motion.button
            onClick={() => onViewProfile(friend.userId)}
            className={`p-3 rounded-xl ${styles.secondaryButton} flex items-center gap-2`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="View profile"
          >
            <FiEye size={16} />
            <span className="hidden sm:inline text-sm font-medium">Profile</span>
          </motion.button>
          
          <motion.button
            onClick={() => onRemove(friend.id)}
            className={`p-3 rounded-xl ${styles.dangerButton} flex items-center gap-2`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Remove friend"
          >
            <FiUserMinus size={16} />
            <span className="hidden sm:inline text-sm font-medium">Remove</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FriendCard;