'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiMapPin, 
  FiUser, 
  FiClock, 
  FiArrowRight, 
  FiCheck, 
  FiX, 
  FiEdit, 
  FiTrash2,
  FiRefreshCw 
} from 'react-icons/fi';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { ItemType } from '@prisma/client';

interface TradeItem {
  id: string;
  name: string;
  quantity: number;
  type: ItemType;
  img?: string;
}

interface Participant {
  id: string;
  profileId: string;
  participantName: string;
  participantEmail: string;
  date: Date;
  quantity: number;
  offeredItems: TradeItem[];
}

interface TradeDetails {
  id: string;
  title: string;
  description: string;
  offeredItems: TradeItem[];
  status: 'active' | 'completed';
  createdAt: Date;
  endDate?: Date;
  creator: {
    id: string;
    name: string;
    email: string;
  } | null;
  participants: Participant[];
  location?: string;
  wantedItems?: string;
}

// Helper to get item icon
const getItemIcon = (type: ItemType) => {
  const iconClass = "w-5 h-5";
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

export default function TradeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const tradeId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [trade, setTrade] = useState<TradeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch trade details
  const fetchTradeDetails = async () => {
    if (!session?.user?.email) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/trades/${tradeId}?email=${encodeURIComponent(session.user.email)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch trade details');
      }

      setTrade(data.trade);
    } catch (err: any) {
      console.error('Error fetching trade details:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email && tradeId) {
      fetchTradeDetails();
    }
  }, [session?.user?.email, tradeId]);

  // Participate in trade
  const participateInTrade = async () => {
    if (!session?.user?.email) return;

    setActionLoading(true);
    try {
      const response = await fetch(`/api/trades`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.user.email,
          tradeId: tradeId,
          offeredItemIds: [] // For now, empty - could be enhanced to select items
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to participate in trade');
      }

      // Refresh trade details
      fetchTradeDetails();
    } catch (err: any) {
      console.error('Error participating in trade:', err);
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Accept participant
  const acceptParticipant = async (participantId: string) => {
    if (!session?.user?.email) return;

    setActionLoading(true);
    try {
      const response = await fetch(`/api/trades/${tradeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.user.email,
          participantId: participantId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to accept participant');
      }

      // Refresh trade details
      fetchTradeDetails();
    } catch (err: any) {
      console.error('Error accepting participant:', err);
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Complete trade
  const completeTrade = async (participantId: string) => {
    if (!session?.user?.email) return;

    if (!confirm('Are you sure you want to complete this trade? This will transfer the items.')) {
      return;
    }

    setActionLoading(true);
    try {
      const response = await fetch(`/api/trades/${tradeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.user.email,
          participantId: participantId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete trade');
      }

      // Refresh trade details
      fetchTradeDetails();
    } catch (err: any) {
      console.error('Error completing trade:', err);
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete trade
  const deleteTrade = async () => {
    if (!session?.user?.email) return;

    if (!confirm('Are you sure you want to delete this trade?')) {
      return;
    }

    setActionLoading(true);
    try {
      const response = await fetch(`/api/trades/${tradeId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.user.email
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete trade');
      }

      // Redirect back to marketplace
      router.push('/app/marketplace');
    } catch (err: any) {
      console.error('Error deleting trade:', err);
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-4 md:p-8">
          <div className="flex justify-center items-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <FiRefreshCw className="w-8 h-8 text-primary" />
            </motion.div>
            <span className="ml-3 text-gray-600">Loading trade details...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !trade) {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-4 md:p-8">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error || 'Trade not found'}</p>
            <button 
              onClick={() => router.push('/app/marketplace')}
              className="btn btn-primary"
            >
              Back to Marketplace
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const isOwner = trade.creator?.email === session?.user?.email;
  const hasParticipated = trade.participants.some(p => p.participantEmail === session?.user?.email);
  const isCompleted = trade.status === 'completed';

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/app/marketplace')}
            className="btn btn-ghost btn-circle"
          >
            <FiArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{trade.title}</h1>
            <div className="flex items-center gap-4 text-gray-600 mt-2">
              {trade.creator && (
                <div className="flex items-center gap-2">
                  <FiUser size={16} />
                  <span>{trade.creator.name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <FiClock size={16} />
                <span>{new Date(trade.createdAt).toLocaleDateString()}</span>
              </div>
              {trade.location && (
                <div className="flex items-center gap-2">
                  <FiMapPin size={16} />
                  <span>{trade.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Status Badge */}
          <div className={`badge badge-lg ${
            isCompleted ? 'badge-success' : 'badge-primary'
          }`}>
            {isCompleted ? (
              <>
                <FiCheck className="mr-1" />
                Completed
              </>
            ) : (
              'Active'
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Trade Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            {trade.description && (
              <motion.div 
                className="card bg-base-100 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="card-body">
                  <h2 className="card-title">Description</h2>
                  <p className="text-gray-600">{trade.description}</p>
                </div>
              </motion.div>
            )}

            {/* Offered Items */}
            <motion.div 
              className="card bg-base-100 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="card-body">
                <h2 className="card-title">Items Being Offered</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trade.offeredItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      {getItemIcon(item.type)}
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Wanted Items */}
            {trade.wantedItems && (
              <motion.div 
                className="card bg-base-100 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="card-body">
                  <h2 className="card-title">Items Wanted in Return</h2>
                  <div className="flex items-center gap-2 p-3 bg-base-200 rounded-lg">
                    <FiArrowRight className="text-gray-400" />
                    <span>{trade.wantedItems}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Participants */}
            {trade.participants.length > 0 && (
              <motion.div 
                className="card bg-base-100 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="card-body">
                  <h2 className="card-title">
                    Interested Participants ({trade.participants.length})
                  </h2>
                  <div className="space-y-3">
                    {trade.participants.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                              <span className="text-sm">
                                {participant.participantName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium">{participant.participantName}</h3>
                            <p className="text-sm text-gray-500">
                              Interested on {new Date(participant.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        {isOwner && !isCompleted && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => acceptParticipant(participant.id)}
                              disabled={actionLoading}
                              className="btn btn-success btn-sm"
                            >
                              <FiCheck className="mr-1" />
                              Accept
                            </button>
                            <button
                              onClick={() => completeTrade(participant.id)}
                              disabled={actionLoading}
                              className="btn btn-primary btn-sm"
                            >
                              Complete Trade
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            {/* Trade Actions */}
            <motion.div 
              className="card bg-base-100 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="card-body">
                <h2 className="card-title">Actions</h2>
                
                {isCompleted ? (
                  <div className="alert alert-success">
                    <FiCheck />
                    <span>This trade has been completed</span>
                  </div>
                ) : isOwner ? (
                  <div className="space-y-3">
                    <button
                      onClick={() => router.push(`/app/marketplace/edit/${tradeId}`)}
                      className="btn btn-outline w-full"
                    >
                      <FiEdit className="mr-2" />
                      Edit Trade
                    </button>
                    <button
                      onClick={deleteTrade}
                      disabled={actionLoading}
                      className="btn btn-error btn-outline w-full"
                    >
                      <FiTrash2 className="mr-2" />
                      Delete Trade
                    </button>
                  </div>
                ) : hasParticipated ? (
                  <div className="alert alert-info">
                    <FiCheck />
                    <span>You've expressed interest in this trade</span>
                  </div>
                ) : (
                  <button
                    onClick={participateInTrade}
                    disabled={actionLoading}
                    className="btn btn-primary w-full"
                  >
                    {actionLoading ? (
                      <span className="loading loading-spinner loading-sm mr-2"></span>
                    ) : (
                      <FiCheck className="mr-2" />
                    )}
                    Show Interest
                  </button>
                )}
              </div>
            </motion.div>

            {/* Trade Info */}
            <motion.div 
              className="card bg-base-100 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="card-body">
                <h2 className="card-title">Trade Information</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Created:</span>
                    <br />
                    {new Date(trade.createdAt).toLocaleString()}
                  </div>
                  {trade.endDate && (
                    <div>
                      <span className="font-medium">Expires:</span>
                      <br />
                      {new Date(trade.endDate).toLocaleString()}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Status:</span>
                    <br />
                    <span className={isCompleted ? 'text-success' : 'text-primary'}>
                      {isCompleted ? 'Completed' : 'Active'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Participants:</span>
                    <br />
                    {trade.participants.length} interested
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
