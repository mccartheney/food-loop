'use client';

import { motion } from 'framer-motion';
import { FiPackage, FiAlertTriangle, FiX, FiTrendingUp, FiClock } from 'react-icons/fi';
import styles from '../../app/app/pantry/styles.module.css';

interface PantryDisplayItem {
  id: string;
  name: string;
  quantity: number;
  expire_date: string;
  type: string;
  img?: string | null;
  dateBought: string;
}

interface PantryStatsHeaderProps {
  items: PantryDisplayItem[];
}

const PantryStatsHeader: React.FC<PantryStatsHeaderProps> = ({ items }) => {
  // Calculate statistics
  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate expiration status
  const today = new Date();
  const expiredItems = items.filter(item => {
    if (item.expire_date === 'N/A') return false;
    return new Date(item.expire_date) < today;
  });
  
  const warningItems = items.filter(item => {
    if (item.expire_date === 'N/A') return false;
    const expireDate = new Date(item.expire_date);
    const daysUntilExpire = Math.ceil((expireDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpire <= 7 && daysUntilExpire >= 0;
  });
  
  const freshItems = items.filter(item => {
    if (item.expire_date === 'N/A') return true;
    const expireDate = new Date(item.expire_date);
    const daysUntilExpire = Math.ceil((expireDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpire > 7;
  });

  // Recent additions (last 7 days)
  const recentItems = items.filter(item => {
    const addedDate = new Date(item.dateBought);
    const daysAgo = Math.ceil((today.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysAgo <= 7;
  });

  const stats = [
    {
      id: 'total',
      label: 'Total de Itens',
      value: totalItems,
      subValue: `${totalQuantity} unidades`,
      icon: FiPackage,
      color: 'text-blue-600',
      bgClass: styles.statsTotal,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'fresh',
      label: 'Itens Frescos',
      value: freshItems.length,
      subValue: `${Math.round((freshItems.length / totalItems) * 100) || 0}% do total`,
      icon: FiTrendingUp,
      color: 'text-green-600',
      bgClass: styles.statsFresh,
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'warning',
      label: 'Vencendo Soon',
      value: warningItems.length,
      subValue: 'Próximos 7 dias',
      icon: FiAlertTriangle,
      color: 'text-yellow-600',
      bgClass: styles.statsWarning,
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'expired',
      label: 'Vencidos',
      value: expiredItems.length,
      subValue: 'Necessitam atenção',
      icon: FiX,
      color: 'text-red-600',
      bgClass: styles.statsExpired,
      gradient: 'from-red-500 to-red-600'
    },
    {
      id: 'recent',
      label: 'Adicionados',
      value: recentItems.length,
      subValue: 'Últimos 7 dias',
      icon: FiClock,
      color: 'text-purple-600',
      bgClass: styles.statsTotal,
      gradient: 'from-purple-500 to-purple-600'
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
          <h1 className="text-3xl font-bold gradient-text mb-2 flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <FiPackage className="text-green-500" />
            </motion.div>
            Sua Despensa Digital
          </h1>
          <p className="text-gray-600">
            Gerencie seus alimentos de forma inteligente e eficiente
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
            <div className="text-2xl font-bold text-green-600">{totalItems}</div>
            <div className="text-xs text-gray-600">Tipos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalQuantity}</div>
            <div className="text-xs text-gray-600">Unidades</div>
          </div>
          {expiredItems.length > 0 && (
            <motion.div 
              className="text-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="text-2xl font-bold text-red-600">{expiredItems.length}</div>
              <div className="text-xs text-red-600">Vencidos</div>
            </motion.div>
          )}
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

      {/* Alerts for expired/warning items */}
      {(expiredItems.length > 0 || warningItems.length > 0) && (
        <motion.div 
          className="mt-6 space-y-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {expiredItems.length > 0 && (
            <motion.div 
              className={`${styles.alertError} rounded-lg p-3 flex items-center gap-3`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.3 }}
            >
              <FiX className="text-red-600" size={20} />
              <div>
                <div className="font-medium">
                  {expiredItems.length} item{expiredItems.length > 1 ? 'ns' : ''} vencido{expiredItems.length > 1 ? 's' : ''}
                </div>
                <div className="text-sm opacity-80">
                  Considere remover ou usar estes itens com cuidado
                </div>
              </div>
            </motion.div>
          )}
          
          {warningItems.length > 0 && (
            <motion.div 
              className={`${styles.alertWarning} rounded-lg p-3 flex items-center gap-3`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.3 }}
            >
              <FiAlertTriangle className="text-yellow-600" size={20} />
              <div>
                <div className="font-medium">
                  {warningItems.length} item{warningItems.length > 1 ? 'ns' : ''} vencendo em breve
                </div>
                <div className="text-sm opacity-80">
                  Use nos próximos 7 dias para evitar desperdício
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
      
      {/* Success message for good pantry management */}
      {expiredItems.length === 0 && warningItems.length === 0 && totalItems > 0 && (
        <motion.div 
          className={`${styles.alertSuccess} rounded-lg p-3 flex items-center gap-3 mt-6`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <FiTrendingUp className="text-green-600" size={20} />
          <div>
            <div className="font-medium">Despensa bem organizada! 🎉</div>
            <div className="text-sm opacity-80">
              Todos os seus itens estão frescos e bem conservados
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default PantryStatsHeader;
