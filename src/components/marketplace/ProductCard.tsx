'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/app/app/marketplace/page';
import { FiMapPin, FiShoppingCart, FiHeart } from 'react-icons/fi';
import styles from '../../app/app/marketplace/styles.module.css';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  isFeatured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, isFeatured = false }) => {
  const priceValue = parseFloat(product.price);
  const getPriceCategory = () => {
    if (priceValue <= 2) return { color: 'badge-success', label: 'Económico' };
    if (priceValue <= 4) return { color: 'badge-warning', label: 'Médio' };
    return { color: 'badge-error', label: 'Premium' };
  };

  const priceCategory = getPriceCategory();

  return (
    <motion.div 
      className={`card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
        isFeatured ? styles.featuredCard : styles.productCard
      }`}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Product Image */}
      <motion.figure 
        className="relative h-48 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Image 
          src={product.imageUrl || '/images/placeholder-product.jpg'} 
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300"
        />
        
        {/* Price Badge */}
        <motion.div 
          className="absolute top-3 right-3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <span className={`badge ${priceCategory.color} font-bold text-white shadow-lg`}>
            €{product.price}
          </span>
        </motion.div>

        {/* Featured Badge */}
        {isFeatured && (
          <motion.div 
            className="absolute top-3 left-3"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <span className="badge badge-warning font-bold text-white shadow-lg">
              ⭐ Destaque
            </span>
          </motion.div>
        )}

        {/* Hover Actions */}
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
          whileHover={{ opacity: 1 }}
        >
          <div className="flex gap-2">
            <motion.button 
              className="btn btn-circle btn-sm bg-white text-gray-800 hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                // Handle add to cart
              }}
            >
              <FiShoppingCart size={16} />
            </motion.button>
            <motion.button 
              className="btn btn-circle btn-sm bg-red-500 text-white hover:bg-red-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                // Handle add to favorites
              }}
            >
              <FiHeart size={16} />
            </motion.button>
          </div>
        </motion.div>
      </motion.figure>

      {/* Product Info */}
      <div className="card-body p-4">
        <motion.div 
          className="flex items-start justify-between mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="card-title text-lg font-bold text-gray-800 line-clamp-1" title={product.name}>
            {product.name}
          </h3>
        </motion.div>

        {/* Location */}
        <motion.div 
          className="flex items-center text-gray-600 mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <FiMapPin className="mr-2 text-blue-500" size={14} />
          <span className="text-sm">{product.location}</span>
        </motion.div>

        {/* Price Category Info */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <span className={`badge badge-outline ${priceCategory.color.replace('badge-', 'badge-outline-')} text-xs`}>
            {priceCategory.label}
          </span>
          
          <div className="text-right">
            <div className="text-sm text-gray-500">Preço</div>
            <div className="text-xl font-bold text-primary">€{product.price}</div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div 
          className="card-actions justify-center mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <motion.button 
            className="btn btn-primary btn-sm w-full"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            Ver Detalhes
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
