'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiPlus, FiArrowLeft, FiMapPin, FiPackage, FiArrowRight, FiCheck } from 'react-icons/fi';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
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

// Helper to format item type for display
const formatItemType = (type: string) => {
  return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

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

export default function CreateTradePage() {
  const { data: session } = useSession();
  const router = useRouter();
  
  // State for the form
  const [step, setStep] = useState(1); // 1: Select items, 2: Trade details, 3: Review
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [tradeTitle, setTradeTitle] = useState('');
  const [tradeDescription, setTradeDescription] = useState('');
  const [wantedItems, setWantedItems] = useState<string[]>(['']);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user's pantry items
  const fetchPantryItems = async () => {
    if (!session?.user?.email) return;

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
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchPantryItems();
    }
  }, [session?.user?.email]);

  // Handle item selection
  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Add wanted item input
  const addWantedItem = () => {
    setWantedItems(prev => [...prev, '']);
  };

  // Update wanted item
  const updateWantedItem = (index: number, value: string) => {
    setWantedItems(prev => prev.map((item, i) => i === index ? value : item));
  };

  // Remove wanted item
  const removeWantedItem = (index: number) => {
    setWantedItems(prev => prev.filter((_, i) => i !== index));
  };

  // Create the trade
  const createTrade = async () => {
    if (!session?.user?.email) return;

    setLoading(true);
    setError(null);

    try {
      const filteredWantedItems = wantedItems.filter(item => item.trim() !== '');
      
      const response = await fetch('/api/trades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.user.email,
          title: tradeTitle,
          description: tradeDescription,
          offeredItemIds: selectedItems,
          wantedItems: filteredWantedItems,
          location: location || undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create trade');
      }

      // Redirect to the created trade
      router.push(`/app/marketplace/${data.trade.id}`);
    } catch (err: any) {
      console.error('Error creating trade:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get selected pantry items
  const selectedPantryItems = pantryItems.filter(item => selectedItems.includes(item.id));

  if (!session) {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-4 md:p-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Please sign in to create a trade.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="btn btn-ghost btn-circle"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Create New Trade</h1>
            <p className="text-gray-600">Share your pantry items with the community</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="steps steps-horizontal w-full mb-8">
          <div className={`step ${step >= 1 ? 'step-primary' : ''}`}>
            Select Items
          </div>
          <div className={`step ${step >= 2 ? 'step-primary' : ''}`}>
            Trade Details
          </div>
          <div className={`step ${step >= 3 ? 'step-primary' : ''}`}>
            Review & Create
          </div>
        </div>

        {error && (
          <div className="alert alert-error mb-6">
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Select Items */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card bg-base-100 shadow-lg"
          >
            <div className="card-body">
              <h2 className="card-title mb-4">
                <FiPackage className="mr-2" />
                Select Items to Trade
              </h2>
              
              {pantryItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Your pantry is empty.</p>
                  <button
                    onClick={() => router.push('/app/pantry')}
                    className="btn btn-primary"
                  >
                    Add Items to Pantry
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-4">
                    Choose items from your pantry that you'd like to trade:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {pantryItems.map((item) => (
                      <motion.div
                        key={item.id}
                        className={`card border-2 cursor-pointer transition-all ${
                          selectedItems.includes(item.id)
                            ? 'border-primary bg-primary/10'
                            : 'border-base-300 hover:border-primary/50'
                        }`}
                        onClick={() => toggleItemSelection(item.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="card-body p-4">
                          <div className="flex items-center gap-3">
                            {getItemIcon(item.type)}
                            <div className="flex-1">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-500">
                                Qty: {item.quantity} • {formatItemType(item.type)}
                              </p>
                            </div>
                            {selectedItems.includes(item.id) && (
                              <FiCheck className="text-primary" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <div className="text-sm text-gray-600">
                      {selectedItems.length} item(s) selected
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      disabled={selectedItems.length === 0}
                      className="btn btn-primary"
                    >
                      Next: Trade Details
                      <FiArrowRight className="ml-2" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 2: Trade Details */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card bg-base-100 shadow-lg"
          >
            <div className="card-body">
              <h2 className="card-title mb-4">Trade Details</h2>
              
              <div className="space-y-6">
                {/* Title */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Trade Title *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Fresh Apples for Homemade Bread"
                    className="input input-bordered"
                    value={tradeTitle}
                    onChange={(e) => setTradeTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Description</span>
                  </label>
                  <textarea
                    placeholder="Tell others about your items and any special details..."
                    className="textarea textarea-bordered h-24"
                    value={tradeDescription}
                    onChange={(e) => setTradeDescription(e.target.value)}
                  />
                </div>

                {/* Wanted Items */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">What do you want in return? *</span>
                  </label>
                  <div className="space-y-2">
                    {wantedItems.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g., Bread, Flour, etc."
                          className="input input-bordered flex-1"
                          value={item}
                          onChange={(e) => updateWantedItem(index, e.target.value)}
                        />
                        {wantedItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeWantedItem(index)}
                            className="btn btn-ghost btn-circle"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addWantedItem}
                    className="btn btn-ghost btn-sm mt-2"
                  >
                    <FiPlus className="mr-2" />
                    Add Another Item
                  </button>
                </div>

                {/* Location */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Location (Optional)</span>
                  </label>
                  <div className="input-group">
                    <span className="bg-base-200">
                      <FiMapPin />
                    </span>
                    <input
                      type="text"
                      placeholder="e.g., Downtown, North Area"
                      className="input input-bordered flex-1"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="btn btn-ghost"
                >
                  <FiArrowLeft className="mr-2" />
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!tradeTitle.trim() || wantedItems.filter(item => item.trim()).length === 0}
                  className="btn btn-primary"
                >
                  Next: Review
                  <FiArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card bg-base-100 shadow-lg"
          >
            <div className="card-body">
              <h2 className="card-title mb-4">Review Your Trade</h2>
              
              <div className="space-y-6">
                {/* Trade Summary */}
                <div className="bg-base-200 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">{tradeTitle}</h3>
                  {tradeDescription && (
                    <p className="text-gray-600 mb-4">{tradeDescription}</p>
                  )}
                  
                  {/* Offering */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">You're offering:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPantryItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg px-3 py-2 flex items-center gap-2">
                          {getItemIcon(item.type)}
                          <span className="text-sm">
                            {item.quantity} {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Wanting */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">You want:</h4>
                    <div className="flex flex-wrap gap-2">
                      {wantedItems.filter(item => item.trim()).map((item, index) => (
                        <div key={index} className="bg-white rounded-lg px-3 py-2 flex items-center gap-2">
                          <FiArrowRight className="text-gray-400" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  {location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiMapPin />
                      <span>{location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="btn btn-ghost"
                >
                  <FiArrowLeft className="mr-2" />
                  Back
                </button>
                <button
                  onClick={createTrade}
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                  ) : (
                    <FiCheck className="mr-2" />
                  )}
                  Create Trade
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
