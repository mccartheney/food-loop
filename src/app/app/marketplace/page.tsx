'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProductGrid from '@/components/marketplace/ProductGrid';
import MarketplaceSidebar from '@/components/marketplace/MarketplaceSidebar';

export interface Product {
  id: string;
  name: string;
  location: string;
  price: string;
  imageUrl?: string;
}

const MOCK_PRODUCTS: Product[] = Array(16).fill(null).map((_, index) => ({
  id: `product-${index + 1}`,
  name: 'Rice',
  location: 'Yours',
  price: (Math.floor(Math.random() * 5) + 1).toFixed(2),
  imageUrl: '/images/marketplace/rice.jpg',
}));

export default function MarketplacePage() {
  const router = useRouter();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredProducts(MOCK_PRODUCTS);
      return;
    }
    
    const filtered = MOCK_PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Handle product click to navigate to the product detail page
  const handleProductClick = (productId: string) => {
    router.push(`/app/marketplace/${productId}`);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="hidden md:block w-64 flex-shrink-0">
          <MarketplaceSidebar 
            searchQuery={searchQuery} 
            onSearch={handleSearch} 
          />
        </div>
        
        <div className="md:hidden mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Marketplace</h2>
            <label htmlFor="sidebar-drawer" className="btn btn-primary btn-sm drawer-button">
              Filters
            </label>
          </div>
          <div className="form-control w-full mb-4">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="drawer drawer-end z-30">
            <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
              <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
              <div className="p-4 w-64 min-h-full bg-base-100 text-base-content">
                <MarketplaceSidebar 
                  searchQuery={searchQuery} 
                  onSearch={handleSearch} 
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <ProductGrid products={filteredProducts} onProductClick={handleProductClick} />
        </div>
      </div>
    </DashboardLayout>
  );
}