'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
}

// Dados mock mais realistas com receitas portuguesas
const MOCK_RECIPES: Recipe[] = [
  {
    id: 'recipe-1',
    title: 'Bacalhau à Brás',
    subtitle: 'Prato tradicional português',
    imageUrl: '/images/recipes/bacalhau-bras.jpg',
    cookTime: 45,
    rating: 92,
    difficulty: 'medium',
    servings: 4,
    isPopular: true,
    isFavorited: false,
    category: 'Prato Principal'
  },
  {
    id: 'recipe-2',
    title: 'Pastéis de Nata',
    subtitle: 'Doce português icônico',
    imageUrl: '/images/recipes/pasteis-nata.jpg',
    cookTime: 60,
    rating: 95,
    difficulty: 'hard',
    servings: 12,
    isPopular: true,
    isFavorited: true,
    category: 'Sobremesa'
  },
  {
    id: 'recipe-3',
    title: 'Caldo Verde',
    subtitle: 'Sopa tradicional do Minho',
    imageUrl: '/images/recipes/caldo-verde.jpg',
    cookTime: 30,
    rating: 88,
    difficulty: 'easy',
    servings: 6,
    isPopular: false,
    isFavorited: false,
    category: 'Sopa'
  },
  {
    id: 'recipe-4',
    title: 'Francesinha',
    subtitle: 'Especialidade do Porto',
    imageUrl: '/images/recipes/francesinha.jpg',
    cookTime: 40,
    rating: 90,
    difficulty: 'medium',
    servings: 2,
    isPopular: true,
    isFavorited: false,
    category: 'Prato Principal'
  },
  {
    id: 'recipe-5',
    title: 'Arroz de Pato',
    subtitle: 'Receita tradicional familiar',
    imageUrl: '/images/recipes/arroz-pato.jpg',
    cookTime: 90,
    rating: 94,
    difficulty: 'hard',
    servings: 8,
    isPopular: false,
    isFavorited: true,
    category: 'Prato Principal'
  },
  {
    id: 'recipe-6',
    title: 'Bifana',
    subtitle: 'Sanduíche português clássico',
    imageUrl: '/images/recipes/bifana.jpg',
    cookTime: 15,
    rating: 85,
    difficulty: 'easy',
    servings: 1,
    isPopular: false,
    isFavorited: false,
    category: 'Lanche'
  },
  {
    id: 'recipe-7',
    title: 'Cataplana de Marisco',
    subtitle: 'Sabores do mar algarvio',
    imageUrl: '/images/recipes/cataplana.jpg',
    cookTime: 50,
    rating: 96,
    difficulty: 'hard',
    servings: 4,
    isPopular: true,
    isFavorited: true,
    category: 'Prato Principal'
  },
  {
    id: 'recipe-8',
    title: 'Queijadas de Sintra',
    subtitle: 'Doçura tradicional',
    imageUrl: '/images/recipes/queijadas.jpg',
    cookTime: 35,
    rating: 89,
    difficulty: 'medium',
    servings: 6,
    isPopular: false,
    isFavorited: false,
    category: 'Sobremesa'
  },
  {
    id: 'recipe-9',
    title: 'Migas à Alentejana',
    subtitle: 'Sabor rústico do Alentejo',
    imageUrl: '/images/recipes/migas.jpg',
    cookTime: 25,
    rating: 87,
    difficulty: 'easy',
    servings: 4,
    isPopular: false,
    isFavorited: false,
    category: 'Acompanhamento'
  },
  {
    id: 'recipe-10',
    title: 'Açorda de Camarão',
    subtitle: 'Tradição alentejana moderna',
    imageUrl: '/images/recipes/acorda.jpg',
    cookTime: 35,
    rating: 91,
    difficulty: 'medium',
    servings: 4,
    isPopular: false,
    isFavorited: true,
    category: 'Prato Principal'
  },
  {
    id: 'recipe-11',
    title: 'Bolo de Bolacha',
    subtitle: 'Sobremesa sem forno',
    imageUrl: '/images/recipes/bolo-bolacha.jpg',
    cookTime: 20,
    rating: 93,
    difficulty: 'easy',
    servings: 8,
    isPopular: true,
    isFavorited: false,
    category: 'Sobremesa'
  },
  {
    id: 'recipe-12',
    title: 'Polvo à Lagareiro',
    subtitle: 'Clássico da cozinha portuguesa',
    imageUrl: '/images/recipes/polvo-lagareiro.jpg',
    cookTime: 75,
    rating: 94,
    difficulty: 'hard',
    servings: 6,
    isPopular: true,
    isFavorited: true,
    category: 'Prato Principal'
  }
];

const MOCK_FAVORITES = [
  'Bacalhau à Brás', 'Pastéis de Nata', 'Caldo Verde', 'Francesinha',
  'Arroz de Pato', 'Cataplana', 'Bolo de Bolacha', 'Polvo à Lagareiro'
];

export default function RecipesPage() {
  const router = useRouter();
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    
    setTimeout(() => {
      setAllRecipes(MOCK_RECIPES);
      setFilteredRecipes(MOCK_RECIPES);
      setLoading(false);
    }, 800);
  }, []);

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
  const favoriteRecipes = filteredRecipes.filter(recipe => recipe.isFavorited);

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
              favorites={MOCK_FAVORITES}
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
                    loading={loading}
                  />
                </motion.div>
              )}

              {/* Recent Recipes */}
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
                  loading={loading}
                />
              </motion.div>

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
                    loading={loading}
                  />
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
