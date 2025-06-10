'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import RecipesStatsHeader from '@/components/recipes/RecipesStatsHeader';
import RecipesSearchBar from '@/components/recipes/RecipesSearchBar';
import RecipeGrid from '@/components/recipes/RecipesGrid';
import RecipeSidebar from '@/components/recipes/RecipesSidebar';
import styles from './styles.module.css';

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
  author?: string;
  authorId?: string;
  ingredients?: string[];
  steps?: string[];
  favoritesCount?: number;
}

export default function RecipesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);

  // Fetch recipes from API
  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(null);

      // Add user email to get favorite status
      const url = session?.user?.email 
        ? `/api/recipes?email=${encodeURIComponent(session.user.email)}`
        : '/api/recipes';
        
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      if (data.success) {
        setAllRecipes(data.recipes);
        setFilteredRecipes(data.recipes);
      } else {
        throw new Error('Failed to load recipes');
      }
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError(err instanceof Error ? err.message : 'Failed to load recipes');
    } finally {
      setLoading(false);
    }
  };

  // Fetch favorite recipes
  const fetchFavorites = async () => {
    if (!session?.user?.email) return;
    
    try {
      const response = await fetch(`/api/recipes/favorites?email=${encodeURIComponent(session.user.email)}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setFavoriteRecipes(data.recipes);
        }
      }
    } catch (err) {
      console.error('Error fetching favorites:', err);
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    
    if (session?.user) {
      fetchRecipes();
      if (session.user.email) {
        fetchFavorites();
      }
    } else {
      setLoading(false);
      setError('Please sign in to view recipes');
    }
  }, [session, status]);

  // Filter recipes based on search and filters
  useEffect(() => {
    let filtered = allRecipes;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(recipe =>
        selectedCategories.includes(recipe.category)
      );
    }

    // Filter by difficulties
    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter(recipe =>
        selectedDifficulties.includes(recipe.difficulty)
      );
    }

    setFilteredRecipes(filtered);
  }, [allRecipes, searchQuery, selectedCategories, selectedDifficulties]);

  const handleRecipeClick = (recipeId: string) => {
    router.push(`/app/recipes/${recipeId}`);
  };

  const handleFavoriteToggle = (recipeId: string, isFavorited: boolean) => {
    // Update the recipe in all recipes list
    setAllRecipes(prev => prev.map(recipe => 
      recipe.id === recipeId 
        ? { ...recipe, isFavorited } 
        : recipe
    ));
    
    // Update filtered recipes
    setFilteredRecipes(prev => prev.map(recipe => 
      recipe.id === recipeId 
        ? { ...recipe, isFavorited } 
        : recipe
    ));
    
    // Update favorites list
    if (isFavorited) {
      // Recipe was favorited, add to favorites if not already there
      const recipeToAdd = allRecipes.find(r => r.id === recipeId);
      if (recipeToAdd && !favoriteRecipes.find(r => r.id === recipeId)) {
        setFavoriteRecipes(prev => [...prev, { ...recipeToAdd, isFavorited: true }]);
      }
    } else {
      // Recipe was unfavorited, remove from favorites
      setFavoriteRecipes(prev => prev.filter(r => r.id !== recipeId));
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulties(prev =>
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const popularRecipes = filteredRecipes.filter(recipe => recipe.isPopular);
  const recentRecipes = filteredRecipes.slice(0, 8);

  // Loading state
  if (status === "loading" || loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
            <p className="text-gray-600 font-medium">Carregando receitas...</p>
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
              {!session?.user ? 'Faça login' : 'Erro ao carregar receitas'}
            </h1>
            <p className="text-gray-600 mb-6">
              {!session?.user 
                ? 'Você precisa fazer login para ver as receitas.' 
                : error || 'Houve um erro ao carregar as receitas.'
              }
            </p>
            {!session?.user ? (
              <button 
                onClick={() => router.push('/auth/login')}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Ir para login
              </button>
            ) : (
              <button 
                onClick={fetchRecipes}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Tentar novamente
              </button>
            )}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        {/* Stats Header */}
        <RecipesStatsHeader />

        {/* Search Bar */}
        <RecipesSearchBar 
          onSearch={handleSearch}
        />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <RecipeSidebar 
              favorites={favoriteRecipes.map(recipe => recipe.title)}
              onCategorySelect={handleCategorySelect}
              onDifficultySelect={handleDifficultySelect}
              selectedCategories={selectedCategories}
              selectedDifficulties={selectedDifficulties}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div 
              className={styles.recipesContainer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Add Recipe Button */}
              <motion.div 
                className="mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <button
                  onClick={() => router.push('/app/recipes/create')}
                  className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  ➕ Criar Nova Receita
                </button>
              </motion.div>

              {/* Popular Recipes */}
              {popularRecipes.length > 0 && (
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <RecipeGrid 
                    title="🌟 Receitas Populares"
                    recipes={popularRecipes} 
                    onRecipeClick={handleRecipeClick}
                    onFavoriteToggle={handleFavoriteToggle}
                    loading={loading}
                  />
                </motion.div>
              )}

              {/* Recent Recipes */}
              {recentRecipes.length > 0 && (
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <RecipeGrid 
                    title="🍽️ Receitas Recentes"
                    recipes={recentRecipes} 
                    onRecipeClick={handleRecipeClick}
                    onFavoriteToggle={handleFavoriteToggle}
                    loading={loading}
                  />
                </motion.div>
              )}

              {/* Favorite Recipes */}
              {favoriteRecipes.length > 0 && (
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <RecipeGrid 
                    title="❤️ Suas Favoritas"
                    recipes={favoriteRecipes} 
                    onRecipeClick={handleRecipeClick}
                    onFavoriteToggle={handleFavoriteToggle}
                    loading={loading}
                  />
                </motion.div>
              )}

              {/* All Filtered Recipes */}
              {(searchQuery || selectedCategories.length > 0 || selectedDifficulties.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <RecipeGrid 
                    title={`🔍 Resultados da Busca (${filteredRecipes.length})`}
                    recipes={filteredRecipes} 
                    onRecipeClick={handleRecipeClick}
                    onFavoriteToggle={handleFavoriteToggle}
                    loading={loading}
                  />
                </motion.div>
              )}

              {/* Empty State */}
              {!loading && allRecipes.length === 0 && (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-4xl">🍽️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Nenhuma receita ainda</h3>
                  <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                    Seja o primeiro a compartilhar uma receita deliciosa com a comunidade!
                  </p>
                  <button
                    onClick={() => router.push('/app/recipes/create')}
                    className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    ➕ Criar Primeira Receita
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
