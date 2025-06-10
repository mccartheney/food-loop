'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiPlus, FiGrid, FiList, FiRefreshCw } from 'react-icons/fi';
import TradePostCard from './TradePostCard';
import { ItemType } from '@prisma/client';

interface TradeItem {
  id: string;
  name: string;
  quantity: number;
  type: ItemType;
  img?: string;
}

interface Trade {
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
}

interface ProfileTradeGridProps {
  userId: string;
  userEmail?: string; // For authenticated requests
  isOwnProfile?: boolean;
  className?: string;
}

export default function ProfileTradeGrid({ 
  userId, 
  userEmail, 
  isOwnProfile = false,
  className = '' 
}: ProfileTradeGridProps) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch trades for this user
  const fetchTrades = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Build query params
      const params = new URLSearchParams({
        userId: userId,
        status: filter === 'all' ? 'all' : filter
      });

      // Add email for authenticated requests if available
      if (userEmail) {
        params.append('email', userEmail);
      }

      const response = await fetch(`/api/trades?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch trades');
      }

      setTrades(data.trades || []);
    } catch (err: any) {
      console.error('Error fetching user trades:', err);
      setError(err.message || 'Failed to load trades');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, [userId, filter, userEmail]);

  const handleViewDetails = (tradeId: string) => {
    // Navigate to trade details in marketplace
    window.open(`/app/marketplace/${tradeId}`, '_blank');
  };

  const handleEdit = (tradeId: string) => {
    // Navigate to edit trade (implement based on your routing)
    console.log('Edit trade:', tradeId);
  };

  const handleDelete = async (tradeId: string) => {
    if (!userEmail) return;
    
    if (!confirm('Are you sure you want to delete this trade?')) return;

    try {
      const response = await fetch(`/api/trades/${tradeId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete trade');
      }

      // Refresh trades list
      fetchTrades();
    } catch (err: any) {
      console.error('Error deleting trade:', err);
      alert(err.message || 'Failed to delete trade');
    }
  };

  const handleCreateTrade = () => {
    // Navigate to create trade page in marketplace
    window.location.href = '/app/marketplace/create';
  };

  // Filter trades based on current filter
  const filteredTrades = trades.filter(trade => {
    if (filter === 'all') return true;
    return trade.status === filter;
  });

  // Separate own trades and participated trades
  const ownTrades = filteredTrades.filter(trade => trade.isOwner);
  const participatedTrades = filteredTrades.filter(trade => !trade.isOwner);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  if (loading) {
    return (
      <div className={`${className}`}>
        {/* Header */}
        <div className="border-t py-3 flex justify-center mb-6">
          <h3 className="text-primary font-medium">Trades</h3>
        </div>
        
        {/* Loading */}
        <div className="flex justify-center items-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <FiRefreshCw className="w-8 h-8 text-primary" />
          </motion.div>
          <span className="ml-3 text-gray-600">Loading trades...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className}`}>
        <div className="border-t py-3 flex justify-center mb-6">
          <h3 className="text-primary font-medium">Trades</h3>
        </div>
        
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchTrades}
            className="btn btn-outline btn-sm"
          >
            <FiRefreshCw className="mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {/* Header with filters and controls */}
      <div className="border-t py-3 mb-6">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <h3 className="text-primary font-medium">Trades</h3>
            
            {/* Filter buttons */}
            <div className="flex gap-1">
              <button
                onClick={() => setFilter('all')}
                className={`btn btn-xs ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
              >
                All ({trades.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`btn btn-xs ${filter === 'active' ? 'btn-primary' : 'btn-ghost'}`}
              >
                Active ({trades.filter(t => t.status === 'active').length})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`btn btn-xs ${filter === 'completed' ? 'btn-primary' : 'btn-ghost'}`}
              >
                Completed ({trades.filter(t => t.status === 'completed').length})
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View mode toggle */}
            <div className="btn-group">
              <button
                onClick={() => setViewMode('grid')}
                className={`btn btn-xs ${viewMode === 'grid' ? 'btn-active' : ''}`}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`btn btn-xs ${viewMode === 'list' ? 'btn-active' : ''}`}
              >
                <FiList />
              </button>
            </div>

            {/* Create trade button for own profile */}
            {isOwnProfile && userEmail && (
              <button
                onClick={handleCreateTrade}
                className="btn btn-primary btn-xs"
              >
                <FiPlus className="mr-1" />
                New Trade
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Empty state */}
      {filteredTrades.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-6xl mb-4">🤝</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {filter === 'all' ? 'No trades yet' : `No ${filter} trades`}
          </h3>
          <p className="text-gray-500 mb-6">
            {isOwnProfile 
              ? filter === 'all' 
                ? 'Start trading with your pantry items!'
                : `You don't have any ${filter} trades yet.`
              : `This user doesn't have any ${filter === 'all' ? '' : filter} trades yet.`
            }
          </p>
          {isOwnProfile && userEmail && filter === 'all' && (
            <button
              onClick={handleCreateTrade}
              className="btn btn-primary"
            >
              <FiPlus className="mr-2" />
              Create Your First Trade
            </button>
          )}
        </motion.div>
      )}

      {/* Trades grid/list */}
      {filteredTrades.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${filter}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Own Trades Section */}
            {ownTrades.length > 0 && (
              <div className="mb-8">
                <h4 className="text-sm font-medium text-gray-600 mb-4 px-4">
                  {isOwnProfile ? 'Your Trades' : 'Created Trades'}
                </h4>
                <div className={`${
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4' 
                    : 'space-y-4 px-4'
                }`}>
                  {ownTrades.map((trade) => (
                    <motion.div key={trade.id} variants={itemVariants}>
                      <TradePostCard
                        trade={trade}
                        onViewDetails={handleViewDetails}
                        onEdit={isOwnProfile ? handleEdit : undefined}
                        onDelete={isOwnProfile ? handleDelete : undefined}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Participated Trades Section */}
            {participatedTrades.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-4 px-4">
                  {isOwnProfile ? 'Trades You Joined' : 'Participated Trades'}
                </h4>
                <div className={`${
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4' 
                    : 'space-y-4 px-4'
                }`}>
                  {participatedTrades.map((trade) => (
                    <motion.div key={trade.id} variants={itemVariants}>
                      <TradePostCard
                        trade={trade}
                        onViewDetails={handleViewDetails}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
