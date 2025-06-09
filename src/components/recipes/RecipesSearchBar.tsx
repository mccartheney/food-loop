'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiSearch, FiFilter, FiX, FiClock, FiUsers, FiZap } from 'react-icons/fi';
import styles from '../../app/app/recipes/styles.module.css';

interface RecipesSearchBarProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: SearchFilters) => void;
}

interface SearchFilters {
  categories: string[];
  difficulty: string[];
  cookTime: string[];
  servings: string[];
}

const RecipesSearchBar: React.FC<RecipesSearchBarProps> = ({
  onSearch,
  onFilterChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<SearchFilters>({
    categories: [],
    difficulty: [],
    cookTime: [],
    servings: []
  });

  const categories = [
    'Pequeno-almoço', 'Almoço', 'Jantar', 'Sobremesa', 'Lanche',
    'Entrada', 'Prato Principal', 'Acompanhamento', 'Bebida', 'Sopa'
  ];

  const difficulties = [
    { label: 'Fácil', value: 'easy', color: '#10b981' },
    { label: 'Médio', value: 'medium', color: '#f59e0b' },
    { label: 'Difícil', value: 'hard', color: '#ef4444' }
  ];

  const cookTimes = [
    '< 15 min', '15-30 min', '30-60 min', '1-2 horas', '> 2 horas'
  ];

  const servings = [
    '1-2 pessoas', '3-4 pessoas', '5-6 pessoas', '7+ pessoas'
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const toggleFilter = (type: keyof SearchFilters, value: string) => {
    const newFilters = { ...activeFilters };
    const currentFilters = newFilters[type];
    
    if (currentFilters.includes(value)) {
      newFilters[type] = currentFilters.filter(f => f !== value);
    } else {
      newFilters[type] = [...currentFilters, value];
    }
    
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      categories: [],
      difficulty: [],
      cookTime: [],
      servings: []
    };
    setActiveFilters(emptyFilters);
    onFilterChange?.(emptyFilters);
  };

  const hasActiveFilters = Object.values(activeFilters).some(arr => arr.length > 0);

  return (
    <motion.div 
      className={styles.searchContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Search Bar */}
      <div className="relative">
        <FiSearch 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
          size={20} 
        />
        <motion.input
          type="text"
          placeholder="Buscar receitas por nome, ingrediente ou categoria..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className={styles.searchInput}
          whileFocus={{ scale: 1.02 }}
        />
        
        {/* Filter Toggle Button */}
        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-300 ${
            showFilters || hasActiveFilters 
              ? 'bg-purple-500 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiFilter size={18} />
        </motion.button>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div 
          className="flex flex-wrap gap-2 mt-3"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {Object.entries(activeFilters).map(([type, filters]) =>
            filters.map((filter: string) => (
              <motion.span
                key={`${type}-${filter}`}
                className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                {filter}
                <button
                  onClick={() => toggleFilter(type as keyof SearchFilters, filter)}
                  className="hover:bg-purple-200 rounded-full p-0.5"
                >
                  <FiX size={14} />
                </button>
              </motion.span>
            ))
          )}
          
          <motion.button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
            whileHover={{ scale: 1.05 }}
          >
            Limpar filtros
          </motion.button>
        </motion.div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <motion.div 
          className="mt-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Categories */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FiSearch size={16} />
              Categorias
            </h4>
            <div className={styles.filterContainer}>
              {categories.map(category => (
                <motion.button
                  key={category}
                  onClick={() => toggleFilter('categories', category)}
                  className={`${styles.filterChip} ${
                    activeFilters.categories.includes(category) ? styles.active : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FiZap size={16} />
              Dificuldade
            </h4>
            <div className={styles.filterContainer}>
              {difficulties.map(diff => (
                <motion.button
                  key={diff.value}
                  onClick={() => toggleFilter('difficulty', diff.value)}
                  className={`${styles.filterChip} ${
                    activeFilters.difficulty.includes(diff.value) ? styles.active : ''
                  }`}
                  style={{
                    borderColor: activeFilters.difficulty.includes(diff.value) ? diff.color : undefined,
                    color: activeFilters.difficulty.includes(diff.value) ? 'white' : diff.color,
                    background: activeFilters.difficulty.includes(diff.value) ? diff.color : undefined
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {diff.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Cook Time */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FiClock size={16} />
              Tempo de Preparo
            </h4>
            <div className={styles.filterContainer}>
              {cookTimes.map(time => (
                <motion.button
                  key={time}
                  onClick={() => toggleFilter('cookTime', time)}
                  className={`${styles.filterChip} ${
                    activeFilters.cookTime.includes(time) ? styles.active : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {time}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Servings */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FiUsers size={16} />
              Porções
            </h4>
            <div className={styles.filterContainer}>
              {servings.map(serving => (
                <motion.button
                  key={serving}
                  onClick={() => toggleFilter('servings', serving)}
                  className={`${styles.filterChip} ${
                    activeFilters.servings.includes(serving) ? styles.active : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {serving}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Search Suggestions */}
      {!searchQuery && !showFilters && (
        <motion.div 
          className="mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-gray-500 mb-2">Sugestões populares:</p>
          <div className="flex flex-wrap gap-2">
            {['Massa', 'Frango', 'Vegetariano', 'Sobremesa', 'Rápido'].map(suggestion => (
              <motion.button
                key={suggestion}
                onClick={() => handleSearch(suggestion)}
                className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RecipesSearchBar;
