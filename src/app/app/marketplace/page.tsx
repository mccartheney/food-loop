'use client';

import { useState, useMemo, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiFilter, FiGrid, FiList, FiSearch, FiX, FiMapPin, FiDollarSign } from 'react-icons/fi';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProductGrid from '@/components/marketplace/ProductGrid';
import MarketplaceListView from '@/components/marketplace/MarketplaceListView';
import MarketplaceSidebar from '@/components/marketplace/MarketplaceSidebar';
import MarketplaceStatsHeader from '@/components/marketplace/MarketplaceStatsHeader';
import MarketplaceSearchBar from '@/components/marketplace/MarketplaceSearchBar';
import styles from './styles.module.css';

export interface Product {
  id: string;
  name: string;
  location: string;
  price: string;
  imageUrl?: string;
}

// Enhanced mock products with more variety
const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Rice', location: 'Yours', price: '2.50', imageUrl: '/images/marketplace/rice.jpg' },
  { id: '2', name: 'Black Beans', location: 'Nearby', price: '1.80', imageUrl: '/images/marketplace/beans.jpg' },
  { id: '3', name: 'Pasta', location: 'Downtown', price: '3.20', imageUrl: '/images/marketplace/pasta.jpg' },
  { id: '4', name: 'Olive Oil', location: 'Yours', price: '4.50', imageUrl: '/images/marketplace/oil.jpg' },
  { id: '5', name: 'Tomatoes', location: 'North Area', price: '1.20', imageUrl: '/images/marketplace/tomatoes.jpg' },
  { id: '6', name: 'Bread Flour', location: 'Nearby', price: '2.80', imageUrl: '/images/marketplace/flour.jpg' },
  { id: '7', name: 'Cheddar Cheese', location: 'Downtown', price: '5.20', imageUrl: '/images/marketplace/cheese.jpg' },
  { id: '8', name: 'Fresh Apples', location: 'Yours', price: '3.00', imageUrl: '/images/marketplace/apples.jpg' },
  { id: '9', name: 'Chicken Breast', location: 'Nearby', price: '6.80', imageUrl: '/images/marketplace/chicken.jpg' },
  { id: '10', name: 'Whole Milk', location: 'North Area', price: '1.50', imageUrl: '/images/marketplace/milk.jpg' },
  { id: '11', name: 'Mixed Spices', location: 'Downtown', price: '2.20', imageUrl: '/images/marketplace/spices.jpg' },
  { id: '12', name: 'Tomato Sauce', location: 'Yours', price: '1.80', imageUrl: '/images/marketplace/sauce.jpg' },
  { id: '13', name: 'Carrots', location: 'Nearby', price: '1.40', imageUrl: '/images/marketplace/carrots.jpg' },
  { id: '14', name: 'Brown Rice', location: 'Downtown', price: '3.50', imageUrl: '/images/marketplace/brown-rice.jpg' },
  { id: '15', name: 'Greek Yogurt', location: 'North Area', price: '2.60', imageUrl: '/images/marketplace/yogurt.jpg' },
  { id: '16', name: 'Granola', location: 'Yours', price: '4.20', imageUrl: '/images/marketplace/granola.jpg' }
];

