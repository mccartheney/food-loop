'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiMapPin, FiDollarSign, FiTag, FiTrendingUp } from 'react-icons/fi';
import styles from '../../app/app/marketplace/styles.module.css';

interface MarketplaceSidebarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  onCategoryFilter?: (categories: string[]) => void;
  onPriceFilter?: (min: number, max: number) => void;
  onLocationFilter?: (locations: string[]) => void;
}

const MarketplaceSidebar: React.FC<MarketplaceSidebarProps> = ({
  searchQuery,
  onSearch,
  onCategoryFilter,
  onPriceFilter,
  onLocationFilter,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10 });
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const categories = [
    { name: 'Beans', icon: '🫘', count: 3 },
    { name: 'Pasta', icon: '🍝', count: 2 },
    { name: 'Rice', icon: '🍚', count: 5 },
    { name: 'Spices', icon: '🌶️', count: 2 },
    { name: 'Flour', icon: '🌾', count: 1 },
    { name: 'Oils', icon: '🫒', count: 2 },
    { name: 'Sauces', icon: '🥫', count: 3 },
    { name: 'Meats', icon: '🥩', count: 1 },
    { name: 'Dairy', icon: '🥛', count: 2 },
    { name: 'Fruits', icon: '🍎', count: 4 },
    { name: 'Vegetables', icon: '🥬', count: 6 },
    { name: 'Snacks', icon: '🍿', count: 3 }
  ];

  const locations = [
    { name: 'Yours', count: 16 },
    { name: 'Nearby', count: 8 },
    { name: 'Downtown', count: 5 },
    { name: 'North Area', count: 3 }
  ];

  const handleCategoryChange = (category: string) => {
    const newSelected = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newSelected);
    onCategoryFilter?.(newSelected);
  };

  const handleLocationChange = (location: string) => {
    const newSelected = selectedLocations.includes(location)
      ? selectedLocations.filter(l => l !== location)
      : [...selectedLocations, location];
    
    setSelectedLocations(newSelected);
    onLocationFilter?.(newSelected);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLocations([]);
    setPriceRange({ min: 0, max: 10 });
    onCategoryFilter?.([]);
    onLocationFilter?.([]);
    onPriceFilter?.(0, 10);
  };

  return (
    <motion.div 
      className={`${styles.filterSidebar} p-6 rounded-xl shadow-lg h-fit sticky top-4`}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="font-bold text-lg flex items-center">
          <FiFilter className="mr-2 text-primary" />
          Filtros
        </h3>
        {(selectedCategories.length > 0 || selectedLocations.length > 0) && (
          <motion.button
            onClick={clearAllFilters}
            className="text-xs text-red-500 hover:text-red-600 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Limpar Tudo
          </motion.button>
        )}
      </motion.div>

      {/* Search */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="label">
          <span className="label-text font-medium flex items-center">
            <FiSearch className="mr-2 text-blue-500" />
            Busca Rápida
          </span>
        </label>
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          className={`input input-bordered w-full ${styles.searchEnhanced}`}
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
        />
      </motion.div>

      {/* Price Range */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <label className="label">
          <span className="label-text font-medium flex items-center">
            <FiDollarSign className="mr-2 text-green-500" />
            Faixa de Preço
          </span>
        </label>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              className="input input-bordered input-sm flex-1"
              value={priceRange.min}
              onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max"
              className="input input-bordered input-sm flex-1"
              value={priceRange.max}
              onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
            />
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-500">€{priceRange.min} - €{priceRange.max}</span>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <label className="label">
          <span className="label-text font-medium flex items-center">
            <FiTag className="mr-2 text-purple-500" />
            Categorias
          </span>
        </label>
        <div className={`space-y-2 max-h-64 overflow-y-auto ${styles.customScrollbar}`}>
          <AnimatePresence>
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
              >
                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-sm checkbox-primary" 
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCategoryChange(category.name)}
                  />
                  <span className="text-lg">{category.icon}</span>
                  <div className="flex-1">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-xs text-gray-500 ml-1">({category.count})</span>
                  </div>
                </label>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Locations */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <label className="label">
          <span className="label-text font-medium flex items-center">
            <FiMapPin className="mr-2 text-red-500" />
            Localizações
          </span>
        </label>
        <div className="space-y-2">
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
                <input 
                  type="checkbox" 
                  className="checkbox checkbox-sm checkbox-primary" 
                  checked={selectedLocations.includes(location.name)}
                  onChange={() => handleLocationChange(location.name)}
                />
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm font-medium">{location.name}</span>
                  <span className="badge badge-outline badge-sm">{location.count}</span>
                </div>
              </label>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Popular Searches */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <label className="label">
          <span className="label-text font-medium flex items-center">
            <FiTrendingUp className="mr-2 text-orange-500" />
            Populares
          </span>
        </label>
        <div className="flex flex-wrap gap-2">
          {['Rice', 'Beans', 'Pasta'].map((term, index) => (
            <motion.button
              key={term}
              onClick={() => onSearch(term)}
              className={`${styles.categoryChip} px-3 py-1 rounded-full text-xs font-medium`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {term}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MarketplaceSidebar;
