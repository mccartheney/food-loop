'use client';

import { motion } from 'framer-motion';
import { FiShoppingBag, FiMapPin, FiTrendingUp, FiDollarSign, FiPackage, FiStar } from 'react-icons/fi';
import { Product } from '@/app/app/marketplace/page';
import styles from '../../app/app/marketplace/styles.module.css';

interface MarketplaceStatsHeaderProps {
  products: Product[];
}

const MarketplaceStatsHeader: React.FC<MarketplaceStatsHeaderProps> = ({ products }) => {
  // Calculate statistics
  const totalProducts = products.length;
  
  // Calculate unique locations
  const uniqueLocations = [...new Set(products.map(p => p.location))];
  
  // Calculate price categories
  const economicProducts = products.filter(p => parseFloat(p.price) <= 2);
  const mediumProducts = products.filter(p => parseFloat(p.price) > 2 && parseFloat(p.price) <= 4);
  const premiumProducts = products.filter(p => parseFloat(p.price) > 4);
  
  // Calculate average price
  const averagePrice = products.length > 0 
    ? (products.reduce((sum, p) => sum + parseFloat(p.price), 0) / products.length).toFixed(2)
    : '0.00';

  // Get most common location
  const locationCounts = products.reduce((acc, p) => {
    acc[p.location] = (acc[p.location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mostCommonLocation = Object.entries(locationCounts).reduce(
    (max, [location, count]) => count > max.count ? { location, count } : max,
    { location: 'N/A', count: 0 }
  );

  const stats = [
    {
      id: 'total',
      label: 'Total de Produtos',
      value: totalProducts,
      subValue: `Disponíveis agora`,
      icon: FiShoppingBag,
      color: 'text-blue-600',
      bgClass: styles.statsTotal,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'locations',
      label: 'Localizações',
      value: uniqueLocations.length,
      subValue: `${mostCommonLocation.location} (${mostCommonLocation.count})`,
      icon: FiMapPin,
      color: 'text-orange-600',
      bgClass: styles.statsLocations,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'economic',
      label: 'Económicos',
      value: economicProducts.length,
      subValue: 'Até €2.00',
      icon: FiDollarSign,
      color: 'text-green-600',
      bgClass: styles.statsEconomic,
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'premium',
      label: 'Premium',
      value: premiumProducts.length,
      subValue: 'Acima de €4.00',
      icon: FiStar,
      color: 'text-purple-600',
      bgClass: styles.statsPremium,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'average',
      label: 'Preço Médio',
      value: `€${averagePrice}`,
      subValue: 'Valor médio',
      icon: FiTrendingUp,
      color: 'text-indigo-600',
      bgClass: styles.statsCategories,
      gradient: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <motion.header 
      className={`${styles.headerGlass} rounded-2xl p-6 mb-6`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className={`text-3xl font-bold ${styles.gradientText} mb-2 flex items-center gap-3`}>
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <FiShoppingBag className="text-blue-500" />
            </motion.div>
            Marketplace FoodLoop
          </h1>
          <p className="text-gray-600">
            Descubra produtos frescos e ingredientes da sua comunidade
          </p>
        </div>
        
        {/* Quick Summary */}
        <motion.div 
          className="flex items-center gap-4 mt-4 lg:mt-0"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalProducts}</div>
            <div className="text-xs text-gray-600">Produtos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{uniqueLocations.length}</div>
            <div className="text-xs text-gray-600">Locais</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">€{averagePrice}</div>
            <div className="text-xs text-gray-600">Médio</div>
          </div>
        </motion.div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            className={`${styles.statsCard} ${stat.bgClass} rounded-xl p-4 text-center`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.1 + 0.5, 
              duration: 0.4,
              type: "spring",
              stiffness: 300
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div 
              className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r ${stat.gradient} text-white mb-3`}
              whileHover={{ 
                rotate: 360,
                transition: { duration: 0.5 }
              }}
            >
              <stat.icon size={20} />
            </motion.div>
            
            <motion.div 
              className={`text-2xl font-bold ${stat.color} mb-1`}
              key={stat.value}
              initial={{ scale: 1.2, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {stat.value}
            </motion.div>
            
            <div className="text-sm font-medium text-gray-800 mb-1">
              {stat.label}
            </div>
            
            <div className="text-xs text-gray-600">
              {stat.subValue}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Market Insights */}
      <motion.div 
        className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {/* Price Distribution */}
        <motion.div 
          className={`${styles.alertSuccess} rounded-lg p-4`}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <FiDollarSign className="text-green-600" size={20} />
            <div>
              <div className="font-medium">Distribuição de Preços</div>
              <div className="text-sm opacity-80">
                {Math.round((economicProducts.length / totalProducts) * 100)}% económicos, {Math.round((premiumProducts.length / totalProducts) * 100)}% premium
              </div>
            </div>
          </div>
        </motion.div>

        {/* Location Diversity */}
        <motion.div 
          className={`${styles.alertWarning} rounded-lg p-4`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <FiMapPin className="text-orange-600" size={20} />
            <div>
              <div className="font-medium">Disponibilidade Local</div>
              <div className="text-sm opacity-80">
                {uniqueLocations.length} localizações ativas
              </div>
            </div>
          </div>
        </motion.div>

        {/* Market Health */}
        <motion.div 
          className={`${styles.alertSuccess} rounded-lg p-4 md:col-span-2 lg:col-span-1`}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <FiTrendingUp className="text-green-600" size={20} />
            <div>
              <div className="font-medium">Marketplace Ativo 🎉</div>
              <div className="text-sm opacity-80">
                {totalProducts} produtos disponíveis para compra
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.header>
  );
};

export default MarketplaceStatsHeader;
