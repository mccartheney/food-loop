'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import RecipeGrid from '@/components/recipes/RecipesGrid';
import RecipeSidebar from '@/components/recipes/RecipesSidebar';

interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  cookDate: string;
  rating: number;
  isPopular?: boolean;
}

const MOCK_RECIPES: Recipe[] = Array(12).fill(null).map((_, index) => ({
  id: `recipe-${index + 1}`,
  title: 'Yokohama',
  subtitle: 'Sushi partner',
  imageUrl: '/images/recipes/yogurt.jpg',
  cookDate: index % 2 === 0 ? 'Cooked today' : 'Cooked yesterday',
  rating: 95,
  isPopular: index % 3 === 0
}));

const MOCK_FAVORITES = ['Pasta', 'Sushi', 'Bread', 'Salad', 'Dessert', 'Soup', 'Breakfast', 'Lunch', 'Dinner', 
'Snacks', 'Drinks', 'Vegan', 'Gluten-free', 'Keto', 'Paleo', 'Low-carb'];

export default function RecipesPage() {
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    
    setTimeout(() => {
      setRecommendedRecipes(MOCK_RECIPES);
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="loading loading-spinner loading-lg text-primary"></div>
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
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Recommended for you</h2>
            <RecipeGrid recipes={recommendedRecipes.slice(0, 4)} />
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Save before it's too late</h2>
            <RecipeGrid recipes={recommendedRecipes.slice(4, 8)} />
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">New Surprise Bags</h2>
            <RecipeGrid recipes={recommendedRecipes.slice(8, 12)} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}