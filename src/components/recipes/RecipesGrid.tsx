import React from 'react';
import RecipeCard from './RecipeCard';

interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  cookDate: string;
  rating: number;
  isPopular?: boolean;
}

interface RecipeGridProps {
  recipes: Recipe[];
  onRecipeClick?: (recipeId: string) => void;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, onRecipeClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe}
          onClick={() => onRecipeClick && onRecipeClick(recipe.id)}
        />
      ))}
      {recipes.length === 0 && (
        <div className="col-span-full py-8 text-center text-gray-500">
          No recipes found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default RecipeGrid;