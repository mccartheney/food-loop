'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-300 flex flex-col items-center justify-center">
                <div className={`${isMobile ? 'w-16 h-16' : 'w-24 h-24'} bg-orange-400/50 rounded-md flex items-center justify-center mb-3`}>
                  <Image
                    src="/shopping.png"
                    alt="Shopping Cart"
                    width={isMobile ? 32 : 48}
                    height={isMobile ? 32 : 48}
                    className="text-white"
                  />
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