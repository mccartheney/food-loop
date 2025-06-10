'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiPackage, FiFileText, FiMapPin, FiCheck, FiRefreshCw } from 'react-icons/fi';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import LocationMapPicker from '@/components/add/LocationMapPicker';
import { ItemType } from '@prisma/client';
import styles from '../../add/styles.module.css';

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  type: ItemType;
  img?: string;
  dateBought: string;
  expire_date: string;
}

interface LocationData {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  city: string;
  country: string;
}

interface FormData {
  selectedItemId: string;
  title: string;
  description: string;
  location: LocationData | null;
}

// Helper to format item type for display
const formatItemType = (type: string) => {
  return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

// Helper to get item icon
const getItemIcon = (type: ItemType) => {
  const iconClass = "w-6 h-6";
  switch (type) {
    case ItemType.MEAT:
      return <div className={`${iconClass} bg-red-100 text-red-600 rounded flex items-center justify-center text-sm`}>🥩</div>;
    case ItemType.VEGETABLES:
      return <div className={`${iconClass} bg-green-100 text-green-600 rounded flex items-center justify-center text-sm`}>🥬</div>;
    case ItemType.FRUITS:
      return <div className={`${iconClass} bg-orange-100 text-orange-600 rounded flex items-center justify-center text-sm`}>🍎</div>;
    case ItemType.DAIRY:
      return <div className={`${iconClass} bg-blue-100 text-blue-600 rounded flex items-center justify-center text-sm`}>🧀</div>;
    case ItemType.GRAINS_CEREALS:
      return <div className={`${iconClass} bg-amber-100 text-amber-600 rounded flex items-center justify-center text-sm`}>🌾</div>;
    default:
      return <div className={`${iconClass} bg-gray-100 text-gray-600 rounded flex items-center justify-center text-sm`}>📦</div>;
  }
};

export default function CreateTradePage() {
  const { data: session } = useSession();
  const router = useRouter();
  
  // State for the form
  const [step, setStep] = useState(1); // 1: Select item, 2: Trade details, 3: Review
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [formData, setFormData] = useState<FormData>({
    selectedItemId: '',
    title: '',
    description: '',
    location: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formProgress, setFormProgress] = useState(0);

  // Calculate form progress
  useEffect(() => {
    const fields = [
      formData.selectedItemId,
      formData.title.trim(),
      formData.description.trim(),
      formData.location
    ];
    
    const completed = fields.filter(Boolean).length;
    const progress = Math.round((completed / fields.length) * 100);
    setFormProgress(progress);
  }, [formData]);

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

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle item selection (single item only)
  const handleItemSelection = (itemId: string) => {
    setFormData(prev => ({ ...prev, selectedItemId: itemId }));
  };

  // Handle location selection
  const handleLocationSelect = (location: LocationData) => {
    setFormData(prev => ({ ...prev, location }));
  };

  // Create the trade
  const createTrade = async () => {
    if (!session?.user?.email) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/trades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.user.email,
          title: formData.title,
          description: formData.description,
          offeredItemIds: [formData.selectedItemId], // Single item as array for API compatibility
          wantedItems: [], // Empty since users will make offers
          location: formData.location?.address,
          coordinates: formData.location?.coordinates
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

  // Get selected pantry item
  const selectedItem = pantryItems.find(item => item.id === formData.selectedItemId);

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
      <motion.div 
        className="container mx-auto p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div 
          className={`${styles.headerGlass} rounded-2xl p-6 mb-8`}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => router.back()}
              className="btn btn-ghost btn-circle"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiArrowLeft size={20} />
            </motion.button>
            <div>
              <h1 className={`text-3xl font-bold ${styles.gradientText}`}>Create New Trade</h1>
              <p className="text-gray-600">Share a single item from your pantry with the community</p>
            </div>
          </div>
        </motion.div>

        {/* Form Container */}
        <motion.div 
          className={`${styles.formContainer} rounded-2xl overflow-hidden`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Progress Bar */}
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Trade Creation Progress</span>
              <span>{formProgress}%</span>
            </div>
            <div className={`${styles.progressBar} h-2 rounded-full`}>
              <motion.div 
                className={`${styles.progressFill} h-full rounded-full`}
                initial={{ width: '0%' }}
                animate={{ width: `${formProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {error && (
            <div className="p-6 border-b border-red-200/50">
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            </div>
          )}

          <form className="p-6 space-y-8">
            {/* Step 1: Select Single Item */}
            {step === 1 && (
              <motion.div 
                className={`${styles.formSection} rounded-2xl p-6 space-y-4`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className={`${styles.sectionHeader}`}>
                  <FiPackage className={styles.sectionIcon} size={24} />
                  <h2 className="text-lg font-semibold">Select One Item to Trade</h2>
                </div>
                
                {pantryItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">Your pantry is empty.</p>
                    <motion.button
                      type="button"
                      onClick={() => router.push('/app/pantry')}
                      className="btn btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add Items to Pantry
                    </motion.button>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 mb-4">
                      Choose one item from your pantry that you'd like to trade:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      {pantryItems.map((item) => (
                        <motion.label
                          key={item.id}
                          className={`${styles.formSection} cursor-pointer transition-all ${
                            formData.selectedItemId === item.id
                              ? 'border-primary bg-primary/10 transform scale-105'
                              : 'border-base-300 hover:border-primary/50'
                          } p-4 rounded-xl border-2`}
                          whileHover={{ scale: formData.selectedItemId === item.id ? 1.05 : 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <input
                            type="radio"
                            name="selectedItem"
                            value={item.id}
                            checked={formData.selectedItemId === item.id}
                            onChange={() => handleItemSelection(item.id)}
                            className="sr-only"
                          />
                          <div className="flex items-center gap-3">
                            {getItemIcon(item.type)}
                            <div className="flex-1">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-500">
                                Qty: {item.quantity} • {formatItemType(item.type)}
                              </p>
                            </div>
                            {formData.selectedItemId === item.id && (
                              <FiCheck className="text-primary w-5 h-5" />
                            )}
                          </div>
                        </motion.label>
                      ))}
                    </div>

                    <div className="flex justify-between">
                      <div className="text-sm text-gray-600">
                        {formData.selectedItemId ? '1 item selected' : 'Select an item to continue'}
                      </div>
                      <motion.button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!formData.selectedItemId}
                        className={`${styles.submitButton} px-6 py-3 rounded-xl disabled:opacity-50`}
                        whileHover={{ scale: formData.selectedItemId ? 1.05 : 1 }}
                        whileTap={{ scale: formData.selectedItemId ? 0.95 : 1 }}
                      >
                        Next: Add Details
                      </motion.button>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Step 2: Trade Details */}
            {step === 2 && (
              <>
                <motion.div 
                  className={`${styles.formSection} rounded-2xl p-6 space-y-4`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className={`${styles.sectionHeader}`}>
                    <FiFileText className={styles.sectionIcon} size={24} />
                    <h2 className="text-lg font-semibold">Trade Details</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Trade Title *
                      </label>
                      <motion.input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder={selectedItem ? `Trade: ${selectedItem.name}` : "What are you trading?"}
                        className={`${styles.inputField} w-full px-4 py-3 rounded-xl`}
                        whileFocus={{ scale: 1.01 }}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <motion.textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your item, its condition, and what kind of items you're looking for in return..."
                        className={`${styles.textareaField} w-full px-4 py-3 rounded-xl h-32`}
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Location Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <LocationMapPicker 
                    onLocationSelect={handleLocationSelect}
                    initialLocation={formData.location || undefined}
                  />
                </motion.div>

                <div className="flex justify-between">
                  <motion.button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn btn-ghost"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiArrowLeft className="mr-2" />
                    Back
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!formData.title.trim()}
                    className={`${styles.submitButton} px-6 py-3 rounded-xl disabled:opacity-50`}
                    whileHover={{ scale: formData.title.trim() ? 1.05 : 1 }}
                    whileTap={{ scale: formData.title.trim() ? 0.95 : 1 }}
                  >
                    Next: Review
                  </motion.button>
                </div>
              </>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <motion.div 
                className={`${styles.formSection} rounded-2xl p-6 space-y-4`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className={`${styles.sectionHeader}`}>
                  <FiCheck className={styles.sectionIcon} size={24} />
                  <h2 className="text-lg font-semibold">Review Your Trade</h2>
                </div>
                
                <div className="space-y-6">
                  {/* Trade Summary */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-2">{formData.title}</h3>
                    {formData.description && (
                      <p className="text-gray-600 mb-4">{formData.description}</p>
                    )}
                    
                    {/* Selected Item */}
                    {selectedItem && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">You're offering:</h4>
                        <div className="bg-white rounded-lg px-4 py-3 flex items-center gap-3 border">
                          {getItemIcon(selectedItem.type)}
                          <div>
                            <span className="font-medium">{selectedItem.name}</span>
                            <p className="text-sm text-gray-500">
                              Quantity: {selectedItem.quantity} • {formatItemType(selectedItem.type)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Location */}
                    {formData.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiMapPin />
                        <span>{formData.location.address}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiCheck className="text-white" size={16} />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">How It Works</h4>
                        <p className="text-sm text-blue-700">
                          Other users will be able to make offers with items from their pantry. 
                          You can then choose which offer you'd like to accept and complete the trade.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <motion.button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn btn-ghost"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiArrowLeft className="mr-2" />
                    Back
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={createTrade}
                    disabled={loading}
                    className={`${styles.submitButton} px-8 py-4 rounded-xl font-semibold text-lg`}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <>
                        <FiRefreshCw className={`${styles.loadingSpinner} mr-3`} />
                        Creating Trade...
                      </>
                    ) : (
                      <>
                        <FiCheck className="mr-3" />
                        CREATE TRADE
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