export default function MarketplacePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState<'all' | 'name' | 'location'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return MOCK_PRODUCTS;
    }

    const searchLower = searchQuery.toLowerCase();
    
    return MOCK_PRODUCTS.filter(product => {
      switch (searchCategory) {
        case 'name':
          return product.name.toLowerCase().includes(searchLower);
        case 'location':
          return product.location.toLowerCase().includes(searchLower);
        case 'all':
        default:
          return (
            product.name.toLowerCase().includes(searchLower) ||
            product.location.toLowerCase().includes(searchLower)
          );
      }
    });
  }, [searchQuery, searchCategory]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // The filtering happens automatically via the useMemo
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleProductClick = (productId: string) => {
    router.push(`/app/marketplace/${productId}`);
  };

  const handleCategoryFilter = (categories: string[]) => {
    // TODO: Implement category filtering
    console.log('Category filter:', categories);
  };

  const handlePriceFilter = (min: number, max: number) => {
    // TODO: Implement price filtering
    console.log('Price filter:', min, max);
  };

  const handleLocationFilter = (locations: string[]) => {
    // TODO: Implement location filtering
    console.log('Location filter:', locations);
  };

  return (
    <DashboardLayout>
      <motion.div 
        className="container mx-auto p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Stats Header */}
        <MarketplaceStatsHeader products={MOCK_PRODUCTS} />

        {/* Search Bar */}
        <MarketplaceSearchBar
          searchTerm={searchQuery}
          searchCategory={searchCategory}
          onSearchTermChange={setSearchQuery}
          onSearchCategoryChange={setSearchCategory}
          onClearSearch={clearSearch}
          onSearch={handleSearch}
          totalProducts={MOCK_PRODUCTS.length}
          filteredCount={filteredProducts.length}
        />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <MarketplaceSidebar 
              searchQuery={searchQuery} 
              onSearch={setSearchQuery}
              onCategoryFilter={handleCategoryFilter}
              onPriceFilter={handlePriceFilter}
              onLocationFilter={handleLocationFilter}
            />
          </div>

          {/* Mobile Filters */}
          <div className="lg:hidden mb-4">
            <div className="flex justify-between items-center mb-4">
              <motion.h2 
                className="text-2xl font-bold flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FiShoppingBag className="mr-2 text-primary" />
                Produtos Disponíveis
              </motion.h2>
              
              <label htmlFor="sidebar-drawer" className="btn btn-primary btn-sm drawer-button">
                <FiFilter className="mr-2" />
                Filtros
              </label>
            </div>
            
            {/* Mobile Drawer */}
            <div className="drawer drawer-end z-30">
              <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-side">
                <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
                <div className="w-80 min-h-full bg-base-100 text-base-content overflow-y-auto">
                  <div className="p-4">
                    <MarketplaceSidebar 
                      searchQuery={searchQuery} 
                      onSearch={setSearchQuery}
                      onCategoryFilter={handleCategoryFilter}
                      onPriceFilter={handlePriceFilter}
                      onLocationFilter={handleLocationFilter}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Products Header with View Toggle */}
            <motion.div
              className="flex justify-between items-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <motion.h2 
                className="text-2xl font-semibold hidden lg:block"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                Produtos Disponíveis {searchQuery && <span className="text-sm font-normal">(filtrados)</span>}
              </motion.h2>
              
              {/* View Toggle */}
              <motion.div 
                className={`btn-group ${styles.viewToggle}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button 
                  className={`btn btn-sm ${viewMode === 'grid' ? `btn-active ${styles.viewToggleActive}` : ''}`} 
                  onClick={() => setViewMode('grid')}
                  title="Vista em Grade"
                  whileHover={{ backgroundColor: viewMode !== 'grid' ? "rgba(0,0,0,0.05)" : undefined }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiGrid size={16} />
                </motion.button>
                <motion.button 
                  className={`btn btn-sm ${viewMode === 'list' ? `btn-active ${styles.viewToggleActive}` : ''}`} 
                  onClick={() => setViewMode('list')}
                  title="Vista em Lista"
                  whileHover={{ backgroundColor: viewMode !== 'list' ? "rgba(0,0,0,0.05)" : undefined }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiList size={16} />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Products Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {viewMode === 'grid' ? (
                  <ProductGrid 
                    products={filteredProducts}
                    onProductClick={handleProductClick}
                    searchTerm={searchQuery}
                    onClearSearch={clearSearch}
                  />
                ) : (
                  <MarketplaceListView
                    products={filteredProducts}
                    onProductClick={handleProductClick}
                    searchTerm={searchQuery}
                    onClearSearch={clearSearch}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
