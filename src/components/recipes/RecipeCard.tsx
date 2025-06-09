import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiStar, FiClock, FiHeart, FiUser } from 'react-icons/fi';
import styles from '../../app/app/recipes/styles.module.css';

interface RecipeCardProps {
  recipe: {
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
  };
  onClick?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onClick
}) => {
  const difficultyMap = {
    easy: { label: 'Fácil', className: styles.difficultyEasy },
    medium: { label: 'Médio', className: styles.difficultyMedium },
    hard: { label: 'Difícil', className: styles.difficultyHard }
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      const method = recipe.isFavorited ? 'DELETE' : 'POST';
      const response = await fetch(`/api/recipes/${recipe.id}/favorite`, {
        method,
      });

      if (response.ok) {
        // Trigger a page refresh or update the recipe state
        window.location.reload();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <motion.div 
      className={styles.recipeCard}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.recipeImageContainer}>
        <Image 
          src={recipe.imageUrl || '/images/placeholder-recipe.jpg'} 
          alt={recipe.title} 
          fill
          style={{ objectFit: 'cover' }}
          className={styles.recipeImage}
        />
        
        <div className={styles.recipeOverlay} />
        
        {/* Badges */}
        {recipe.isPopular && (
          <div className={styles.recipeBadge}>
            ⭐ Popular
          </div>
        )}
        
        <div className={styles.recipeTime}>
          <FiClock size={12} className="inline mr-1" />
          {recipe.cookTime}min
        </div>
        
        {/* Favorite Button */}
        <motion.button
          className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
          onClick={handleFavoriteClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiHeart 
            size={16} 
            className={recipe.isFavorited ? 'text-red-500 fill-current' : 'text-gray-600'} 
          />
        </motion.button>
      </div>
      
      <div className={styles.recipeContent}>
        <div className="flex items-start justify-between mb-2">
          <h3 className={styles.recipeTitle}>{recipe.title}</h3>
          <span className={`${styles.recipeDifficulty} ${difficultyMap[recipe.difficulty].className}`}>
            {difficultyMap[recipe.difficulty].label}
          </span>
        </div>
        
        <p className={styles.recipeSubtitle}>{recipe.category}</p>
        
        <div className={styles.recipeFooter}>
          <div className={styles.recipeRating}>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  size={14}
                  className={i < Math.floor(recipe.rating / 20) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className={styles.ratingNumber}>
              {(recipe.rating / 20).toFixed(1)}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <FiUser size={14} />
              <span>{recipe.servings}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
