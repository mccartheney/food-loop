'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const recipes = [
  {
    id: 1,
    name: 'Vegetable Curry',
    image: '/images/curry.jpg'
  },
  {
    id: 2,
    name: 'Pasta Primavera',
    image: '/images/pasta.jpg'
  },
  {
    id: 3,
    name: 'Vegetable Stir Fry',
    image: '/images/stirfry.jpg'
  },
  {
    id: 4,
    name: 'Healthy Bowl',
    image: '/images/bowl.jpg'
  },
  {
    id: 5,
    name: 'Roasted Vegetables',
    image: '/images/roasted.jpg'
  }
];

const RecipesCard: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="card bg-base-100 shadow-sm h-full"
    >
      <div className="px-4 py-3 border-b flex items-center">
        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
        <h2 className="text-sm font-medium">Recipes of the day</h2>
      </div>
      
      <div className="card-body p-4">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
              className={`relative flex-shrink-0 ${isMobile ? 'w-36 h-48' : 'w-48 h-64'} rounded-lg overflow-hidden shadow-sm`}
            >
              {/* Use a colored div as a placeholder for the image */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-300 flex flex-col items-center justify-center">
                <div className={`${isMobile ? 'w-16 h-16' : 'w-24 h-24'} bg-orange-400/50 rounded-md flex items-center justify-center mb-3`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-white`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </div>
                <div className="text-center px-2">
                  <h3 className={`font-medium text-gray-800 ${isMobile ? 'text-xs' : 'text-sm'}`}>{recipe.name}</h3>
                  <p className={`text-gray-600 mt-1 ${isMobile ? 'text-[0.65rem]' : 'text-xs'}`}>Healthy recipe with fresh ingredients</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RecipesCard;