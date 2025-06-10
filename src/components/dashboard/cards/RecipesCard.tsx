'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiBookOpen, FiClock, FiUsers, FiArrowRight, FiCoffee } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from '../../../app/app/styles.module.css';

interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
  cookTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  servings: number;
  ingredients: string[];
  category: string;
  author: string;
}

const RecipesCard: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/recipes?email=${encodeURIComponent(session.user.email)}`);
        const data = await response.json();
        
        if (data.success && data.recipes) {
          // Take first 5 recipes for the card
          setRecipes(data.recipes.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [session]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={`${styles.dashboardCard} ${styles.recipesCard} rounded-2xl shadow-lg h-full overflow-hidden`}
    >
      <div className={`${styles.cardHeader} px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <FiBookOpen className="text-purple-600" size={20} />
          </motion.div>
          <div>
            <h2 className="text-sm font-semibold text-gray-800">Receitas do Dia</h2>
            <p className="text-xs text-gray-600">Com seus ingredientes</p>
          </div>
        </div>
        
        <motion.button
          className="text-purple-600 hover:text-purple-800 p-1"
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push('/app/recipes')}
        >
          <FiArrowRight size={16} />
        </motion.button>
      </div>
      
      <div className={`card-body p-4 ${styles.customScrollbar}`}>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FiBookOpen size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhuma receita encontrada</p>
            <p className="text-xs">Crie sua primeira receita</p>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                className={`${styles.recipeCarouselCard} relative flex-shrink-0 ${isMobile ? 'w-40 h-52' : 'w-52 h-72'} rounded-xl overflow-hidden cursor-pointer`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => router.push('/app/recipes')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-purple-50 to-white">
                  {/* Recipe Icon/Image */}
                  <div className="flex flex-col items-center justify-center h-full p-4">
                    <motion.div 
                      className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20'} bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg`}
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiCoffee className="text-white" size={isMobile ? 24 : 32} />
                    </motion.div>
                    
                    <div className="text-center mb-auto">
                      <h3 className={`font-semibold text-gray-800 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {recipe.title}
                      </h3>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-1 text-gray-600">
                          <FiClock size={12} />
                          <span className="text-xs">{recipe.cookTime}min</span>
                        </div>
                        
                        <div className="flex items-center justify-center gap-1 text-gray-600">
                          <FiUsers size={12} />
                          <span className="text-xs">{recipe.servings} pessoas</span>
                        </div>
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                          {getDifficultyLabel(recipe.difficulty)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Ingredients Preview */}
                    <div className="w-full">
                      <div className="text-xs text-gray-500 text-center mb-1">Ingredientes:</div>
                      <div className="flex flex-wrap justify-center gap-1">
                        {recipe.ingredients.slice(0, 2).map((ingredient, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/80 text-xs rounded-full text-gray-600">
                            {ingredient}
                          </span>
                        ))}
                        {recipe.ingredients.length > 2 && (
                          <span className="px-2 py-1 bg-purple-100 text-xs rounded-full text-purple-600">
                            +{recipe.ingredients.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* View All Recipes Button */}
        <motion.div 
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="w-full btn btn-outline btn-sm rounded-xl border-purple-200 text-purple-600 hover:bg-purple-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/app/recipes')}
          >
            Explorar Todas as Receitas
            <FiArrowRight className="ml-2" size={14} />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecipesCard;
