'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiMessageCircle, FiShare2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdLocationOn } from 'react-icons/md';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProductGrid from '@/components/marketplace/ProductGrid';

interface ProductImage {
  id: string;
  url: string;
}

interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  joinedDate: string;
  responseRate: number;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  condition: string;
  category: string;
  location: string;
  postedTime: string;
  images: ProductImage[];
  seller: Seller;
}

// Mock data for the single product
const MOCK_PRODUCT: Product = {
  id: 'product-1',
  title: 'Fresh Organic Rice - Locally Grown',
  description: 'Delicious, organic rice sourced from local farms. Perfect for any meal and sustainably grown without chemicals or pesticides. This batch was recently harvested and is in excellent condition. Sold by weight, minimum purchase 2kg.',
  price: '3.99',
  condition: 'New',
  category: 'Food & Groceries',
  location: 'Lisbon, Portugal',
  postedTime: '2 days ago',
  images: [
    { id: 'img-1', url: '/images/marketplace/rice.jpg' },
    { id: 'img-2', url: '/images/marketplace/rice-2.jpg' },
    { id: 'img-3', url: '/images/marketplace/rice-3.jpg' },
    { id: 'img-4', url: '/images/marketplace/rice-4.jpg' },
  ],
  seller: {
    id: 'seller-1',
    name: 'Maria Silva',
    avatar: '/avatars/user2.png',
    rating: 4.8,
    joinedDate: 'January 2023',
    responseRate: 95
  }
};

// Mock related products
const MOCK_RELATED_PRODUCTS = Array(4).fill(null).map((_, index) => ({
  id: `related-${index + 1}`,
  name: index % 2 === 0 ? 'Organic Rice' : 'Brown Rice',
  location: 'Nearby',
  price: (Math.floor(Math.random() * 5) + 1).toFixed(2),
  imageUrl: '/images/marketplace/rice.jpg',
}));

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  useEffect(() => {
    // Simulate fetching product data
    setLoading(true);
    setTimeout(() => {
      setProduct(MOCK_PRODUCT);
      setRelatedProducts(MOCK_RELATED_PRODUCTS);
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? (product?.images.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === (product?.images.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleSaveClick = () => {
    setIsSaved(prev => !prev);
  };

  const handleContactSellerClick = () => {
    setShowContactInfo(prev => !prev);
  };

  const handleBackClick = () => {
    router.back();
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!product) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-xl font-bold mb-4">Product not found</h2>
          <button 
            className="btn btn-primary" 
            onClick={handleBackClick}
          >
            Back to Marketplace
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="px-4 py-2 max-w-7xl mx-auto">
        {/* Back button - Mobile */}
        <div className="md:hidden mb-4">
          <button 
            className="btn btn-ghost btn-sm px-0" 
            onClick={handleBackClick}
          >
            <FiChevronLeft size={20} /> Back to results
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - Product Images */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Back button - Desktop */}
              <div className="hidden md:block p-4 border-b">
                <button 
                  className="btn btn-ghost btn-sm px-0" 
                  onClick={handleBackClick}
                >
                  <FiChevronLeft size={20} /> Back to results
                </button>
              </div>

              {/* Main image carousel */}
              <div className="relative bg-gray-100 aspect-[4/3] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={product.images[currentImageIndex]?.url || '/images/placeholder.jpg'}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 66vw"
                      style={{ objectFit: 'contain' }}
                      className="w-full h-full"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation arrows */}
                {product.images.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevImage}
                      className="absolute left-4 p-2 bg-white/80 hover:bg-white rounded-full shadow-md z-10"
                    >
                      <FiChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={handleNextImage}
                      className="absolute right-4 p-2 bg-white/80 hover:bg-white rounded-full shadow-md z-10"
                    >
                      <FiChevronRight size={24} />
                    </button>
                  </>
                )}
                
                {/* Image indicators/thumbnails */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {product.images.map((_, index) => (
                      <button 
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          index === currentImageIndex ? 'bg-primary' : 'bg-gray-300'
                        }`}
                        onClick={() => handleThumbnailClick(index)}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Image thumbnails */}
              {product.images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <motion.button
                      key={image.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleThumbnailClick(index)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                        index === currentImageIndex 
                          ? 'border-primary' 
                          : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        sizes="80px"
                        style={{ objectFit: 'cover' }}
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Description */}
            <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Condition</p>
                  <p className="font-medium">{product.condition}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Category</p>
                  <p className="font-medium">{product.category}</p>
                </div>
              </div>
            </div>
            
            {/* Similar items */}
            <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Similar items</h2>
              <ProductGrid products={relatedProducts} />
            </div>
          </div>
          
          {/* Right column - Product info */}
          <div className="md:w-1/3">
            <div className="sticky top-4 space-y-4">
              {/* Product details */}
              <motion.div 
                className="bg-white rounded-xl shadow-sm p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-2xl font-bold">{product.title}</h1>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSaveClick}
                    className={`btn btn-circle btn-sm ${isSaved ? 'text-primary' : 'text-gray-400'}`}
                  >
                    <FiHeart size={20} className={isSaved ? 'fill-primary' : ''} />
                  </motion.button>
                </div>
                <div className="text-2xl font-bold text-primary mb-4">€{product.price} <span className="text-sm font-normal text-gray-500">per kg</span></div>
                
                <div className="flex items-center text-gray-600 mb-6">
                  <MdLocationOn size={18} />
                  <span className="ml-1">{product.location}</span>
                  <span className="mx-2">•</span>
                  <span>{product.postedTime}</span>
                </div>
                
                <div className="space-y-3">
                  <button 
                    onClick={handleContactSellerClick}
                    className="btn btn-primary w-full"
                  >
                    <FiMessageCircle size={18} /> Message Seller
                  </button>
                  
                  <button className="btn btn-outline w-full">
                    <FiShare2 size={18} /> Share
                  </button>
                </div>
                
                {/* Contact information - conditionally shown */}
                <AnimatePresence>
                  {showContactInfo && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t">
                        <h3 className="font-medium mb-2">Contact Information</h3>
                        <p className="text-sm">Email: maria.silva@example.com</p>
                        <p className="text-sm">Phone: +351 912 345 678</p>
                        <p className="text-sm text-gray-500 mt-2">Mention that you found this on Food Loop!</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Seller information */}
              <motion.div 
                className="bg-white rounded-xl shadow-sm p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h2 className="text-lg font-bold mb-4">Seller Information</h2>
                
                <Link href={`/app/profile/${product.seller.id}`}>
                  <div className="flex items-center mb-4">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center">
                        <div className="font-medium text-gray-500 text-lg">
                          {product.seller.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{product.seller.name}</div>
                      <div className="text-xs text-gray-500">Joined {product.seller.joinedDate}</div>
                    </div>
                  </div>
                </Link>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Rating</div>
                    <div className="font-medium flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      {product.seller.rating}/5.0
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Response Rate</div>
                    <div className="font-medium">{product.seller.responseRate}%</div>
                  </div>
                </div>
                
                <Link 
                  href={`/app/profile/${product.seller.id}`}
                  className="btn btn-sm btn-outline w-full mt-4"
                >
                  See Profile
                </Link>
              </motion.div>
              
              {/* Safety tips */}
              <motion.div 
                className="bg-white rounded-xl shadow-sm p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className="font-bold mb-3">Safety Tips</h3>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>Meet in a safe, public location</li>
                  <li>Check the item before buying</li>
                  <li>Pay only after inspecting the item</li>
                  <li>Never share financial information</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}