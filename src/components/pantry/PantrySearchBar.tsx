'use client';

import { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiX, FiFilter } from 'react-icons/fi';
import styles from '../../app/app/pantry/styles.module.css';

interface PantrySearchBarProps {
  searchTerm: string;
  searchCategory: 'all' | 'name' | 'type';
  onSearchTermChange: (value: string) => void;
  onSearchCategoryChange: (value: 'all' | 'name' | 'type') => void;
  onClearSearch: () => void;
  onSearch: (e: FormEvent) => void;
  totalItems: number;
  filteredCount: number;
}

export default function PantrySearchBar({
  searchTerm,
  searchCategory,
  onSearchTermChange,
  onSearchCategoryChange,
  onClearSearch,
  onSearch,
  totalItems,
  filteredCount,
}: PantrySearchBarProps) {
  return (
    <motion.div
      className={`${styles.searchContainer} rounded-2xl p-6 mb-6`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Form */}
        <form onSubmit={onSearch} className="flex-1 flex gap-3">
          <div className="flex-1 relative">
            <motion.div 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <FiSearch size={20} className="text-gray-400" />
            </motion.div>
            
            <input
              type="text"
              placeholder="Search by name, type or expiry..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              className={`${styles.searchInput} w-full pl-12 pr-12 py-3 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none`}
            />
            
            {searchTerm && (
              <motion.button
                type="button"
                onClick={onClearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <FiX size={20} />
              </motion.button>
            )}
          </div>
          
          <motion.button
            type="submit"
            className={`${styles.primaryButton} px-6 py-3 rounded-xl flex items-center gap-2`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiSearch size={18} />
            <span className="hidden sm:inline font-medium">Search</span>
          </motion.button>
        </form>
        
        {/* Category Filter */}
        <div className="flex items-center gap-3">
          <motion.div 
            className="flex items-center gap-2 text-gray-600"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <FiFilter size={16} />
            <span className="text-sm font-medium whitespace-nowrap">Filter by:</span>
          </motion.div>
          
          <motion.select
            value={searchCategory}
            onChange={(e) => onSearchCategoryChange(e.target.value as 'all' | 'name' | 'type')}
            className={`${styles.categoryFilter} px-4 py-2 rounded-xl text-sm font-medium focus:outline-none`}
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
          >
            <option value="all">All Fields</option>
            <option value="name">Name</option>
            <option value="type">Type</option>
          </motion.select>
        </div>
      </div>
      
      {/* Search Results Summary */}
      <motion.div
        className="mt-4 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="text-sm text-gray-600">
          {searchTerm ? (
            <span>
              Showing <span className="font-semibold text-green-600">{filteredCount}</span> of{' '}
              <span className="font-semibold">{totalItems}</span> items
              <span className="ml-2">
                for "<span className="font-medium text-gray-800">{searchTerm}</span>"
                {searchCategory !== 'all' && (
                  <span className="text-gray-500"> in {
                    searchCategory === 'name' ? 'name' : 
                    searchCategory === 'type' ? 'type' : searchCategory
                  }</span>
                )}
              </span>
            </span>
          ) : (
            <span>
              Displaying all <span className="font-semibold text-blue-600">{totalItems}</span> items in your pantry
            </span>
          )}
        </div>
        
        {/* Quick filter badges */}
        {!searchTerm && (
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => onSearchTermChange('expired')}
              className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Expired
            </motion.button>
            <motion.button
              onClick={() => onSearchTermChange('7 days')}
              className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Expiring Soon
            </motion.button>
          </div>
        )}
      </motion.div>
      
      {/* Advanced Search Hint */}
      {!searchTerm && (
        <motion.div
          className="mt-3 text-xs text-gray-400 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span>💡 Tip: Use terms like "expired", "7 days", "meat" or specific names</span>
        </motion.div>
      )}
    </motion.div>
  );
}