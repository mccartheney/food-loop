import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiStar, FiClock, FiHeart, FiUser } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import styles from '../../app/app/recipes/styles.module.css';

interface RecipeCardProps {
  recipe: {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    cookTime: number;
    difficulty: 'easy' | 'medium' | 'hard';
    servings: number;
    isPopular?: boolean;
    isFavorited?: boolean;
    category: string;
  };
  onClick?: () => void;
  onFavoriteToggle?: (recipeId: string, isFavorited: boolean) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onClick,
  onFavoriteToggle
}) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [localIsFavorited, setLocalIsFavorited] = useState(recipe.isFavorited);
  
  const difficultyMap = {
    easy: { label: 'Fácil', className: styles.difficultyEasy },
    medium: { label: 'Médio', className: styles.difficultyMedium },
    hard: { label: 'Difícil', className: styles.difficultyHard }
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!session?.user?.email || isLoading) {
      return;
    }
    
    setIsLoading(true);
    const previousState = localIsFavorited;
    
    // Optimistic update
    setLocalIsFavorited(!localIsFavorited);
    
    try {
      const method = localIsFavorited ? 'DELETE' : 'POST';
      const response = await fetch(`/api/recipes/${recipe.id}/favorite`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user.email
        })
      });

      if (response.ok) {
        // Notify parent component about the change
        onFavoriteToggle?.(recipe.id, !previousState);
      } else {
        // Revert on error
        setLocalIsFavorited(previousState);
        const errorData = await response.json();
        console.error('Error toggling favorite:', errorData.error);
      }
    } catch (error) {
      // Revert on error
      setLocalIsFavorited(previousState);
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
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
            className={localIsFavorited ? 'text-red-500 fill-current' : 'text-gray-600'} 
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
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <FiUser size={14} />
              <span>{recipe.servings} porções</span>
            </div>
            <div className="flex items-center gap-1">
              <FiClock size={14} />
              <span>{recipe.cookTime}min</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
