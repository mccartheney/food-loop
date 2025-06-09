'use client';

import { motion } from 'framer-motion';
import { FiClock, FiStar, FiTrendingUp, FiHeart, FiBook, FiUser } from 'react-icons/fi';
import styles from '../../app/app/recipes/styles.module.css';

interface RecipesStatsHeaderProps {
  totalRecipes?: number;
  favoriteRecipes?: number;
  averageCookTime?: number;
  popularRecipes?: number;
  completedRecipes?: number;
  savedRecipes?: number;
}

const RecipesStatsHeader: React.FC<RecipesStatsHeaderProps> = ({
  totalRecipes = 156,
  favoriteRecipes = 23,
  averageCookTime = 35,
  popularRecipes = 12,
  completedRecipes = 89,
  savedRecipes = 34
}) => {
  const stats = [
    {
      icon: FiBook,
      label: 'Total de Receitas',
      value: totalRecipes,
      suffix: '',
      color: '#667eea'
    },
    {
      icon: FiHeart,
      label: 'Receitas Favoritas',
      value: favoriteRecipes,
      suffix: '',
      color: '#ef4444'
    },
    {
      icon: FiClock,
      label: 'Tempo Médio',
      value: averageCookTime,
      suffix: 'min',
      color: '#f59e0b'
    },
    {
      icon: FiTrendingUp,
      label: 'Populares',
      value: popularRecipes,
      suffix: '',
      color: '#10b981'
    },
    {
      icon: FiUser,
      label: 'Cozinhadas',
      value: completedRecipes,
      suffix: '',
      color: '#8b5cf6'
    },
    {
      icon: FiStar,
      label: 'Guardadas',
      value: savedRecipes,
      suffix: '',
      color: '#f97316'
    }
  ];

  return (
    <motion.div 
      className={styles.statsHeader}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header Title */}
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ duration: 0.2 }}
          >
            <FiUser size={32} className="text-purple-600" />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Receitas Deliciosas
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Descubra sabores incríveis e transforme ingredientes em experiências únicas
        </p>
      </motion.div>

      {/* Quick Tips */}
      <motion.div 
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4 mb-6 border border-purple-100"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <FiStar className="text-white" size={16} />
          </div>
          <div className="flex-1">
            <span className="font-semibold text-purple-800">Dica do Chef:</span>
            <span className="text-gray-700 ml-2">
              Use ingredientes do seu pantry para descobrir receitas personalizadas!
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={styles.statCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <stat.icon 
                size={28} 
                className={styles.statIcon}
                style={{ color: stat.color }}
              />
            </motion.div>
            
            <motion.div 
              className={styles.statNumber}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
            >
              {stat.value}
              {stat.suffix && <span className="text-sm ml-1">{stat.suffix}</span>}
            </motion.div>
            
            <div className={styles.statLabel}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <motion.div 
        className="flex flex-wrap gap-3 justify-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            <FiTrendingUp size={18} />
            <span>Receitas Populares</span>
          </div>
        </motion.button>

        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            <FiHeart size={18} />
            <span>Minhas Favoritas</span>
          </div>
        </motion.button>

        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            <FiUser size={18} />
            <span>Receita Aleatória</span>
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default RecipesStatsHeader;
