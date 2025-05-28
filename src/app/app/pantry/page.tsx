'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import { ItemType } from '@prisma/client'; // Prisma enum for item types
import { FiPlus, FiTrash2, FiPackage, FiAlertCircle, FiCheckCircle, FiLoader, FiLayers } from 'react-icons/fi';
import Image from 'next/image';
import { foodList } from '@/lib/foodList'; // Import the food list

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

    // Form state
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState<number | string>(1);
    const [itemExpireDate, setItemExpireDate] = useState('');
    const [itemType, setItemType] = useState<string>(Object.keys(ItemType)[0] || '');
    const [itemImg, setItemImg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmittingAll, setIsSubmittingAll] = useState(false); // New state for bulk add

    const userEmail = session?.user?.email;

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
            type: itemType, // This sends the enum key, e.g., "VEGETABLES"
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
            fetchPantryItems(); // Refresh list
            // Reset form
            setItemName('');
            setItemQuantity(1);
            setItemExpireDate('');
            setItemType(Object.keys(ItemType)[0] || '');
            setItemImg('');
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
            // img is optional and not present in foodList
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
            fetchPantryItems(); // Refresh list
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

    if (sessionStatus === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-8 text-center flex items-center justify-center">
                <FiPackage className="mr-3 text-primary" /> Your Digital Pantry
            </h1>

            {error && (
                <div role="alert" className="alert alert-error mb-6 shadow-lg">
                    <FiAlertCircle size={24} />
                    <div>
                        <h3 className="font-bold">Error!</h3>
                        <div className="text-xs">{error}</div>
                    </div>
                    <button className="btn btn-sm btn-ghost" onClick={() => setError(null)}>Dismiss</button>
                </div>
            )}
            {successMessage && (
                <div role="alert" className="alert alert-success mb-6 shadow-lg">
                    <FiCheckCircle size={24} />
                    <div>
                        <h3 className="font-bold">Success!</h3>
                        <div className="text-xs">{successMessage}</div>
                    </div>
                    <button className="btn btn-sm btn-ghost" onClick={() => setSuccessMessage(null)}>Dismiss</button>
                </div>
            )}

            {/* Add Item Form */}
            <div className="card bg-base-200 shadow-xl p-6 mb-10">
                <h2 className="text-2xl font-semibold mb-6 card-title">
                    <FiPlus className="mr-2" /> Add New Item
                </h2>
                <form onSubmit={handleAddItem} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Item Name</span></label>
                            <input type="text" placeholder="e.g., Apples" value={itemName} onChange={(e) => setItemName(e.target.value)} className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Quantity</span></label>
                            <input type="number" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value === '' ? '' : Number(e.target.value))} min="1" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Expiration Date</span></label>
                            <input type="text" placeholder="YYYY-MM-DD or N/A" value={itemExpireDate} onChange={(e) => setItemExpireDate(e.target.value)} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Item Type</span></label>
                            <select value={itemType} onChange={(e) => setItemType(e.target.value)} className="select select-bordered w-full" required>
                                {Object.keys(ItemType).map(key => (
                                    <option key={key} value={key}>{formatItemTypeLabel(key)}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Image URL (Optional)</span></label>
                        <input type="url" placeholder="https://example.com/image.png" value={itemImg} onChange={(e) => setItemImg(e.target.value)} className="input input-bordered w-full" />
                    </div>
                    <div className="card-actions justify-end">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting || sessionStatus !== 'authenticated'}>
                            {isSubmitting ? <span className="loading loading-spinner loading-xs"></span> : <FiPlus />}
                            Add Item
                        </button>
                    </div>
                </form>
            </div>

            {/* Pantry Items List */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Your Items</h2>
                    {foodList && foodList.length > 0 && (
                        <button
                            onClick={handleAddAllItems}
                            className="btn btn-secondary btn-sm"
                            disabled={isSubmitting || isSubmittingAll || sessionStatus !== 'authenticated'}
                            title="Adds a predefined list of demo items to your pantry"
                        >
                            {isSubmittingAll ? <span className="loading loading-spinner loading-xs"></span> : <FiLayers className="mr-1" />}
                            Add Demo Items
                        </button>
                    )}
                </div>
                {isLoading && !pantryItems.length ? (
                    <div className="flex justify-center items-center py-10">
                        <FiLoader className="animate-spin text-4xl text-primary" />
                        <p className="ml-3">Loading your pantry items...</p>
                    </div>
                ) : !pantryItems.length && !error ? (
                    <div className="text-center py-10 card bg-base-200 p-6">
                        <FiPackage size={48} className="mx-auto mb-4 text-neutral-content opacity-50" />
                        <p className="text-lg text-neutral-content opacity-70">Your pantry is currently empty.</p>
                        <p className="text-sm text-neutral-content opacity-60">Use the form above to add your first item!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {pantryItems.map(item => (
                            <div key={item.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                {item.img && (
                                    <figure className="h-48 overflow-hidden relative">
                                        <Image src={item.img} alt={item.name} layout="fill" objectFit="cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                                    </figure>
                                )}
                                <div className="card-body p-5">
                                    <h3 className="card-title text-lg truncate" title={item.name}>{item.name}</h3>
                                    <p className="text-sm"><span className="font-semibold">Quantity:</span> {item.quantity}</p>
                                    <p className="text-sm"><span className="font-semibold">Type:</span> {formatItemTypeLabel(item.type)}</p>
                                    <p className={`text-sm ${item.expire_date === 'N/A' || new Date(item.expire_date) > new Date() ? '' : 'text-error font-semibold'}`}>
                                        <span className="font-semibold">Expires:</span> {item.expire_date}
                                    </p>
                                    <p className="text-xs text-gray-500"><span className="font-semibold">Added:</span> {item.dateBought}</p>
                                    <div className="card-actions justify-end mt-4">
                                        <button onClick={() => handleDeleteItem(item.id)} className="btn btn-error btn-sm btn-outline" aria-label={`Delete ${item.name}`}>
                                            <FiTrash2 /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PantryPage;
