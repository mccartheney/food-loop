'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/app/app/marketplace/page';
import { FiMapPin, FiShoppingCart, FiHeart, FiSearch, FiX, FiDollarSign, FiStar } from 'react-icons/fi';
import styles from '../../app/app/marketplace/styles.module.css';

interface MarketplaceListViewProps {
  products: Product[];
  onProductClick?: (productId: string) => void;
  searchTerm?: string;
  onClearSearch?: () => void;
}

const MarketplaceListView: React.FC<MarketplaceListViewProps> = ({ 
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
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0, x: -20 },
    visible: { 
      y: 0, 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    }
  };

  const getPriceCategory = (price: string) => {
    const priceValue = parseFloat(price);
    if (priceValue <= 2) return { color: 'badge-success', label: 'Económico', bgColor: 'bg-green-50' };
    if (priceValue <= 4) return { color: 'badge-warning', label: 'Médio', bgColor: 'bg-yellow-50' };
    return { color: 'badge-error', label: 'Premium', bgColor: 'bg-purple-50' };
  };

  if (products.length === 0) {
    return (
      <motion.div 
        className="py-12 text-center"
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
              Nenhum produto encontrado
            </motion.p>
            <motion.p 
              className="text-sm text-neutral-content opacity-60 mb-4"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Tente ajustar sua pesquisa ou navegue por categorias
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
                <FiX className="mr-2" /> Limpar Pesquisa
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
              <FiShoppingCart size={48} className="mx-auto mb-4 text-neutral-content opacity-50" />
            </motion.div>
            <motion.p 
              className="text-lg text-neutral-content opacity-70 mb-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 0.7 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Nenhum produto disponível
            </motion.p>
            <motion.p 
              className="text-sm text-neutral-content opacity-60"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Produtos serão exibidos aqui quando estiverem disponíveis
            </motion.p>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {products.map((product) => {
          const priceCategory = getPriceCategory(product.price);
          
          return (
            <motion.div
              key={product.id}
              variants={itemVariants}
              layout
              className={`card ${styles.productCard} shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden`}
              onClick={() => onProductClick && onProductClick(product.id)}
              whileHover={{ 
                y: -2, 
                scale: 1.01,
                transition: { duration: 0.2 } 
              }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="card-body p-6">
                <div className="flex items-center gap-6">
                  {/* Product Image */}
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex-shrink-0 flex items-center justify-center relative overflow-hidden"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <FiShoppingCart className="text-gray-400" size={24} />
                    )}
                    
                    {/* Price Badge */}
                    <motion.div 
                      className="absolute -top-1 -right-1"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <span className={`badge ${priceCategory.color} badge-sm font-bold text-white`}>
                        €{product.price}
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <motion.h3 
                          className="text-xl font-bold text-gray-800 truncate mb-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {product.name}
                        </motion.h3>
                        
                        <motion.div 
                          className="flex items-center text-gray-600 mb-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4, duration: 0.3 }}
                        >
                          <FiMapPin className="mr-2 text-blue-500 flex-shrink-0" size={16} />
                          <span className="text-sm">{product.location}</span>
                        </motion.div>

                        {/* Category Badge */}
                        <motion.div 
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.3 }}
                        >
                          <span className={`badge badge-outline ${priceCategory.color.replace('badge-', 'badge-outline-')} text-xs`}>
                            {priceCategory.label}
                          </span>
                        </motion.div>
                      </div>

                      {/* Price and Actions */}
                      <div className="text-right flex-shrink-0">
                        <motion.div 
                          className="mb-3"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6, duration: 0.3 }}
                        >
                          <div className="text-sm text-gray-500 mb-1">Preço</div>
                          <div className="text-3xl font-bold text-primary">€{product.price}</div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div 
                          className="flex gap-2 justify-end"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7, duration: 0.3 }}
                        >
                          <motion.button 
                            className="btn btn-circle btn-sm bg-white border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle add to favorites
                            }}
                          >
                            <FiHeart size={16} />
                          </motion.button>
                          
                          <motion.button 
                            className="btn btn-circle btn-sm bg-blue-500 border-blue-500 text-white hover:bg-blue-600"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle add to cart
                            }}
                          >
                            <FiShoppingCart size={16} />
                          </motion.button>
                          
                          <motion.button 
                            className="btn btn-primary btn-sm px-4"
                            whileHover={{ 
                              scale: 1.05,
                              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onProductClick && onProductClick(product.id);
                            }}
                          >
                            Ver Detalhes
                          </motion.button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

export default MarketplaceListView;
