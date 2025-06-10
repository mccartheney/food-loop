'use client';

import { motion } from 'framer-motion';
import { FormEvent } from 'react';
import { FiSearch, FiX, FiFilter, FiShoppingBag } from 'react-icons/fi';
import styles from '../../app/app/marketplace/styles.module.css';

interface MarketplaceSearchBarProps {
  searchTerm: string;
  searchCategory: 'all' | 'name' | 'location';
  onSearchTermChange: (term: string) => void;
  onSearchCategoryChange: (category: 'all' | 'name' | 'location') => void;
  onClearSearch: () => void;
  onSearch: (e: FormEvent) => void;
  totalProducts: number;
  filteredCount: number;
}

const MarketplaceSearchBar: React.FC<MarketplaceSearchBarProps> = ({
  searchTerm,
  searchCategory,
  onSearchTermChange,
  onSearchCategoryChange,
  onClearSearch,
  onSearch,
  totalProducts,
  filteredCount
}) => {
  return (
    <motion.div 
      className={`${styles.searchContainer} rounded-2xl p-6 mb-6`}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      {/* Search Header */}
      <motion.div 
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <FiSearch className="text-blue-500" size={24} />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Find Products</h2>
            <p className="text-sm text-gray-600">
              {searchTerm ? (
                <>
                  Showing <span className="font-semibold text-blue-600">{filteredCount}</span> of {totalProducts} products
                </>
              ) : (
                <>
                  Explore <span className="font-semibold text-blue-600">{totalProducts}</span> available products
                </>
              )}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <motion.div 
          className="hidden md:flex items-center gap-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
            <FiShoppingBag size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-700">{totalProducts} products</span>
          </div>
          {searchTerm && (
            <motion.div 
              className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <FiFilter size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-700">{filteredCount} filtered</span>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Search Form */}
      <motion.form 
        onSubmit={onSearch} 
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <motion.input
              type="text"
              placeholder="Search by product, location..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              className={`${styles.searchEnhanced} w-full pl-12 pr-12 py-3 rounded-xl text-gray-800 placeholder-gray-500`}
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
            
            {/* Search Icon */}
            <motion.div 
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              whileHover={{ scale: 1.1 }}
            >
              <FiSearch className="text-gray-400" size={20} />
            </motion.div>

            {/* Clear Button */}
            {searchTerm && (
              <motion.button
                type="button"
                onClick={onClearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <FiX size={20} />
              </motion.button>
            )}
          </div>

          {/* Category Filter */}
          <motion.div 
            className="md:w-48"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <select
              value={searchCategory}
              onChange={(e) => onSearchCategoryChange(e.target.value as 'all' | 'name' | 'location')}
              className="select select-bordered w-full bg-white border-2 border-blue-200 focus:border-blue-500 rounded-xl"
            >
              <option value="all">Search everything</option>
              <option value="name">Products only</option>
              <option value="location">Locations only</option>
            </select>
          </motion.div>

          {/* Search Button */}
          <motion.button
            type="submit"
            className="btn btn-primary px-8 rounded-xl"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)" 
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FiSearch className="mr-2" />
            Search
          </motion.button>
        </div>

        {/* Search Suggestions */}
        {!searchTerm && (
          <motion.div 
            className="flex flex-wrap gap-2 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-sm text-gray-600 mr-2">Popular:</span>
            {['Rice', 'Beans', 'Pasta', 'Tomatoes', 'Cheese'].map((suggestion, index) => (
              <motion.button
                key={suggestion}
                type="button"
                onClick={() => onSearchTermChange(suggestion)}
                className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {suggestion}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Active Search Info */}
        {searchTerm && (
          <motion.div 
            className="flex items-center justify-between bg-blue-50 rounded-lg p-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <FiFilter className="text-blue-600" size={16} />
              <span className="text-sm text-blue-700">
                Searching for "<span className="font-semibold">{searchTerm}</span>" 
                {searchCategory !== 'all' && (
                  <> in {searchCategory === 'name' ? 'products' : 'locations'}</>
                )}
              </span>
            </div>
            
            <motion.button
              type="button"
              onClick={onClearSearch}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear filter
            </motion.button>
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
};

export default MarketplaceSearchBar;