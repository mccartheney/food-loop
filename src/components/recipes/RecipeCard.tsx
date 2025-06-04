import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface RecipeCardProps {
  recipe: {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    cookDate: string;
    rating: number;
    isPopular?: boolean;
  };
  onClick?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onClick
}) => {
  return (
    <motion.div 
      className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <figure className="relative">
        <div className="absolute top-2 left-2 z-10">
          {recipe.isPopular && (
            <span className="badge badge-sm bg-white text-gray-700 font-medium">Popular</span>
          )}
        </div>
        <div className="absolute top-2 right-2 z-10">
          <button 
            className="btn btn-circle btn-xs bg-white border-none text-gray-600 hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering card click
              // Add functionality for the close/remove button
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="h-32 w-full relative">
          <Image 
            src={recipe.imageUrl || '/images/placeholder-recipe.jpg'} 
            alt={recipe.title} 
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-t-lg"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </figure>
      <div className="p-2">
        <h3 className="font-medium text-sm">{recipe.title}</h3>
        <div className="flex justify-between items-center mt-1">
          <div>
            <p className="text-xs text-gray-500">{recipe.subtitle}</p>
            <p className="text-xs text-gray-500">{recipe.cookDate}</p>
          </div>
          <div>
            <span className="text-xs font-semibold">{recipe.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;