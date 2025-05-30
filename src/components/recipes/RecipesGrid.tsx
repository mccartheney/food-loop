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
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard 
          key={recipe.id} 
          id={recipe.id}
          title={recipe.title}
          subtitle={recipe.subtitle}
          imageUrl={recipe.imageUrl}
          cookDate={recipe.cookDate}
          rating={recipe.rating}
          isPopular={recipe.isPopular}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;