'use client';

// Import additional icon for search functionality
import { useState, useEffect, FormEvent, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { ItemType } from '@prisma/client';
import { FiPlus, FiTrash2, FiPackage, FiAlertCircle, FiCheckCircle, FiLoader, FiLayers, 
         FiClock, FiFeather, FiDroplet, FiCoffee, FiGrid, FiThermometer, FiBox, FiSearch, FiX } from 'react-icons/fi';
import Image from 'next/image';
import { foodList } from '@/lib/foodList';
import { GiOrange } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import PantryMessages from '@/components/pantry/PantryMessages';
import PantryRecentItemsList from '@/components/pantry/PantryRecentItemsList';
import PantrySearchBar from '@/components/pantry/PantrySearchBar';
import PantryItemsTable from '@/components/pantry/PantryItemsTable';
import PantryItemsGrid from '@/components/pantry/PantryItemsGrid';
import QrScanner from 'qr-scanner';

// Client-side representation of a pantry item
interface PantryDisplayItem {
    id: string;
    name: string;
    quantity: number;
    expire_date: string; // 'YYYY-MM-DD' or 'N/A'
    type: string; // Enum value string, e.g., 'VEGETABLES'
    img?: string | null;
    dateBought: string; // 'YYYY-MM-DD'
}

// Helper to format enum keys for display
const formatItemTypeLabel = (typeKey: string) => {
    return typeKey
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, (l) => l.toUpperCase());
};

// Helper to map foodList types to API-compatible ItemType strings
const foodListTypeToApiType = (type: string): string => {
    const upperType = type.toUpperCase();
    switch (upperType) {
        case 'MEAT': return ItemType.MEAT;
        case 'GRAIN': return ItemType.GRAINS_CEREALS;
        case 'DAIRY': return ItemType.DAIRY;
        case 'BEVERAGE': return ItemType.BEVERAGES;
        case 'FROZEN': return ItemType.FROZEN_FOODS;
        default:
            return ItemType.BAKERY
        
    }
};

