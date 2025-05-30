import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/app/app/marketplace/page';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {products.length === 0 && (
        <div className="col-span-full py-8 text-center text-gray-500">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ProductGrid;