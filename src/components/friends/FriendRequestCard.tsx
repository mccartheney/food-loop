'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiUser, FiMapPin, FiCheck, FiX, FiClock, FiUserX } from 'react-icons/fi';
import styles from '../../app/app/friends/styles.module.css';

interface FriendRequest {
  id: string;
  receiverId?: string;
  receiverName?: string;
  receiverEmail?: string;
  receiverBio?: string | null;
  receiverProfileImg?: string | null;
  requesterId?: string;
  requesterName?: string;
  requesterEmail?: string;
  requesterBio?: string | null;
  requesterProfileImg?: string | null;
  status: string;
  createdAt: string;
  type: 'sent' | 'received';
}

interface FriendRequestCardProps {
  request: FriendRequest;
  onAccept?: (requestId: string) => void;
  onReject?: (requestId: string) => void;
  onCancel?: (requestId: string) => void;
  index: number;
}

const FriendRequestCard: React.FC<FriendRequestCardProps> = ({ 
  request, 
  onAccept, 
  onReject, 
  onCancel,
  index
}) => {
  const isReceived = request.type === 'received';
  const user = isReceived 
    ? {
        name: request.requesterName,
        email: request.requesterEmail,
        bio: request.requesterBio,
        profileImg: request.requesterProfileImg
      }
    : {
        name: request.receiverName,
        email: request.receiverEmail,
        bio: request.receiverBio,
        profileImg: request.receiverProfileImg
      };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isReceived ? -20 : 20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 300
      }}
      className={`${styles.requestCard} rounded-2xl p-6 m-2 relative overflow-hidden`}
    >
      {/* Type indicator */}
      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
        isReceived 
          ? `${styles.requestBadge} ${styles.statusBadge}` 
          : `${styles.pendingBadge} ${styles.statusBadge}`
      }`}>
        {isReceived ? 'Request received' : 'Request sent'}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1 min-w-0 pr-4">
          {/* Avatar with gradient border */}
          <div className="relative">
            <div className={`w-16 h-16 rounded-full ${styles.gradientAvatar} p-0.5 shadow-lg`}>
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                {user.profileImg ? (
                  <Image
                    src={user.profileImg}
                    alt={user.name || 'User'}
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
            {/* Request type indicator */}
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
              isReceived ? 'bg-blue-500' : 'bg-yellow-500'
            }`}>
              {isReceived ? <FiUser size={10} className="text-white" /> : <FiClock size={10} className="text-white" />}
            </div>
          </div>

          {/* User info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-800 truncate mb-1">
              {user.name || 'Unknown user'}
            </h3>
            
            {user.bio && (
              <p className="text-sm text-gray-600 truncate mb-1">
                {user.bio}
              </p>
            )}
            
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
              <span className="truncate">{user.email}</span>
            </div>
            
            {/* Time and status */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {formatDate(request.createdAt)}
              </span>
              {!isReceived && (
                <span className="text-xs text-yellow-600 flex items-center gap-1">
                  <FiClock size={12} />
                  Awaiting response...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className={`${styles.actionButtons} ml-4`}>
          {isReceived ? (
            // Received request actions
            <>
              <motion.button
                onClick={() => onAccept?.(request.id)}
                className={`p-3 rounded-xl ${styles.primaryButton} flex items-center gap-2`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Accept request"
              >
                <FiCheck size={16} />
                <span className="hidden sm:inline text-sm font-medium">Accept</span>
              </motion.button>
              
              <motion.button
                onClick={() => onReject?.(request.id)}
                className={`p-3 rounded-xl ${styles.secondaryButton} flex items-center gap-2`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Decline request"
              >
                <FiX size={16} />
                <span className="hidden sm:inline text-sm font-medium">Decline</span>
              </motion.button>
            </>
          ) : (
            // Sent request actions
            <motion.button
              onClick={() => onCancel?.(request.id)}
              className={`p-3 rounded-xl ${styles.dangerButton} flex items-center gap-2`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Cancel request"
            >
              <FiUserX size={16} />
              <span className="hidden sm:inline text-sm font-medium">Cancel</span>
            </motion.button>
          )}
        </div>
      </div>
      
      {/* Background gradient effect */}
      <div className={`absolute inset-0 opacity-5 pointer-events-none ${
        isReceived 
          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
          : 'bg-gradient-to-r from-yellow-500 to-orange-500'
      }`}></div>
    </motion.div>
  );
};

export default FriendRequestCard;