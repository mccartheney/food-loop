'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import RecipeSidebar from '@/components/recipes/RecipesSidebar';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Recipe data interface
interface Recipe {
  id: string;
  title: string;
  image: string;
  difficulty: string;
  prepTime: string;
  ingredients: string[];
  preparation: string[];
  categories: string[];
}

// Mock recipe data
const MOCK_RECIPE: Recipe = {
  id: 'biscuit-cake',
  title: 'Biscuit Cake',
  image: '/images/recipes/biscuit-cake.jpg',
  difficulty: 'Easy',
  prepTime: 'Food recipe',
  ingredients: [
    '2 eggs',
    '1.5 cups of flour',
    '1 cup of sugar',
    '1/2 cup of milk',
    '1/3 cup of melted butter',
    '1 tablespoon baking powder'
  ],
  preparation: [
    'Beat the eggs, oil and sugar in a blender.',
    'Add the yogurt, flour and, lastly, the yeast.',
    'Place in a greased pan and bake in preheated oven.'
  ],
  categories: ['Cakes', 'Desserts', 'Quick mix', 'Wholewheat cake', 'Simple cake', 'Coconut cake', 'Birthday cakes']
};

// Mock favorites for the sidebar
const MOCK_FAVORITES = ['Pasta', 'Sushi', 'Bread', 'Salad', 'Dessert', 'Soup', 'Breakfast', 'Lunch', 'Dinner', 
'Snacks', 'Drinks', 'Vegan', 'Gluten-free', 'Keto', 'Paleo', 'Low-carb'];

export default function RecipeDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch recipe details
    setLoading(true);
    
    // In a real app, you would fetch the specific recipe by ID
    setTimeout(() => {
      setRecipe(MOCK_RECIPE);
      setLoading(false);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!recipe) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-xl font-bold">Recipe not found</h2>
          <Link href="/app/recipes" className="mt-4 btn btn-primary">
            Back to Recipes
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <RecipeSidebar favorites={MOCK_FAVORITES} />
        </div>
        
        {/* Mobile search */}
        <div className="md:hidden mb-4">
          <div className="form-control w-full mb-4">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Recipe header image */}
          <div className="relative w-full h-64 md:h-80">
            <Image 
              src={recipe.image} 
              alt={recipe.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
              className="w-full"
            />
          </div>
          
          {/* Recipe info */}
          <div className="p-6">
            {/* Title and metadata */}
            <div className="mb-4 border-b pb-4">
              <h1 className="text-2xl font-bold mb-1">{recipe.title}</h1>
              <div className="flex gap-2 text-sm text-gray-600">
                <span>{recipe.difficulty}</span>
                <span>•</span>
                <span>{recipe.prepTime}</span>
                <span>•</span>
                <span>{recipe.ingredients.length} ingredients</span>
              </div>
            </div>
            
            {/* Two column layout for ingredients and preparation */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Ingredients column */}
              <div>
                <h2 className="text-lg font-semibold text-primary mb-4 border-b pb-2">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span>•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Preparation column */}
              <div>
                <h2 className="text-lg font-semibold text-primary mb-4 border-b pb-2">Preparation mode</h2>
                <ol className="space-y-4">
                  {recipe.preparation.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary font-medium">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            
            {/* Related categories */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3 border-b pb-2">Related categories</h2>
              <div className="flex flex-wrap gap-2">
                {recipe.categories.map((category, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href={`/app/recipes?category=${encodeURIComponent(category)}`}
                      className="bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-primary-focus transition-colors"
                    >
                      {category}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}