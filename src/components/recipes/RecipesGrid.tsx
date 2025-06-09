import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiBookOpen } from 'react-icons/fi';
import RecipeCard from './RecipeCard';
import styles from '../../app/app/recipes/styles.module.css';

interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  cookTime: number;
  rating: number;
  difficulty: 'easy' | 'medium' | 'hard';
  servings: number;
  isPopular?: boolean;
  isFavorited?: boolean;
  category: string;
}

interface RecipeGridProps {
  recipes: Recipe[];
  onRecipeClick?: (recipeId: string) => void;
  loading?: boolean;
  title?: string;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ 
  recipes, 
  onRecipeClick, 
  loading = false,
  title 
}) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <motion.div
          className={styles.loadingSpinner}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FiBookOpen size={32} className="text-purple-500" />
        </motion.div>
        <p className={styles.loadingText}>Carregando receitas deliciosas...</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <motion.div 
        className={styles.emptyState}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={styles.emptyStateIcon}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          <FiSearch size={64} />
        </motion.div>
        <h3 className={styles.emptyStateTitle}>Nenhuma receita encontrada</h3>
        <p className={styles.emptyStateDescription}>
          Tente ajustar seus filtros de busca ou explore outras categorias.<br />
          Que tal experimentar algo novo hoje?
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {title && (
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FiBookOpen className={styles.sectionIcon} size={24} />
          <h2 className={styles.sectionTitle}>{title}</h2>
        </motion.div>
      )}
      
      <div className={styles.recipesGrid}>
        {recipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4,
              delay: index * 0.1,
              ease: "easeOut"
            }}
          >
            <RecipeCard 
              recipe={recipe}
              onClick={() => onRecipeClick && onRecipeClick(recipe.id)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecipeGrid;
