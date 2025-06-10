'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, FormEvent, useRef, useEffect } from 'react';
import { FiSearch, FiX, FiPackage, FiBookOpen, FiBox, FiClock, FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useSearch, SearchResult } from '@/lib/hooks/useSearch';
import SearchResults from './SearchResults';
import styles from '../../app/app/styles.module.css';

const DashboardSearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState<'all' | 'pantry' | 'recipes' | 'boxes' | 'history'>('all');
  const [showResults, setShowResults] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Use the search hook
  const { results, loading, error, hasResults } = useSearch(searchTerm, {
    category: searchCategory,
    minLength: 2,
    debounceMs: 300
  });

  // Show results when we have a search term and either results or are loading
  useEffect(() => {
    setShowResults(searchTerm.length >= 2 && isInputFocused && (hasResults || loading || error !== null));
  }, [searchTerm, hasResults, loading, error, isInputFocused]);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setIsInputFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    // Hide results and navigate based on category
    setShowResults(false);
    setIsInputFocused(false);

    switch (searchCategory) {
      case 'pantry':
        router.push(`/app/pantry?search=${encodeURIComponent(searchTerm)}`);
        break;
      case 'recipes':
        router.push(`/app/recipes?search=${encodeURIComponent(searchTerm)}`);
        break;
      case 'boxes':
        // Navigate to boxes section when available
        console.log('Search boxes:', searchTerm);
        break;
      case 'history':
        // Navigate to history section when available
        console.log('Search history:', searchTerm);
        break;
      default:
        // If we have results, navigate to the first one or show all results
        if (results.length > 0) {
          const firstResult = results[0];
          if (firstResult.type === 'recipe') {
            router.push(`/app/recipes?search=${encodeURIComponent(searchTerm)}`);
          } else {
            router.push(`/app/pantry?search=${encodeURIComponent(searchTerm)}`);
          }
        }
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setShowResults(false);
    setIsInputFocused(false);
    setSearchTerm(''); // Clear search after clicking result
  };

  const handleSeeMore = (type: 'recipe' | 'pantry_item') => {
    setShowResults(false);
    setIsInputFocused(false);
    
    if (type === 'recipe') {
      router.push(`/app/recipes?search=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push(`/app/pantry?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    if (searchTerm.length >= 2) {
      setShowResults(true);
    }
  };

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
    if (value.length >= 2) {
      setIsInputFocused(true);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const quickActions = [
    {
      label: 'Adicionar Item',
      icon: FiPlus,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: () => router.push('/app/add')
    },
    {
      label: 'Ver Despensa',
      icon: FiPackage,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: () => router.push('/app/pantry')
    },
    {
      label: 'Explorar Receitas',
      icon: FiBookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      action: () => router.push('/app/recipes')
    },
    {
      label: 'Marketplace',
      icon: FiBox,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      action: () => router.push('/app/marketplace')
    }
  ];

  const searchSuggestions = ['Arroz', 'Feijão', 'Massa', 'Tomate', 'Receita de Pasta'];

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
            <h2 className="text-xl font-bold text-gray-800">Busca Rápida</h2>
            <p className="text-sm text-gray-600">
              Encontre itens, receitas e muito mais
            </p>
          </div>
        </div>

        {/* Quick Actions Desktop */}
        <motion.div 
          className="hidden md:flex items-center gap-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {quickActions.slice(0, 2).map((action, index) => (
            <motion.button
              key={action.label}
              className={`${action.bgColor} ${action.color} px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.action}
            >
              <action.icon size={14} />
              {action.label}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Search Form */}
      <motion.form 
        onSubmit={handleSearch} 
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative" ref={searchContainerRef}>
            <motion.input
              type="text"
              placeholder="Pesquisar receitas e ingredientes..."
              value={searchTerm}
              onChange={(e) => handleSearchTermChange(e.target.value)}
              onFocus={handleInputFocus}
              className={`${styles.searchEnhanced} w-full pl-12 pr-12 py-3 rounded-xl text-gray-800 placeholder-gray-500 ${showResults ? 'rounded-b-none border-b-0' : ''}`}
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
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <FiX size={20} />
              </motion.button>
            )}

            {/* Search Results */}
            <AnimatePresence>
              {showResults && (
                <SearchResults
                  results={results}
                  loading={loading}
                  error={error}
                  query={searchTerm}
                  onResultClick={handleResultClick}
                  onSeeMore={handleSeeMore}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Category Filter */}
          <motion.div 
            className="md:w-48"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value as any)}
              className="select select-bordered w-full bg-white border-2 border-blue-200 focus:border-blue-500 rounded-xl"
            >
              <option value="all">Buscar em tudo</option>
              <option value="pantry">Apenas despensa</option>
              <option value="recipes">Apenas receitas</option>
              <option value="history">Apenas histórico</option>
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
            Buscar
          </motion.button>
        </div>

        {/* Search Suggestions */}
        {!searchTerm && !showResults && (
          <motion.div 
            className="flex flex-wrap gap-2 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-sm text-gray-600 mr-2">Populares:</span>
            {searchSuggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                type="button"
                onClick={() => handleSearchTermChange(suggestion)}
                className={`px-3 py-1 ${styles.actionChip} rounded-full text-sm transition-colors`}
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
              <FiSearch className="text-blue-600" size={16} />
              <span className="text-sm text-blue-700">
                Buscando por "<span className="font-semibold">{searchTerm}</span>" 
                {searchCategory !== 'all' && (
                  <> em {searchCategory}</>
                )}
              </span>
            </div>
            
            <motion.button
              type="button"
              onClick={clearSearch}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Limpar
            </motion.button>
          </motion.div>
        )}
      </motion.form>

      {/* Quick Actions Mobile/All */}
      <motion.div 
        className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {quickActions.map((action, index) => (
          <motion.button
            key={action.label}
            className={`${styles.dashboardCard} p-4 rounded-xl flex flex-col items-center gap-2 text-center transition-all`}
            whileHover={{ 
              scale: 1.05,
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            onClick={action.action}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 + index * 0.1, duration: 0.3 }}
          >
            <div className={`${action.bgColor} ${action.color} w-10 h-10 rounded-full flex items-center justify-center`}>
              <action.icon size={20} />
            </div>
            <span className="text-sm font-medium text-gray-700">{action.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default DashboardSearchBar;
