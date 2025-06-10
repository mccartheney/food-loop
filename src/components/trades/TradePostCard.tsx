'use client';

import { motion } from 'framer-motion';
import { FiClock, FiMapPin, FiUser, FiArrowRight, FiCheck, FiMoreHorizontal } from 'react-icons/fi';
import { useState } from 'react';
import { ItemType } from '@prisma/client';

interface TradeItem {
  id: string;
  name: string;
  quantity: number;
  type: ItemType;
  img?: string;
}

interface TradePostCardProps {
  trade: {
    id: string;
    title: string;
    description: string;
    offeredItems: TradeItem[];
    status: 'active' | 'completed';
    createdAt: Date;
    endDate?: Date;
    location?: string;
    wantedItems?: string;
    participants?: any[];
    isOwner: boolean;
  };
  onViewDetails?: (tradeId: string) => void;
  onEdit?: (tradeId: string) => void;
  onDelete?: (tradeId: string) => void;
  className?: string;
}

// Helper to format item type for display
const formatItemType = (type: string) => {
  return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

// Helper to get item icon
const getItemIcon = (type: ItemType) => {
  const iconClass = "w-4 h-4";
  switch (type) {
    case ItemType.MEAT:
      return <div className={`${iconClass} bg-red-100 text-red-600 rounded flex items-center justify-center`}>🥩</div>;
    case ItemType.VEGETABLES:
      return <div className={`${iconClass} bg-green-100 text-green-600 rounded flex items-center justify-center`}>🥬</div>;
    case ItemType.FRUITS:
      return <div className={`${iconClass} bg-orange-100 text-orange-600 rounded flex items-center justify-center`}>🍎</div>;
    case ItemType.DAIRY:
      return <div className={`${iconClass} bg-blue-100 text-blue-600 rounded flex items-center justify-center`}>🧀</div>;
    case ItemType.GRAINS_CEREALS:
      return <div className={`${iconClass} bg-amber-100 text-amber-600 rounded flex items-center justify-center`}>🌾</div>;
    default:
      return <div className={`${iconClass} bg-gray-100 text-gray-600 rounded flex items-center justify-center`}>📦</div>;
  }
};

export default function TradePostCard({ 
  trade, 
  onViewDetails, 
  onEdit, 
  onDelete,
  className = '' 
}: TradePostCardProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const isCompleted = trade.status === 'completed';
  const isExpired = trade.endDate && new Date(trade.endDate) < new Date();
  
  // Determine card theme based on ownership and status
  const getCardTheme = () => {
    if (isCompleted) {
      return trade.isOwner 
        ? 'border-blue-200 bg-blue-50/50' // Own completed trades - blue
        : 'border-green-200 bg-green-50/50'; // Participated trades - green
    }
    if (isExpired) {
      return 'border-gray-200 bg-gray-50/50';
    }
    return trade.isOwner 
      ? 'border-blue-300 bg-blue-50/80' // Own active trades - stronger blue
      : 'border-purple-200 bg-purple-50/50'; // Others' active trades - purple
  };

  const getStatusBadge = () => {
    if (isCompleted) {
      return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          trade.isOwner 
            ? 'bg-blue-100 text-blue-700' 
            : 'bg-green-100 text-green-700'
        }`}>
          <FiCheck className="inline w-3 h-3 mr-1" />
          {trade.isOwner ? 'Your Trade' : 'Participated'}
        </span>
      );
    }
    if (isExpired) {
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
          <FiClock className="inline w-3 h-3 mr-1" />
          Expired
        </span>
      );
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        trade.isOwner 
          ? 'bg-blue-100 text-blue-700' 
          : 'bg-purple-100 text-purple-700'
      }`}>
        <FiUser className="inline w-3 h-3 mr-1" />
        {trade.isOwner ? 'Your Trade' : 'Active'}
      </span>
    );
  };

  return (
    <motion.div
      className={`card border-2 ${getCardTheme()} hover:shadow-lg transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      layout
    >
      <div className="card-body p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {getStatusBadge()}
              <span className="text-xs text-gray-500">
                {new Date(trade.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
              {trade.title}
            </h3>
          </div>
          
          {/* Actions dropdown for own trades */}
          {trade.isOwner && !isCompleted && (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="btn btn-ghost btn-sm btn-circle"
              >
                <FiMoreHorizontal />
              </button>
              
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 top-8 z-10 bg-white border rounded-lg shadow-lg min-w-[120px]"
                >
                  <button
                    onClick={() => {
                      onEdit?.(trade.id);
                      setShowDropdown(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onDelete?.(trade.id);
                      setShowDropdown(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        {trade.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {trade.description.split('\n')[0]} {/* Show only the first line */}
          </p>
        )}

        {/* Offered Items */}
        <div className="mb-3">
          <h4 className="text-xs font-medium text-gray-500 mb-2">OFFERING</h4>
          <div className="flex flex-wrap gap-2">
            {trade.offeredItems.slice(0, 3).map((item) => (
              <motion.div
                key={item.id}
                className="flex items-center gap-1 bg-white border rounded-lg px-2 py-1"
                whileHover={{ scale: 1.02 }}
              >
                {getItemIcon(item.type)}
                <span className="text-xs font-medium">
                  {item.quantity} {item.name}
                </span>
              </motion.div>
            ))}
            {trade.offeredItems.length > 3 && (
              <div className="flex items-center px-2 py-1 bg-gray-100 rounded-lg">
                <span className="text-xs text-gray-500">
                  +{trade.offeredItems.length - 3} more
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Wanted Items */}
        {trade.wantedItems && (
          <div className="mb-3">
            <h4 className="text-xs font-medium text-gray-500 mb-2">WANTS</h4>
            <div className="flex items-center gap-2 bg-white border rounded-lg px-2 py-1">
              <FiArrowRight className="text-gray-400 w-3 h-3" />
              <span className="text-xs text-gray-700">{trade.wantedItems}</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
          <div className="flex items-center gap-3">
            {trade.location && (
              <div className="flex items-center gap-1">
                <FiMapPin className="w-3 h-3" />
                <span>{trade.location}</span>
              </div>
            )}
            {trade.participants && trade.participants.length > 0 && (
              <div className="flex items-center gap-1">
                <FiUser className="w-3 h-3" />
                <span>{trade.participants.length} interested</span>
              </div>
            )}
          </div>
          
          {onViewDetails && (
            <motion.button
              onClick={() => onViewDetails(trade.id)}
              className="text-primary hover:text-primary-focus font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
