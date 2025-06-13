'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiBookOpen, FiPackage, FiUsers, FiChevronRight, FiClock, FiStar, FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SearchResult } from '@/lib/hooks/useSearch';
import styles from '../../app/app/styles.module.css';

interface InlineSearchResultsProps {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  query: string;
  onResultClick?: (result: SearchResult) => void;
  onSeeMore?: (type: 'recipe' | 'pantry_item') => void;
}

const InlineSearchResults: React.FC<InlineSearchResultsProps> = ({
  results,
  loading,
  error,
  query,
  onResultClick,
  onSeeMore
}) => {
  const router = useRouter();

  const recipeResults = results.filter(r => r.type === 'recipe').slice(0, 3);
  const pantryResults = results.filter(r => r.type === 'pantry_item').slice(0, 4);

  const handleResultClick = (result: SearchResult) => {
    if (onResultClick) {
      onResultClick(result);
    } else {
      // Default navigation
      if (result.type === 'recipe') {
        router.push(`/app/recipes/${result.id}`);
      } else if (result.type === 'pantry_item') {
        router.push('/app/pantry');
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return 'Médio';
    }
  };

  const getItemTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'vegetables': return 'bg-green-200';
      case 'fruits': return 'bg-orange-200';
      case 'meat': return 'bg-red-200';
      case 'dairy': return 'bg-blue-200';
      case 'grains_cereals': return 'bg-amber-200';
      case 'bakery': return 'bg-yellow-200';
      default: return 'bg-gray-200';
    }
  };

  if (loading) {
    return (
      <motion.div 
        className="mt-6 space-y-4"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Buscando resultados...</span>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="mt-6"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center py-8 text-red-600 bg-red-50 rounded-xl border border-red-200">
          <p className="font-medium">Erro na busca</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </motion.div>
    );
  }

  if (results.length === 0 && query.length >= 2) {
    return (
      <motion.div 
        className="mt-6"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <div className="text-gray-400 mb-3">
            <FiSearch size={32} className="mx-auto" />
          </div>
          <p className="font-medium text-gray-700">Nenhum resultado encontrado</p>
          <p className="text-sm text-gray-500 mt-1">
            Tente pesquisar por "<span className="font-medium">{query}</span>" com outros termos
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {['arroz', 'feijão', 'massa', 'tomate'].map((suggestion) => (
              <span key={suggestion} className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-300">
                {suggestion}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <motion.div 
      className="mt-6 space-y-6"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Recipe Results */}
      {recipeResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FiBookOpen className="text-purple-600" size={20} />
              <h3 className="font-semibold text-gray-800">Receitas ({results.filter(r => r.type === 'recipe').length})</h3>
            </div>
            {results.filter(r => r.type === 'recipe').length > 3 && onSeeMore && (
              <button
                onClick={() => onSeeMore('recipe')}
                className="text-purple-600 text-sm hover:text-purple-800 flex items-center gap-1 transition-colors"
              >
                Ver todas
                <FiChevronRight size={14} />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recipeResults.map((result, index) => (
              <motion.div
                key={result.id}
                className={`${styles.dashboardCard} cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleResultClick(result)}
              >
                <div className="aspect-video bg-purple-100 flex items-center justify-center">
                  {result.image ? (
                    <Image
                      src={result.image}
                      alt={result.title}
                      width={200}
                      height={120}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <FiBookOpen className="text-purple-600" size={24} />
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-800 truncate">{result.title}</h4>
                  <p className="text-sm text-gray-600 truncate mt-1">{result.subtitle}</p>
                  {result.metadata?.ingredients && (
                    <div className="flex items-center gap-2 mt-3">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(result.metadata.difficulty)}`}>
                        {getDifficultyLabel(result.metadata.difficulty)}
                      </span>
                      <span className="text-xs text-gray-500 truncate">
                        {result.metadata.ingredients.slice(0, 2).join(', ')}
                        {result.metadata.ingredients.length > 2 && ` +${result.metadata.ingredients.length - 2}`}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Users Results - Simple inline component */}
      {query.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <FiUsers className="text-blue-600" size={20} />
            <h3 className="font-semibold text-gray-800">Utilizadores</h3>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Busca de utilizadores disponível na página de amigos
            </p>
          </div>
        </motion.div>
      )}

      {/* Pantry Results */}
      {pantryResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FiPackage className="text-green-600" size={20} />
              <h3 className="font-semibold text-gray-800">Despensa ({results.filter(r => r.type === 'pantry_item').length})</h3>
            </div>
            {results.filter(r => r.type === 'pantry_item').length > 4 && onSeeMore && (
              <button
                onClick={() => onSeeMore('pantry_item')}
                className="text-green-600 text-sm hover:text-green-800 flex items-center gap-1 transition-colors"
              >
                Ver todos
                <FiChevronRight size={14} />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {pantryResults.map((result, index) => (
              <motion.div
                key={result.id}
                className={`${styles.dashboardCard} cursor-pointer transition-all duration-200 hover:shadow-md p-4`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -1, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleResultClick(result)}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getItemTypeColor(result.metadata?.type || 'default')}`}>
                    <div className="w-6 h-6 bg-white rounded opacity-80"></div>
                  </div>
                  <div className="text-center">
                    <h4 className="font-medium text-gray-800 text-sm truncate w-full">{result.title}</h4>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-full">
                        {result.metadata?.quantity}x
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InlineSearchResults;
