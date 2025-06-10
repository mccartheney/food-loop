'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import { Product } from '@/app/app/marketplace/page';
import { FiShoppingBag, FiSearch, FiX } from 'react-icons/fi';

interface ProductGridProps {
  products: Product[];
  onProductClick?: (productId: string) => void;
  searchTerm?: string;
  onClearSearch?: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onProductClick, 
  searchTerm,
  onClearSearch 
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    }
  };

  if (products.length === 0) {
    return (
      <motion.div 
        className="col-span-full py-12 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {searchTerm ? (
          // No search results
          <div className="card bg-base-200 p-8 max-w-md mx-auto">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <FiSearch size={48} className="mx-auto mb-4 text-neutral-content opacity-50" />
            </motion.div>
            <motion.p 
              className="text-lg text-neutral-content opacity-70 mb-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 0.7 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              No products found
            </motion.p>
            <motion.p 
              className="text-sm text-neutral-content opacity-60 mb-4"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Try adjusting your search or browse by categories
            </motion.p>
            {onClearSearch && (
              <motion.button 
                className="btn btn-sm btn-outline"
                onClick={onClearSearch}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <FiX className="mr-2" /> Clear Search
              </motion.button>
            )}
          </div>
        ) : (
          // No products at all
          <div className="card bg-base-200 p-8 max-w-md mx-auto">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <FiShoppingBag size={48} className="mx-auto mb-4 text-neutral-content opacity-50" />
            </motion.div>
            <motion.p 
              className="text-lg text-neutral-content opacity-70 mb-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 0.7 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              No products available
            </motion.p>
            <motion.p 
              className="text-sm text-neutral-content opacity-60"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Products will be displayed here when available
            </motion.p>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            layout
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <ProductCard 
              product={product} 
              onClick={() => onProductClick && onProductClick(product.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductGrid;