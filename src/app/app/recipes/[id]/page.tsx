'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiArrowLeft, FiClock, FiUser, FiStar, FiHeart, FiShare2, FiBookmark, FiTool } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  cookTime: number;
  rating: number;
  difficulty: 'easy' | 'medium' | 'hard';
  servings: number;
  ingredients: string[];
  steps: string[];
  author: string;
  authorId: string;
  category: string;
  isFavorited?: boolean;
  favoritesCount?: number;
}

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  // Fetch recipe data
  const fetchRecipe = async () => {
    try {
      setLoading(true);
      setError(null);

      // Add user email to get favorite status
      const url = session?.user?.email 
        ? `/api/recipes/${id}?email=${encodeURIComponent(session.user.email)}`
        : `/api/recipes/${id}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Recipe not found');
      }

      const data = await response.json();
      if (data.success) {
        setRecipe(data.recipe);
      } else {
        throw new Error('Failed to load recipe');
      }
    } catch (err) {
      console.error('Error fetching recipe:', err);
      setError(err instanceof Error ? err.message : 'Failed to load recipe');
    } finally {
      setLoading(false);
    }
  };

  // Toggle favorite
  const toggleFavorite = async () => {
    if (!recipe || favoriteLoading || !session?.user?.email) return;

    try {
      setFavoriteLoading(true);
      const method = recipe.isFavorited ? 'DELETE' : 'POST';
      
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
        setRecipe(prev => prev ? {
          ...prev,
          isFavorited: !prev.isFavorited,
          favoritesCount: prev.isFavorited 
            ? (prev.favoritesCount || 1) - 1 
            : (prev.favoritesCount || 0) + 1
        } : null);
      } else {
        const errorData = await response.json();
        console.error('Error toggling favorite:', errorData.error);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    
    if (session?.user) {
      fetchRecipe();
    } else {
      setLoading(false);
      setError('Please sign in to view recipes');
    }
  }, [id, session, status]);

  // Loading state
  if (status === "loading" || loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
            <p className="text-gray-600 font-medium">Carregando receita...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Error state
  if (error || !session?.user) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              {!session?.user ? 'Faça login' : 'Receita não encontrada'}
            </h1>
            <p className="text-gray-600 mb-6">
              {!session?.user 
                ? 'Você precisa fazer login para ver receitas.' 
                : error || 'Esta receita não existe ou foi removida.'
              }
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => router.back()}
                className="bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              >
                Voltar
              </button>
              {!session?.user ? (
                <button 
                  onClick={() => router.push('/auth/login')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Fazer login
                </button>
              ) : (
                <button 
                  onClick={() => router.push('/app/recipes')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Ver receitas
                </button>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!recipe) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Receita não encontrada</h1>
            <p className="text-gray-600 mb-6">Esta receita não existe ou foi removida.</p>
            <button 
              onClick={() => router.push('/app/recipes')}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Ver receitas
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const difficultyMap = {
    easy: { label: 'Fácil', color: 'text-green-600', bg: 'bg-green-100' },
    medium: { label: 'Médio', color: 'text-yellow-600', bg: 'bg-yellow-100' },
    hard: { label: 'Difícil', color: 'text-red-600', bg: 'bg-red-100' }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto py-8 px-4">
          {/* Header with back button */}
          <motion.div 
            className="flex items-center mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors bg-white rounded-xl px-4 py-2 shadow-md hover:shadow-lg"
            >
              <FiArrowLeft size={20} />
              Voltar
            </button>
          </motion.div>

          {/* Recipe Content */}
          <motion.div 
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Recipe Header */}
            <div className="relative h-96 md:h-[500px]">
              <Image
                src={recipe.imageUrl || '/images/placeholder-recipe.jpg'}
                alt={recipe.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
                className="w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Recipe title overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {recipe.title}
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {recipe.category}
                </motion.p>
              </div>

              {/* Action buttons */}
              <div className="absolute top-6 right-6 flex gap-3">
                <motion.button
                  onClick={toggleFavorite}
                  disabled={favoriteLoading}
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                    recipe.isFavorited 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-500 hover:text-white'
                  } ${favoriteLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                  whileHover={{ scale: favoriteLoading ? 1 : 1.1 }}
                  whileTap={{ scale: favoriteLoading ? 1 : 0.9 }}
                >
                  <FiHeart size={20} className={recipe.isFavorited ? 'fill-current' : ''} />
                </motion.button>
                <motion.button
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiShare2 size={20} />
                </motion.button>
              </div>
            </div>

            {/* Recipe Info */}
            <div className="p-8">
              {/* Meta info */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-gray-50 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                    <FiClock className="text-blue-600" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{recipe.cookTime}</div>
                  <div className="text-sm text-gray-500">minutos</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                    <FiUser className="text-purple-600" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{recipe.servings}</div>
                  <div className="text-sm text-gray-500">porções</div>
                </div>
                <div className="text-center">
                  <div className={`flex items-center justify-center w-12 h-12 ${difficultyMap[recipe.difficulty].bg} rounded-full mx-auto mb-2`}>
                    <FiTool className={difficultyMap[recipe.difficulty].color} size={24} />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{difficultyMap[recipe.difficulty].label}</div>
                  <div className="text-sm text-gray-500">dificuldade</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-2">
                    <FiStar className="text-yellow-600 fill-current" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{(recipe.rating / 20).toFixed(1)}</div>
                  <div className="text-sm text-gray-500">avaliação</div>
                </div>
              </motion.div>

              {/* Author info */}
              <motion.div 
                className="flex items-center gap-4 mb-8 p-4 bg-blue-50 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {recipe.author?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Criado por {recipe.author}</p>
                  <p className="text-sm text-gray-600">{recipe.favoritesCount || 0} pessoas favoritaram esta receita</p>
                </div>
              </motion.div>

              {/* Content grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Ingredients */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">🥕</span>
                    </div>
                    Ingredientes
                  </h2>
                  <div className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">{ingredient}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Steps */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">👨‍🍳</span>
                    </div>
                    Modo de Preparo
                  </h2>
                  <div className="space-y-4">
                    {recipe.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        className="flex gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                      >
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-gray-700 leading-relaxed">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
