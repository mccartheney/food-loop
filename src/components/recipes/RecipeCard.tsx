import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RecipeCardProps {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  cookDate: string;
  rating: number;
  isPopular?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  subtitle,
  imageUrl,
  cookDate,
  rating,
  isPopular
}) => {
  return (
    <Link href={`/app/recipes/${id}`}>
      <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
        <figure className="relative">
          <div className="absolute top-2 left-2 z-10">
            {isPopular && (
              <span className="badge badge-sm bg-white text-gray-700 font-medium">Popular</span>
            )}
          </div>
          <div className="absolute top-2 right-2 z-10">
            <button className="btn btn-circle btn-xs bg-white border-none text-gray-600 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="h-32 w-full relative">
            <Image 
              src={imageUrl || '/images/placeholder-recipe.jpg'} 
              alt={title} 
              fill
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </figure>
        <div className="p-2">
          <h3 className="font-medium text-sm">{title}</h3>
          <div className="flex justify-between items-center mt-1">
            <div>
              <p className="text-xs text-gray-500">{subtitle}</p>
              <p className="text-xs text-gray-500">{cookDate}</p>
            </div>
            <div>
              <span className="text-xs font-semibold">{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;