import React from 'react';
import Image from 'next/image';
import { Product } from '@/app/app/marketplace/page';


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
      <figure className="relative h-40">
        <Image 
          src={product.imageUrl || '/images/placeholder-product.jpg'} 
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-t-lg"
        />
      </figure>
      <div className="card-body p-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{product.name}</h3>
          <span className="badge badge-outline">Free</span>
        </div>
        <p className="text-xs text-gray-500">{product.location}</p>
      </div>
    </div>
  );
};

export default ProductCard;