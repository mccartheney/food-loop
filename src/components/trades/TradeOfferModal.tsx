'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiPackage, FiRefreshCw, FiArrowRight } from 'react-icons/fi';
import { ItemType } from '@prisma/client';

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  type: ItemType;
  img?: string;
  dateBought: string;
  expire_date: string;
}

interface TradeOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  tradeId: string;
  tradeTitle: string;
  onOfferSubmitted: () => void;
}

// Helper to format item type for display
const formatItemType = (type: string) => {
  return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

// Helper to get item icon
const getItemIcon = (type: ItemType) => {
  const iconClass = "w-5 h-5";
  switch (type) {
    case ItemType.MEAT:
      return <div className={`${iconClass} bg-red-100 text-red-600 rounded flex items-center justify-center text-xs`}>🥩</div>;
    case ItemType.VEGETABLES:
      return <div className={`${iconClass} bg-green-100 text-green-600 rounded flex items-center justify-center text-xs`}>🥬</div>;
    case ItemType.FRUITS:
      return <div className={`${iconClass} bg-orange-100 text-orange-600 rounded flex items-center justify-center text-xs`}>🍎</div>;
    case ItemType.DAIRY:
      return <div className={`${iconClass} bg-blue-100 text-blue-600 rounded flex items-center justify-center text-xs`}>🧀</div>;
    case ItemType.GRAINS_CEREALS:
      return <div className={`${iconClass} bg-amber-100 text-amber-600 rounded flex items-center justify-center text-xs`}>🌾</div>;
    default:
      return <div className={`${iconClass} bg-gray-100 text-gray-600 rounded flex items-center justify-center text-xs`}>📦</div>;
  }
};

export default function TradeOfferModal({ 
  isOpen, 
  onClose, 
  tradeId, 
  tradeTitle, 
  onOfferSubmitted 
}: TradeOfferModalProps) {
  const { data: session } = useSession();
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user's pantry items
  const fetchPantryItems = async () => {
    if (!session?.user?.email || !isOpen) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/pantry?email=${encodeURIComponent(session.user.email)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch pantry items');
      }

      setPantryItems(data.items || []);
    } catch (err: any) {
      console.error('Error fetching pantry items:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchPantryItems();
      setSelectedItems([]);
      setError(null);
    }
  }, [isOpen, session?.user?.email]);

  // Handle item selection
  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Submit the offer
  const submitOffer = async () => {
    if (!session?.user?.email || selectedItems.length === 0) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/trades', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.user.email,
          tradeId: tradeId,
          offeredItemIds: selectedItems
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit offer');
      }

      // Success
      onOfferSubmitted();
      onClose();
    } catch (err: any) {
      console.error('Error submitting offer:', err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Get selected pantry items
  const selectedPantryItems = pantryItems.filter(item => selectedItems.includes(item.id));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Make an Offer</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Select items from your pantry to offer for: <span className="font-medium">{tradeTitle}</span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/80 rounded-full transition-colors"
                disabled={submitting}
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <FiRefreshCw className="w-8 h-8 text-primary animate-spin" />
                <span className="ml-3 text-gray-600">Loading your pantry...</span>
              </div>
            ) : pantryItems.length === 0 ? (
              <div className="text-center py-12">
                <FiPackage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Your pantry is empty.</p>
                <p className="text-sm text-gray-500">Add items to your pantry to make offers.</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <FiPackage className="text-blue-500" />
                    Select Items to Offer ({selectedItems.length} selected)
                  </h3>
                  <p className="text-sm text-gray-600">
                    Choose items from your pantry that you'd like to offer in exchange.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {pantryItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                        selectedItems.includes(item.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                      onClick={() => toggleItemSelection(item.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        {getItemIcon(item.type)}
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity} • {formatItemType(item.type)}
                          </p>
                        </div>
                        {selectedItems.includes(item.id) && (
                          <FiCheck className="text-blue-500 w-5 h-5" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Selected Items Summary */}
                {selectedItems.length > 0 && (
                  <motion.div
                    className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                      <FiCheck className="text-green-600" />
                      Your Offer
                    </h4>
                    <div className="space-y-2">
                      {selectedPantryItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 text-sm">
                          {getItemIcon(item.type)}
                          <span className="text-green-700">
                            {item.quantity} {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between">
              <button
                onClick={onClose}
                className="btn btn-ghost"
                disabled={submitting}
              >
                Cancel
              </button>
              
              <button
                onClick={submitOffer}
                disabled={selectedItems.length === 0 || submitting}
                className="btn btn-primary disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <FiRefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FiArrowRight className="w-4 h-4 mr-2" />
                    Submit Offer ({selectedItems.length} items)
                  </>
                )}
              </button>
            </div>
            
            {selectedItems.length === 0 && (
              <p className="text-xs text-gray-500 mt-2">
                Select at least one item to make an offer
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
