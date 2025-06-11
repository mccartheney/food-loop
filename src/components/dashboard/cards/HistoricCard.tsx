'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiClock, FiArrowRight, FiCalendar } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { 
  useHistory, 
  formatTimeAgo, 
  getActivityTypeColor,
  type HistoryActivity 
} from '@/lib/hooks/useHistory';
import styles from '../../../app/app/styles.module.css';

const HistoricCard: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  
  // Use the custom hook for history data
  const { data: historyData, loading } = useHistory({ 
    limit: 4, 
    days: 7 
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getDisplayValue = (activity: HistoryActivity) => {
    switch (activity.type) {
      case 'ITEM_ADDED':
        return activity.metadata.itemQuantity?.toString() || '1';
      case 'TRADE_CREATED':
      case 'TRADE_COMPLETED':
        return activity.metadata.offeredItems?.toString() || '1';
      case 'RECIPE_CREATED':
        return activity.metadata.ingredientsCount?.toString() || '1';
      case 'FRIEND_ADDED':
      case 'FRIEND_REQUEST_SENT':
        return '1';
      default:
        return '1';
    }
  };

  const getDisplayUnit = (activity: HistoryActivity) => {
    switch (activity.type) {
      case 'ITEM_ADDED': return 'itens';
      case 'TRADE_CREATED':
      case 'TRADE_COMPLETED': return 'itens';
      case 'RECIPE_CREATED': return 'ingredientes';
      case 'FRIEND_ADDED':
      case 'FRIEND_REQUEST_SENT': return 'amigo';
      default: return 'itens';
    }
  };

  const handleActivityClick = (activity: HistoryActivity) => {
    switch (activity.type) {
      case 'TRADE_CREATED':
      case 'TRADE_COMPLETED':
        if (activity.metadata.tradeId) {
          router.push(`/app/marketplace/${activity.metadata.tradeId}`);
        }
        break;
      case 'RECIPE_CREATED':
        if (activity.metadata.recipeId) {
          router.push(`/app/recipes/${activity.metadata.recipeId}`);
        }
        break;
      case 'ITEM_ADDED':
        router.push('/app/pantry');
        break;
      case 'FRIEND_ADDED':
      case 'FRIEND_REQUEST_SENT':
        router.push('/app/friends');
        break;
      default:
        break;
    }
  };

  const navigateToHistory = () => {
    router.push('/app/history');
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className={`${styles.dashboardCard} ${styles.historicCard} rounded-2xl shadow-lg h-full overflow-hidden`}
      >
        <div className={`${styles.cardHeader} px-4 py-3 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <FiClock className="text-orange-600" size={20} />
            <div>
              <h2 className="text-sm font-semibold text-gray-800">Histórico de Atividades</h2>
              <p className="text-xs text-gray-600">Carregando...</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mt-1"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  const activities = historyData?.activities || [];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className={`${styles.dashboardCard} ${styles.historicCard} rounded-2xl shadow-lg h-full overflow-hidden`}
    >
      <div className={`${styles.cardHeader} px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: -360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <FiClock className="text-orange-600" size={20} />
          </motion.div>
          <div>
            <h2 className="text-sm font-semibold text-gray-800">Histórico de Atividades</h2>
            <p className="text-xs text-gray-600">Suas ações recentes</p>
          </div>
        </div>
        
        <motion.button
          className="text-orange-600 hover:text-orange-800 p-1"
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          onClick={navigateToHistory}
        >
          <FiArrowRight size={16} />
        </motion.button>
      </div>
      
      <div className="card-body p-0">
        {activities.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FiClock size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-sm">Nenhuma atividade recente</p>
            <p className="text-xs mt-1">As suas ações aparecerão aqui</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {activities.map((activity, index) => (
              <motion.li 
                key={activity.id}
                className={`${styles.listItem} flex items-center justify-between px-4 py-3 cursor-pointer`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => handleActivityClick(activity)}
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} ${getActivityTypeColor(activity.type)} rounded-lg flex items-center justify-center text-white shadow-sm`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-sm">{activity.icon}</span>
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800">{activity.title}</span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        ✓
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-1">
                      {activity.description}
                    </div>
                    <div className="flex items-center gap-1">
                      <FiCalendar size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-700">
                    {getDisplayValue(activity)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {getDisplayUnit(activity)}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
        
        {/* Activity Summary */}
        <motion.div 
          className="p-4 bg-gradient-to-t from-orange-50 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {historyData?.summary && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">
                  {historyData.summary.trades + historyData.summary.items}
                </div>
                <div className="text-xs text-gray-600">Atividades</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">
                  {historyData.summary.recipes + historyData.summary.friends}
                </div>
                <div className="text-xs text-gray-600">Criações</div>
              </div>
            </div>
          )}
          
          <motion.button
            className="w-full btn btn-outline btn-sm rounded-xl border-orange-200 text-orange-600 hover:bg-orange-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={navigateToHistory}
          >
            Ver Histórico Completo
            <FiArrowRight className="ml-2" size={14} />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HistoricCard;