const PantryPage = () => {
    const { data: session, status: sessionStatus } = useSession();
    const [pantryItems, setPantryItems] = useState<PantryDisplayItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Add search state
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState<'all' | 'name' | 'type'>('all');

    // Form state
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState<number | string>(1);
    const [itemExpireDate, setItemExpireDate] = useState('');
    const [itemType, setItemType] = useState<string>(Object.keys(ItemType)[0] || '');
    const [itemImg, setItemImg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmittingAll, setIsSubmittingAll] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

    // Add state to track active tab in the modal
    const [activeModalTab, setActiveModalTab] = useState<'add-item' | 'demo-items' | 'camera'>('add-item');
    
    // Add camera state
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    
    // Add QR processing state
    const [isProcessingQR, setIsProcessingQR] = useState(false);
    const [qrResult, setQrResult] = useState<string | null>(null);
    const [detectedItems, setDetectedItems] = useState<any[] | null>(null);

    // Toggle camera
    const toggleCamera = async () => {
        if (!isCameraActive) {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'environment' } 
                });
                
                // Clear any previous errors and captured image
                setCameraError(null);
                setCapturedImage(null);
                setStream(mediaStream);
                setIsCameraActive(true);
                
            } catch (err: any) {
                console.error("Camera access error:", err);
                
                if (err.name === 'NotAllowedError') {
                    setCameraError("Camera access denied. Please allow camera permissions and try again.");
                } else if (err.name === 'NotFoundError') {
                    setCameraError("No camera found on this device.");
                } else if (err.name === 'NotSupportedError') {
                    setCameraError("Camera not supported on this device/browser.");
                } else {
                    setCameraError(`Camera error: ${err.message}`);
                }
            }
        } else {
            // Stop camera
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                setStream(null);
            }
            setIsCameraActive(false);
        }
    };

    // Process captured image for QR codes
    const processImageForQR = async (imageDataUrl: string) => {
        setIsProcessingQR(true);
        setQrResult(null);
        setDetectedItems(null);
        
        try {
            // Convert base64 to File object
            const response = await fetch(imageDataUrl);
            const blob = await response.blob();
            const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });

            // Scan for QR code
            const result = await QrScanner.scanImage(file, { returnDetailedScanResult: true });
            
            if (result && result.data) {
                setQrResult(result.data);
                
                // Check if QR content is "nao me fodas"
                if (result.data.trim() === "nao me fodas") {
                    // Convert all foodList items to the correct format for the API
                    const allFoodItems = foodList.map(item => ({
                        name: item.name,
                        quantity: item.quantity,
                        expire_date: item.expire_date,
                        type: foodListTypeToApiType(item.type),
                        img: undefined
                    }));
                    
                    setDetectedItems(allFoodItems);
                    setSuccessMessage(`Found all ${allFoodItems.length} items from food list!`);
                } else {
                    // Try to parse as JSON for other cases (keeping existing functionality)
                    try {
                        const parsedData = JSON.parse(result.data);
                        
                        // Check if it's an array of items or a single item
                        let itemsToAdd = [];
                        
                        if (Array.isArray(parsedData)) {
                            itemsToAdd = parsedData;
                        } else if (parsedData.items && Array.isArray(parsedData.items)) {
                            itemsToAdd = parsedData.items;
                        } else if (parsedData.name) {
                            // Single item
                            itemsToAdd = [parsedData];
                        }
                        
                        // Validate and format items
                        const validItems = itemsToAdd.map(item => ({
                            name: item.name || 'Unknown Item',
                            quantity: Number(item.quantity) || 1,
                            expire_date: item.expire_date || item.expireDate || 'N/A',
                            type: item.type || ItemType.BAKERY,
                            img: item.img || item.image || undefined
                        })).filter(item => item.name !== 'Unknown Item');
                        
                        if (validItems.length > 0) {
                            setDetectedItems(validItems);
                            setSuccessMessage(`Found ${validItems.length} item(s) in QR code!`);
                        } else {
                            setError('Invalid value');
                        }
                        
                    } catch (parseError) {
                        // QR code doesn't contain valid JSON and is not "nao me fodas"
                        setError('Invalid value');
                    }
                }
            }
        } catch (error) {
            console.error('QR scanning error:', error);
            setError('No QR code found in the image.');
        } finally {
            setIsProcessingQR(false);
        }
    };

    // Add detected items to pantry
    const addDetectedItems = async () => {
        if (!detectedItems || !userEmail) {
            setError("No items to add or user not logged in.");
            return;
        }

        setIsSubmitting(true);
        clearMessages();

        try {
            const response = await fetch('/api/pantry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: userEmail, 
                    itemsToAdd: detectedItems 
                }),
            });
            
            const responseData = await response.json();
            
            if (!response.ok) {
                throw new Error(responseData.error || 'Failed to add items.');
            }
            
            setSuccessMessage(`Successfully added ${detectedItems.length} item(s) from QR code!`);
            fetchPantryItems();
            closeAddItemModal();
            
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Capture photo function
    const capturePhoto = async () => {
        if (!stream) return;

        const video = document.querySelector('video');
        if (!video) return;

        // Create canvas to capture the frame
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) return;

        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert to base64 image
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageDataUrl);

        // Stop the camera after capturing
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsCameraActive(false);

        // Process the image for QR codes
        await processImageForQR(imageDataUrl);
    };

    // Reset captured image and QR data
    const resetCapture = () => {
        setCapturedImage(null);
        setQrResult(null);
        setDetectedItems(null);
        clearMessages();
    };

    // Cleanup camera when component unmounts or modal closes
    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    const userEmail = session?.user?.email;

    // Filter items based on search term
    const filteredItems = useMemo(() => {
        if (!searchTerm.trim()) {
            return pantryItems; // Return all items if search is empty
        }

        const searchLower = searchTerm.toLowerCase();
        
        return pantryItems.filter(item => {
            switch (searchCategory) {
                case 'name':
                    return item.name.toLowerCase().includes(searchLower);
                case 'type':
                    return formatItemTypeLabel(item.type).toLowerCase().includes(searchLower);
                case 'all':
                default:
                    // Search across multiple fields
                    return (
                        item.name.toLowerCase().includes(searchLower) ||
                        formatItemTypeLabel(item.type).toLowerCase().includes(searchLower) ||
                        item.expire_date.toLowerCase().includes(searchLower)
                    );
            }
        });
    }, [pantryItems, searchTerm, searchCategory]);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        // The filtering happens automatically via the useMemo
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const fetchPantryItems = async () => {
        if (!userEmail) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/pantry?email=${encodeURIComponent(userEmail)}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to fetch pantry items: ${response.statusText}`);
            }
            const data = await response.json();
            setPantryItems(data.items || []);
        } catch (e: any) {
            setError(e.message);
            setPantryItems([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (sessionStatus === 'authenticated' && userEmail) {
            fetchPantryItems();
        } else if (sessionStatus === 'unauthenticated') {
            setError("Please sign in to view your pantry.");
            setIsLoading(false);
        }
        // Don't run on sessionStatus === 'loading'
    }, [userEmail, sessionStatus]);


    const clearMessages = () => {
        setError(null);
        setSuccessMessage(null);
    }

    const handleAddItem = async (e: FormEvent) => {
        e.preventDefault();
        if (!userEmail) {
            setError("You must be logged in to add items.");
            return;
        }
        clearMessages();
        setIsSubmitting(true);

        const newItem = {
            name: itemName,
            quantity: Number(itemQuantity),
            expire_date: itemExpireDate || 'N/A',
            type: itemType,
            img: itemImg || undefined,
        };

        try {
            const response = await fetch('/api/pantry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail, itemsToAdd: [newItem] }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.error || 'Failed to add item.');
            }
            setSuccessMessage(responseData.message || 'Item added successfully!');
            fetchPantryItems();
            
            // Close the modal on success
            closeAddItemModal();
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleAddAllItems = async () => {
        if (!userEmail) {
            setError("You must be logged in to add items.");
            return;
        }
        clearMessages();
        setIsSubmittingAll(true);

        const itemsToSubmit = foodList.map(item => ({
            name: item.name,
            quantity: item.quantity,
            expire_date: item.expire_date,
            type: foodListTypeToApiType(item.type),
        }));

        try {
            const response = await fetch('/api/pantry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail, itemsToAdd: itemsToSubmit }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.error || 'Failed to add all demo items.');
            }
            setSuccessMessage(responseData.message || 'All demo items added successfully!');
            fetchPantryItems();
            
            // Close the modal on success
            closeAddItemModal();
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsSubmittingAll(false);
        }
    };

    const handleDeleteItem = async (itemId: string) => {
        if (!userEmail) {
            setError("You must be logged in to delete items.");
            return;
        }
        clearMessages();
        // Optional: Add a confirmation dialog here
        // if (!confirm("Are you sure you want to delete this item?")) return;

        try {
            const response = await fetch('/api/pantry', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail, itemIdsToDelete: [itemId] }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.error || 'Failed to delete item.');
            }
            setSuccessMessage(responseData.message || 'Item deleted successfully!');
            fetchPantryItems(); // Refresh list
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
        if (!userEmail) {
            setError("You must be logged in to update items.");
            return;
        }
        if (newQuantity < 1) {
            // Optional: Either prevent going below 1, or offer to delete
            if (confirm("Remove item from pantry?")) {
                return handleDeleteItem(itemId);
            }
            return;
        }
        
        clearMessages();
        
        try {
            const response = await fetch('/api/pantry', {
                method: 'PATCH', // Using PATCH for partial updates
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: userEmail, 
                    itemUpdate: { 
                        id: itemId, 
                        quantity: newQuantity 
                    }
                }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.error || 'Failed to update item quantity.');
            }
            
            // Update the local state without a full refetch to improve UX
            setPantryItems(items => items.map(item => 
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            ));
            
            setSuccessMessage(responseData.message || 'Item quantity updated!');
            
            // Alternatively, if you prefer a full refresh: fetchPantryItems();
        } catch (e: any) {
            setError(e.message);
        }
    };

    // Animation variants for different components
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.07,
                delayChildren: 0.2
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    };
    
    const renderRecentItemsList = () => {
        if (pantryItems.length === 0) return null;

        // Sort by date added, most recent first
        const recentItems = [...pantryItems]
            .sort((a, b) => new Date(b.dateBought).getTime() - new Date(a.dateBought).getTime())
            .slice(0, 7); // Show only the 7 most recent items

        return (
            <motion.div 
                className="card bg-base-100 shadow-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="card-body p-5">
                    <motion.h2 
                        className="text-lg font-semibold flex items-center mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="badge badge-primary mr-2">
                            <FiClock className="mr-1" />
                        </span>
                        Last Items added to the pantry
                    </motion.h2>
                    <motion.div 
                        className="divide-y"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {recentItems.map(item => (
                            <motion.div 
                                key={item.id} 
                                className="py-3 flex items-center"
                                variants={itemVariants}
                                whileHover={{ 
                                    scale: 1.02, 
                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <motion.div 
                                    className="w-10 h-10 flex-shrink-0 rounded-full bg-base-200 flex items-center justify-center mr-3"
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    {getItemIcon(item.type)}
                                </motion.div>
                                <div className="flex-grow">
                                    <p className="font-medium">
                                        {item.quantity} {item.name}
                                    </p>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {new Date(item.dateBought).toLocaleDateString()}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        );
    };

    // Helper function to get item icons based on type
    const getItemIcon = (type: string) => {
        switch (type) {
            case ItemType.MEAT:
                return <FiPackage className="text-rose-500" />;
            case ItemType.VEGETABLES:
                return <FiFeather className="text-green-500" />;
            case ItemType.FRUITS:
                return <GiOrange className="text-red-500" />;
            case ItemType.DAIRY:
                return <FiDroplet className="text-blue-300" />;
            case ItemType.BEVERAGES:
                return <FiCoffee className="text-amber-600" />;
            case ItemType.GRAINS_CEREALS:
                return <FiGrid className="text-amber-800" />;
            case ItemType.FROZEN_FOODS:
                return <FiThermometer className="text-cyan-500" />;
            default:
                return <FiBox className="text-gray-500" />;
        }
    };

    const renderAllItemsList = () => {
        if (isLoading && !pantryItems.length) {
            return (
                <motion.div 
                    className="flex justify-center items-center py-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                        <FiLoader className="text-4xl text-primary" />
                    </motion.div>
                    <p className="ml-3">Loading your pantry items...</p>
                </motion.div>
            );
        }
        
        if (!filteredItems.length) {
            if (!pantryItems.length && !error) {
                // If there are no items at all
                return (
                    <motion.div 
                        className="text-center py-10 card bg-base-200 p-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <FiPackage size={48} className="mx-auto mb-4 text-neutral-content opacity-50" />
                        </motion.div>
                        <motion.p 
                            className="text-lg text-neutral-content opacity-70"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 0.7 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            Your pantry is currently empty.
                        </motion.p>
                        <motion.p 
                            className="text-sm text-neutral-content opacity-60"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 0.6 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            Use the form above to add your first item!
                        </motion.p>
                    </motion.div>
                );
            } else if (searchTerm) {
                // If there are items but none match the search
                return (
                    <motion.div 
                        className="text-center py-10 card bg-base-200 p-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <FiSearch size={48} className="mx-auto mb-4 text-neutral-content opacity-50" />
                        </motion.div>
                        <motion.p 
                            className="text-lg text-neutral-content opacity-70"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 0.7 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            No items match your search.
                        </motion.p>
                        <motion.button 
                            className="btn btn-sm btn-outline mt-4"
                            onClick={clearSearch}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FiX className="mr-2" /> Clear Search
                        </motion.button>
                    </motion.div>
                );
            }
        }
        
        // Sort items by name for list view
        const sortedItems = [...filteredItems].sort((a, b) => a.name.localeCompare(b.name));
        
        return (
            <motion.div 
                className="card bg-base-100 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="card-body p-5">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Type</th>
                                    <th>Expires</th>
                                    <th>Added</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <motion.tbody
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {sortedItems.map(item => (
                                    <motion.tr 
                                        key={item.id}
                                        variants={itemVariants}
                                        whileHover={{ 
                                            backgroundColor: 'rgba(0,0,0,0.03)', 
                                            transition: { duration: 0.2 } 
                                        }}
                                    >
                                        <td className="flex items-center space-x-2">
                                            <motion.div 
                                                className="w-8 h-8 flex-shrink-0 rounded-full bg-base-200 flex items-center justify-center"
                                                whileHover={{ scale: 1.15, rotate: 5 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                            >
                                                {getItemIcon(item.type)}
                                            </motion.div>
                                            <span className="font-medium">{item.name}</span>
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-2">
                                                <motion.button 
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                    className="btn btn-xs btn-circle btn-outline"
                                                    aria-label={`Decrease quantity of ${item.name}`}
                                                    whileHover={{ 
                                                        scale: 1.2, 
                                                        backgroundColor: "#FEE2E2", 
                                                        borderColor: "#EF4444",
                                                        color: "#EF4444"
                                                    }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                                >
                                                    -
                                                </motion.button>
                                                <motion.span 
                                                    className="font-medium"
                                                    key={item.quantity} // Re-animate when quantity changes
                                                    initial={{ scale: 1.2, opacity: 0.7 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {item.quantity}
                                                </motion.span>
                                                <motion.button 
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                    className="btn btn-xs btn-circle btn-outline"
                                                    aria-label={`Increase quantity of ${item.name}`}
                                                    whileHover={{ 
                                                        scale: 1.2, 
                                                        backgroundColor: "#DCFCE7", 
                                                        borderColor: "#22C55E",
                                                        color: "#22C55E"
                                                    }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                                >
                                                    +
                                                </motion.button>
                                            </div>
                                        </td>
                                        <td>{formatItemTypeLabel(item.type)}</td>
                                        <td className={item.expire_date === 'N/A' || new Date(item.expire_date) > new Date() ? '' : 'text-error font-semibold'}>
                                            {item.expire_date}
                                        </td>
                                        <td>{new Date(item.dateBought).toLocaleDateString()}</td>
                                        <td>
                                            <motion.button 
                                                onClick={() => handleDeleteItem(item.id)} 
                                                className="btn btn-error btn-xs btn-outline"
                                                aria-label={`Delete ${item.name}`}
                                                whileHover={{ scale: 1.05, backgroundColor: "#FCA5A5" }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <FiTrash2 /> Delete
                                            </motion.button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </motion.tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        );
    };
    
    // Update the grid view with animations
    const renderGridView = () => {
        if (!filteredItems.length && searchTerm) {
            // Show "no results" when searching
            return (
                <motion.div 
                    className="text-center py-10 card bg-base-200 p-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <FiSearch size={48} className="mx-auto mb-4 text-neutral-content opacity-50" />
                    </motion.div>
                    <motion.p 
                        className="text-lg text-neutral-content opacity-70"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 0.7 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        No items match your search.
                    </motion.p>
                    <motion.button 
                        className="btn btn-sm btn-outline mt-4"
                        onClick={clearSearch}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FiX className="mr-2" /> Clear Search
                    </motion.button>
                </motion.div>
            );
        }
        
        return (
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {filteredItems.map(item => (
                    <motion.div 
                        key={item.id} 
                        className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        {item.img && (
                            <motion.figure 
                                className="h-48 overflow-hidden relative"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Image src={item.img} alt={item.name} layout="fill" objectFit="cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                            </motion.figure>
                        )}
                        <div className="card-body p-5">
                            <h3 className="card-title text-lg truncate" title={item.name}>{item.name}</h3>
                            
                            <div className="flex items-center">
                                <span className="text-sm font-semibold mr-2">Quantity:</span>
                                <div className="flex items-center space-x-2">
                                    <motion.button 
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                        className="btn btn-xs btn-circle btn-outline"
                                        aria-label={`Decrease quantity of ${item.name}`}
                                        whileHover={{ 
                                            scale: 1.2, 
                                            backgroundColor: "#FEE2E2", 
                                            borderColor: "#EF4444",
                                            color: "#EF4444"
                                        }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        -
                                    </motion.button>
                                    <motion.span 
                                        className="font-medium"
                                        key={item.quantity} // Re-animate when quantity changes
                                        initial={{ scale: 1.2, opacity: 0.7 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {item.quantity}
                                    </motion.span>
                                    <motion.button 
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                        className="btn btn-xs btn-circle btn-outline"
                                        aria-label={`Increase quantity of ${item.name}`}
                                        whileHover={{ 
                                            scale: 1.2, 
                                            backgroundColor: "#DCFCE7", 
                                            borderColor: "#22C55E",
                                            color: "#22C55E"
                                        }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        +
                                    </motion.button>
                                </div>
                            </div>
                            
                            <p className="text-sm"><span className="font-semibold">Type:</span> {formatItemTypeLabel(item.type)}</p>
                            <p className={`text-sm ${item.expire_date === 'N/A' || new Date(item.expire_date) > new Date() ? '' : 'text-error font-semibold'}`}>
                                <span className="font-semibold">Expires:</span> {item.expire_date}
                            </p>
                            <p className="text-xs text-gray-500"><span className="font-semibold">Added:</span> {item.dateBought}</p>
                            <div className="card-actions justify-end mt-4">
                                <motion.button 
                                    onClick={() => handleDeleteItem(item.id)} 
                                    className="btn btn-error btn-sm btn-outline"
                                    aria-label={`Delete ${item.name}`}
                                    whileHover={{ scale: 1.05, backgroundColor: "#FCA5A5" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FiTrash2 /> Delete
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        );
    };

    
// Animate error and success messages

    if (sessionStatus === 'loading') {
        return (
            <motion.div 
                className="flex justify-center items-center min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.span 
                    className="loading loading-spinner loading-lg"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                ></motion.span>
            </motion.div>
        );
    }

    // Helper function to switch between tabs
    const switchModalTab = (tab: 'add-item' | 'demo-items' | 'camera') => {
        setActiveModalTab(tab);
        // Stop camera when switching away from camera tab
        if (tab !== 'camera' && stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            setIsCameraActive(false);
            setCameraError(null);
            setCapturedImage(null);
        }
    };
    
    // Helper function to open the modal
    const openAddItemModal = () => {
        if (typeof document !== 'undefined') {
            // Cast the element to HTMLDialogElement to access showModal method
            const modal = document.getElementById('add_item_modal') as HTMLDialogElement;
            if (modal) modal.showModal();
        }
    };
    
    // Helper function to close the modal
    const closeAddItemModal = () => {
        if (typeof document !== 'undefined') {
            // Stop camera if active
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                setStream(null);
            }
            setIsCameraActive(false);
            setCameraError(null);
            setCapturedImage(null);
            
            // Close the modal
            const modal = document.getElementById('add_item_modal') as HTMLDialogElement;
            if (modal) modal.close();
            
            // Reset form fields after a short delay to allow the closing animation
            setTimeout(() => {
                setItemName('');
                setItemQuantity(1);
                setItemExpireDate('');
                setItemType(Object.keys(ItemType)[0] || '');
                setItemImg('');
                // Reset to the add item tab for next time
                setActiveModalTab('add-item');
            }, 300);
        }
    };

    const addItemModal = (
        <>
            {/* Modal Trigger Button */}
            <motion.button
                onClick={openAddItemModal}
                className="btn btn-primary btn-lg fixed bottom-6 right-6 z-10 rounded-full shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 400, damping: 15 }}
            >
                <FiPlus size={24} />
            </motion.button>
            
            {/* Modal Component */}
            <dialog id="add_item_modal" className="modal modal-bottom sm:modal-middle">
                <motion.div 
                    className="modal-box max-w-4xl"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <div className="tabs tabs-boxed mb-6 bg-base-200">
                        <a 
                            className={`tab ${activeModalTab === 'add-item' ? 'tab-active' : ''}`}
                            onClick={() => switchModalTab('add-item')}
                        >
                            <FiPlus className="mr-2" /> Add Item
                        </a>
                        <a 
                            className={`tab ${activeModalTab === 'demo-items' ? 'tab-active' : ''}`}
                            onClick={() => switchModalTab('demo-items')}
                        >
                            <FiLayers className="mr-2" /> Add Demo Items
                        </a>
                        <a 
                            className={`tab ${activeModalTab === 'camera' ? 'tab-active' : ''}`}
                            onClick={() => switchModalTab('camera')}
                        >
                            <svg className="w-4 h-4 mr-2 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg> Camera
                        </a>
                    </div>
                    
                    {/* Add Single Item Tab Content */}
                    {activeModalTab === 'add-item' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h3 className="font-bold text-lg mb-4">Add New Pantry Item</h3>
                            
                            <form onSubmit={handleAddItem} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label"><span className="label-text">Item Name</span></label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g., Apples" 
                                            value={itemName} 
                                            onChange={(e) => setItemName(e.target.value)} 
                                            className="input input-bordered w-full" 
                                            required 
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label"><span className="label-text">Quantity</span></label>
                                        <input 
                                            type="number" 
                                            value={itemQuantity} 
                                            onChange={(e) => setItemQuantity(e.target.value === '' ? '' : Number(e.target.value))} 
                                            min="1" 
                                            className="input input-bordered w-full" 
                                            required 
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label"><span className="label-text">Expiration Date</span></label>
                                        <input 
                                            type="text" 
                                            placeholder="YYYY-MM-DD or N/A" 
                                            value={itemExpireDate} 
                                            onChange={(e) => setItemExpireDate(e.target.value)} 
                                            className="input input-bordered w-full" 
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label"><span className="label-text">Item Type</span></label>
                                        <select 
                                            value={itemType} 
                                            onChange={(e) => setItemType(e.target.value)} 
                                            className="select select-bordered w-full" 
                                            required
                                        >
                                            {Object.keys(ItemType).map(key => (
                                                <option key={key} value={key}>{formatItemTypeLabel(key)}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Image URL (Optional)</span></label>
                                    <input 
                                        type="url" 
                                        placeholder="https://example.com/image.png" 
                                        value={itemImg} 
                                        onChange={(e) => setItemImg(e.target.value)} 
                                        className="input input-bordered w-full" 
                                    />
                                </div>
                                
                                <div className="modal-action">
                                    <button 
                                        type="button" 
                                        className="btn" 
                                        onClick={closeAddItemModal}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary" 
                                        disabled={isSubmitting || sessionStatus !== 'authenticated'}
                                    >
                                        {isSubmitting ? 
                                            <motion.span 
                                                className="loading loading-spinner loading-xs"
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            ></motion.span> : 
                                            <FiPlus className="mr-2" />
                                        }
                                        Add Item
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                    
                    {/* Add Demo Items Tab Content */}
                    {activeModalTab === 'demo-items' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h3 className="font-bold text-lg mb-4">Add Demo Items</h3>
                            
                            <div className="space-y-4">
                                <p>This will add a set of common food items to your pantry for demonstration purposes.</p>
                                
                                <div className="bg-base-200 rounded-box p-4 text-sm">
                                    <h4 className="font-bold mb-2">Sample items include:</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        {foodList.slice(0, 5).map((item, index) => (
                                            <li key={index}>{item.name} ({item.quantity})</li>
                                        ))}
                                        <li>...and {foodList.length - 5} more items</li>
                                    </ul>
                                </div>
                                
                                <div className="modal-action">
                                    <button 
                                        type="button" 
                                        className="btn" 
                                        onClick={closeAddItemModal}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary" 
                                        onClick={handleAddAllItems}
                                        disabled={isSubmittingAll || sessionStatus !== 'authenticated'}
                                    >
                                        {isSubmittingAll ? 
                                            <motion.span 
                                                className="loading loading-spinner loading-xs"
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            ></motion.span> : 
                                            <FiLayers className="mr-2" />
                                        }
                                        Add Demo Items
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    
                    {/* Camera Tab Content */}
                    {activeModalTab === 'camera' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h3 className="font-bold text-lg mb-4">Camera QR Scanner</h3>
                            
                            <div className="space-y-4">
                                <p>
                                    {capturedImage 
                                        ? 'Photo captured! Checking for QR codes...' 
                                        : 'Capture a photo to scan for QR codes containing item data.'
                                    }
                                </p>
                                
                                {cameraError && (
                                    <div className="alert alert-error">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{cameraError}</span>
                                    </div>
                                )}

                                {/* QR Processing Status */}
                                {isProcessingQR && (
                                    <div className="alert alert-info">
                                        <motion.span 
                                            className="loading loading-spinner loading-sm"
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        />
                                        <span>Scanning image for QR codes...</span>
                                    </div>
                                )}

                                {/* QR Results */}
                                {qrResult && (
                                    <div className="alert alert-success">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>QR Code detected!</span>
                                    </div>
                                )}

                                {/* Detected Items */}
                                {detectedItems && detectedItems.length > 0 && (
                                    <div className="card bg-base-100 border border-success">
                                        <div className="card-body p-4">
                                            <h4 className="font-bold text-success mb-2">
                                                Found {detectedItems.length} item(s):
                                            </h4>
                                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                                {detectedItems.map((item, index) => (
                                                    <div key={index} className="flex justify-between items-center bg-base-200 p-2 rounded">
                                                        <span className="font-medium">{item.name}</span>
                                                        <div className="text-sm opacity-70">
                                                            Qty: {item.quantity} | Type: {formatItemTypeLabel(item.type)}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="card bg-base-200 p-4">
                                    {capturedImage ? (
                                        // Show captured image
                                        <div className="relative w-full" style={{ minHeight: "300px" }}>
                                            <img
                                                src={capturedImage}
                                                alt="Captured photo"
                                                className="w-full h-full object-cover rounded"
                                                style={{ minHeight: "300px", maxHeight: "400px" }}
                                            />
                                            <p className="text-sm text-center mt-2">
                                                {isProcessingQR ? 'Processing...' : 'Photo captured'}
                                            </p>
                                        </div>
                                    ) : isCameraActive && stream ? (
                                        // Show live camera feed
                                        <div className="relative w-full" style={{ minHeight: "300px" }}>
                                            <video
                                                ref={(video) => {
                                                    if (video && stream) {
                                                        video.srcObject = stream;
                                                        video.play();
                                                    }
                                                }}
                                                className="w-full h-full object-cover rounded"
                                                style={{ minHeight: "300px", maxHeight: "400px" }}
                                                autoPlay
                                                playsInline
                                                muted
                                            />
                                            <p className="text-sm text-center mt-2">Camera is active - ready to capture</p>
                                        </div>
                                    ) : (
                                        // Show camera placeholder
                                        <div className="text-center py-8">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <p>Click "Start Camera" to begin</p>
                                            <p className="text-xs mt-2 opacity-60">Capture a photo to scan for QR codes</p>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="modal-action">
                                    <button 
                                        type="button" 
                                        className="btn" 
                                        onClick={closeAddItemModal}
                                    >
                                        Cancel
                                    </button>
                                    
                                    {detectedItems && detectedItems.length > 0 && (
                                        // Show add items button when items are detected
                                        <button 
                                            type="button" 
                                            className="btn btn-success" 
                                            onClick={addDetectedItems}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <motion.span 
                                                    className="loading loading-spinner loading-xs"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                />
                                            ) : (
                                                <>
                                                    <FiPlus className="mr-2" />
                                                    Add {detectedItems.length} Item(s)
                                                </>
                                            )}
                                        </button>
                                    )}
                                    
                                    {capturedImage ? (
                                        // Show retake button when image is captured
                                        <button 
                                            type="button" 
                                            className="btn btn-secondary" 
                                            onClick={resetCapture}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Retake Photo
                                        </button>
                                    ) : isCameraActive && stream ? (
                                        // Show capture button when camera is active
                                        <>
                                            <button 
                                                type="button" 
                                                className="btn btn-success" 
                                                onClick={capturePhoto}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Capture & Scan
                                            </button>
                                            <button 
                                                type="button" 
                                                className="btn btn-error" 
                                                onClick={toggleCamera}
                                            >
                                                Stop Camera
                                            </button>
                                        </>
                                    ) : (
                                        // Show start camera button when camera is inactive
                                        <button 
                                            type="button" 
                                            className="btn btn-primary" 
                                            onClick={toggleCamera}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            Start Camera
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );

    return (
        <motion.div 
            className="container mx-auto p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h1 
                className="text-3xl font-bold mb-8 text-center flex items-center justify-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
            >
                <motion.span
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                >
                    <FiPackage className="mr-3 text-primary" />
                </motion.span>
                Your Digital Pantry
            </motion.h1>

            <PantryMessages
                error={error}
                successMessage={successMessage}
                onClearError={() => setError(null)}
                onClearSuccess={() => setSuccessMessage(null)}
            />

            {/* Replace the Add Item Form with the modal and a floating action button */}
            {addItemModal}

            {/* Recently Added Items List */}
            <PantryRecentItemsList
                items={pantryItems}
                getItemIcon={getItemIcon}
                containerVariants={containerVariants}
                itemVariants={itemVariants}
            />

            {/* Search Bar */}
            <PantrySearchBar
                searchTerm={searchTerm}
                searchCategory={searchCategory}
                onSearchTermChange={setSearchTerm}
                onSearchCategoryChange={v => setSearchCategory(v)}
                onClearSearch={clearSearch}
                onSearch={handleSearch}
                totalItems={pantryItems.length}
                filteredCount={filteredItems.length}
            />

            {/* Pantry Items - Header with view toggle */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
            >
                <div className="flex justify-between items-center mb-6">
                    <motion.h2 
                        className="text-2xl font-semibold"
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                        Your Items {searchTerm && <span className="text-sm font-normal">(filtered)</span>}
                    </motion.h2>
                    
                    {/* Keep only the view toggle buttons here */}
                    <motion.div 
                        className="btn-group"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.button 
                            className={`btn btn-sm ${viewMode === 'list' ? 'btn-active' : ''}`} 
                            onClick={() => setViewMode('list')}
                            title="List View"
                            whileHover={{ backgroundColor: viewMode !== 'list' ? "rgba(0,0,0,0.05)" : undefined }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list-ul" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                            </svg>
                        </motion.button>
                        <motion.button 
                            className={`btn btn-sm ${viewMode === 'grid' ? 'btn-active' : ''}`} 
                            onClick={() => setViewMode('grid')}
                            title="Grid View"
                            whileHover={{ backgroundColor: viewMode !== 'grid' ? "rgba(0,0,0,0.05)" : undefined }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid-3x3-gap" viewBox="0 0 16 16">
                                <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"/>
                            </svg>
                        </motion.button>
                    </motion.div>
                </div>
                
                {/* List/Grid View */}
                <AnimatePresence mode="wait">
                    {viewMode === 'list' ? (
                        <motion.div
                            key="list-view"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <PantryItemsTable
                                items={pantryItems}
                                isLoading={isLoading}
                                error={error}
                                filteredItems={filteredItems}
                                containerVariants={containerVariants}
                                itemVariants={itemVariants}
                                formatItemTypeLabel={formatItemTypeLabel}
                                getItemIcon={getItemIcon}
                                onUpdateQuantity={handleUpdateQuantity}
                                onDeleteItem={handleDeleteItem}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid-view"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <PantryItemsGrid
                                filteredItems={filteredItems}
                                searchTerm={searchTerm}
                                onClearSearch={clearSearch}
                                containerVariants={containerVariants}
                                itemVariants={itemVariants}
                                formatItemTypeLabel={formatItemTypeLabel}
                                getItemIcon={getItemIcon}
                                onUpdateQuantity={handleUpdateQuantity}
                                onDeleteItem={handleDeleteItem}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default PantryPage;
