import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiHeart, FiFilter, FiClock, FiStar, FiTrendingUp, FiUser } from 'react-icons/fi';
import styles from '../../app/app/recipes/styles.module.css';

interface RecipeSidebarProps {
  favorites: string[];
  onCategorySelect?: (category: string) => void;
  onDifficultySelect?: (difficulty: string) => void;
  onQuickFilterSelect?: (filter: string) => void;
  onCookTimeSelect?: (cookTime: string) => void;
  onServingsSelect?: (servings: string) => void;
  onSearchChange?: (search: string) => void;
  selectedCategories?: string[];
  selectedDifficulties?: string[];
  selectedQuickFilters?: string[];
  selectedCookTime?: string[];
  selectedServings?: string[];
}

const RecipeSidebar: React.FC<RecipeSidebarProps> = ({ 
  favorites,
  onCategorySelect,
  onDifficultySelect,
  onQuickFilterSelect,
  onCookTimeSelect,
  onServingsSelect,
  onSearchChange,
  selectedCategories = [],
  selectedDifficulties = [],
  selectedQuickFilters = [],
  selectedCookTime = [],
  selectedServings = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearchChange?.(value);
  };
  
  const quickFilters = [
    { icon: FiTrendingUp, label: 'Populares', value: 'popular', color: '#10b981' },
    { icon: FiClock, label: 'Rápidas', value: 'quick', color: '#f59e0b' },
    { icon: FiStar, label: 'Bem Avaliadas', value: 'top-rated', color: '#8b5cf6' },
    { icon: FiUser, label: 'Fáceis', value: 'easy', color: '#06b6d4' }
  ];

  const categories = [
    'Prato Principal', 'Sobremesa', 'Lanche', 'Sopa',
    'Entrada', 'Acompanhamento'
  ];

  const difficulties = [
    { label: 'Fácil', value: 'easy', color: '#10b981' },
    { label: 'Médio', value: 'medium', color: '#f59e0b' },
    { label: 'Difícil', value: 'hard', color: '#ef4444' }
  ];

  const cookTimeRanges = [
    { label: '0-15 min', value: '0-15' },
    { label: '15-30 min', value: '15-30' },
    { label: '30-60 min', value: '30-60' },
    { label: '60+ min', value: '60-999' }
  ];

  const servingRanges = [
    { label: '1-2 porções', value: '1-2' },
    { label: '3-4 porções', value: '3-4' },
    { label: '5+ porções', value: '5-99' }
  ];

  return (
    <motion.div 
      className={styles.sidebar}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Quick Search */}
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>
          <FiSearch size={18} />
          Busca Rápida
        </h3>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Buscar receitas..."
            className="w-full pl-10 pr-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg text-sm focus:outline-none focus:border-purple-400 transition-colors"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Quick Filters */}
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>
          <FiFilter size={18} />
          Filtros Rápidos
        </h3>
        <div className="space-y-2">
          {quickFilters.map((filter, index) => (
            <motion.button
              key={filter.value}
              className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 text-left ${
                selectedQuickFilters.includes(filter.value)
                  ? 'bg-white/60 border border-white/50'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              onClick={() => onQuickFilterSelect?.(filter.value)}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <filter.icon size={16} style={{ color: filter.color }} />
              <span className="text-sm font-medium text-gray-700">{filter.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>
          <FiFilter size={18} />
          Categorias
        </h3>
        <div className="space-y-1">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              className={styles.categoryItem}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onCategorySelect?.(category)}
            >
              <input
                type="checkbox"
                className={styles.categoryCheckbox}
                checked={selectedCategories.includes(category)}
                onChange={() => {}}
              />
              <span className={styles.categoryLabel}>{category}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>
          <FiStar size={18} />
          Dificuldade
        </h3>
        <div className="space-y-2">
          {difficulties.map((difficulty) => (
            <motion.button
              key={difficulty.value}
              className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 text-left ${
                selectedDifficulties.includes(difficulty.value)
                  ? 'bg-white/50 border border-white/40'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
              onClick={() => onDifficultySelect?.(difficulty.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: difficulty.color }}
              />
              <span className="text-sm font-medium text-gray-700">{difficulty.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cook Time */}
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>
          <FiClock size={18} />
          Tempo de Cozinha
        </h3>
        <div className="space-y-2">
          {cookTimeRanges.map((timeRange) => (
            <motion.button
              key={timeRange.value}
              className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 text-left ${
                selectedCookTime.includes(timeRange.value)
                  ? 'bg-white/50 border border-white/40'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
              onClick={() => onCookTimeSelect?.(timeRange.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiClock size={12} className="text-orange-500" />
              <span className="text-sm font-medium text-gray-700">{timeRange.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Servings */}
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>
          <FiUser size={18} />
          Porções
        </h3>
        <div className="space-y-2">
          {servingRanges.map((servingRange) => (
            <motion.button
              key={servingRange.value}
              className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 text-left ${
                selectedServings.includes(servingRange.value)
                  ? 'bg-white/50 border border-white/40'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
              onClick={() => onServingsSelect?.(servingRange.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiUser size={12} className="text-blue-500" />
              <span className="text-sm font-medium text-gray-700">{servingRange.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Favorites */}
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>
          <FiHeart size={18} />
          Suas Favoritas
        </h3>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {favorites.length > 0 ? (
            favorites.map((favorite, index) => (
              <motion.div
                key={index}
                className={styles.categoryItem}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <FiHeart size={14} className="text-red-400" />
                <span className={styles.categoryLabel}>{favorite}</span>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 text-sm">
              <FiHeart size={24} className="mx-auto mb-2 text-gray-300" />
              <p>Nenhuma receita favorita ainda</p>
              <p>Comece explorando!</p>
            </div>
          )}
        </div>
      </div>

      {/* Recipe of the Day */}
      <motion.div 
        className="mt-6 p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl border border-purple-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <FiStar className="text-white" size={20} />
          </div>
          <h4 className="font-semibold text-purple-800 mb-2">Receita do Dia</h4>
          <p className="text-sm text-purple-700 mb-3">
            Risotto de Cogumelos
          </p>
          <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow">
            Ver Receita
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RecipeSidebar;
