'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiBookOpen, FiPackage, FiClock, FiUsers, FiChevronRight } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SearchResult } from '@/lib/hooks/useSearch';
import UserSearchResults from '@/components/users/UserSearchResults';
import styles from '../../app/app/styles.module.css';

interface SearchResultsProps {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  query: string;
  onResultClick?: (result: SearchResult) => void;
  onSeeMore?: (type: 'recipe' | 'pantry_item') => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  loading,
  error,
  query,
  onResultClick,
  onSeeMore
}) => {
  const router = useRouter();

  const recipeResults = results.filter(r => r.type === 'recipe');
  const pantryResults = results.filter(r => r.type === 'pantry_item');

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
      case 'easy': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
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
        className={`${styles.searchResults} absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Buscando...</span>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className={`${styles.searchResults} absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <div className="text-center py-8 text-red-600">
          <p>{error}</p>
        </div>
      </motion.div>
    );
  }

  if (results.length === 0 && query.length >= 2) {
    return (
      <motion.div 
        className={`${styles.searchResults} absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <div className="text-center py-8 text-gray-500">
          <p className="font-medium">Nenhum resultado encontrado</p>
          <p className="text-sm mt-1">Tente buscar por outro termo</p>
        </div>
      </motion.div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <motion.div 
      className={`${styles.searchResults} absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {/* Recipe Results */}
      {recipeResults.length > 0 && (
        <div className="border-b border-gray-100">
          <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiBookOpen className="text-purple-600" size={16} />
              <span className="font-medium text-gray-800">Receitas ({recipeResults.length})</span>
            </div>
            {recipeResults.length >= 5 && onSeeMore && (
              <button
                onClick={() => onSeeMore('recipe')}
                className="text-purple-600 text-sm hover:text-purple-800 flex items-center gap-1"
              >
                Ver mais
                <FiChevronRight size={14} />
              </button>
            )}
          </div>
          
          {recipeResults.map((result, index) => (
            <motion.div
              key={result.id}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 2 }}
              onClick={() => handleResultClick(result)}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  {result.image ? (
                    <Image
                      src={result.image}
                      alt={result.title}
                      width={48}
                      height={48}
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <FiBookOpen className="text-purple-600" size={20} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 truncate">
                    {result.title}
                  </div>
                  <div className="text-sm text-gray-600 truncate">
                    {result.subtitle}
                  </div>
                  {result.metadata?.ingredients && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(result.metadata.difficulty)}`}>
                        {getDifficultyLabel(result.metadata.difficulty)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {result.metadata.ingredients.slice(0, 2).join(', ')}
                        {result.metadata.ingredients.length > 2 && ` +${result.metadata.ingredients.length - 2}`}
                      </span>
                    </div>
                  )}
                </div>
                
                <FiChevronRight className="text-gray-400" size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* User Results */}
      <div className="border-b border-gray-100">
        <UserSearchResults 
          query={query}
          onUserClick={(userId) => {
            router.push(`/app/profile/${userId}`);
          }}
        />
      </div>

      {/* Pantry Results */}
      {pantryResults.length > 0 && (
        <div>
          <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiPackage className="text-blue-600" size={16} />
              <span className="font-medium text-gray-800">Despensa ({pantryResults.length})</span>
            </div>
            {pantryResults.length >= 5 && onSeeMore && (
              <button
                onClick={() => onSeeMore('pantry_item')}
                className="text-blue-600 text-sm hover:text-blue-800 flex items-center gap-1"
              >
                Ver mais
                <FiChevronRight size={14} />
              </button>
            )}
          </div>
          
          {pantryResults.map((result, index) => (
            <motion.div
              key={result.id}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (recipeResults.length + index) * 0.05 }}
              whileHover={{ x: 2 }}
              onClick={() => handleResultClick(result)}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <div className={`w-6 h-6 rounded ${getItemTypeColor(result.metadata?.type || 'default')}`}></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 truncate">
                    {result.title}
                  </div>
                  <div className="text-sm text-gray-600 truncate">
                    {result.subtitle}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                      {result.metadata?.quantity}x
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {result.metadata?.type?.replace('_', ' ').toLowerCase()}
                    </span>
                  </div>
                </div>
                
                <FiChevronRight className="text-gray-400" size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SearchResults;
