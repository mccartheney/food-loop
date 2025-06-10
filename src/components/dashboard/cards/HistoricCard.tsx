'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiClock, FiArrowRight, FiShoppingBag, FiPackage, FiTrendingUp, FiCalendar } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import styles from '../../../app/app/styles.module.css';

const historyItems = [
  { 
    id: 1, 
    name: 'Purchase at Pingo Doce', 
    value: '26',
    type: 'grocery',
    date: '2 days ago',
    status: 'completed',
    icon: '🛒'
  },
  { 
    id: 2, 
    name: 'Pasta Primavera Recipe', 
    value: '14',
    type: 'recipe',
    date: '3 days ago',
    status: 'completed',
    icon: '👨‍🍳'
  },
  { 
    id: 3, 
    name: 'Addition to Pantry', 
    value: '18',
    type: 'pantry',
    date: '4 days ago',
    status: 'completed',
    icon: '📦'
  },
  { 
    id: 4, 
    name: 'Marketplace - Rice', 
    value: '20',
    type: 'marketplace',
    date: '5 days ago',
    status: 'pending',
    icon: '🛍️'
  },
  { 
    id: 5, 
    name: 'Continente Box', 
    value: '15',
    type: 'box',
    date: '1 week ago',
    status: 'completed',
    icon: '📋'
  },
];

const HistoricCard: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'grocery': return 'bg-blue-500';
      case 'recipe': return 'bg-purple-500';
      case 'pantry': return 'bg-green-500';
      case 'marketplace': return 'bg-orange-500';
      case 'box': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };
  
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
            <h2 className="text-sm font-semibold text-gray-800">Activity History</h2>
            <p className="text-xs text-gray-600">Your recent actions</p>
          </div>
        </div>
        
        <motion.button
          className="text-orange-600 hover:text-orange-800 p-1"
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => console.log('Navigate to full history')} // TODO: Add history route
        >
          <FiArrowRight size={16} />
        </motion.button>
      </div>
      
      <div className="card-body p-0">
        <ul className="divide-y divide-gray-50">
          {historyItems.map((item, index) => (
            <motion.li 
              key={item.id}
              className={`${styles.listItem} flex items-center justify-between px-4 py-3 cursor-pointer`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.4 + index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => console.log('View activity details:', item.id)}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} ${getTypeColor(item.type)} rounded-lg flex items-center justify-center text-white shadow-sm`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-sm">{item.icon}</span>
                </motion.div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status === 'completed' ? '✓' : '⏳'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <FiCalendar size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-gray-700">
                  {item.value}
                </div>
                <div className="text-xs text-gray-500">
                  items
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
        
        {/* Activity Summary */}
        <motion.div 
          className="p-4 bg-gradient-to-t from-orange-50 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">
                {historyItems.filter(item => item.status === 'completed').length}
              </div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600">
                {historyItems.filter(item => item.status === 'pending').length}
              </div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
          </div>
          
          <motion.button
            className="w-full btn btn-outline btn-sm rounded-xl border-orange-200 text-orange-600 hover:bg-orange-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => console.log('Navigate to full history')}
          >
            View Full History
            <FiArrowRight className="ml-2" size={14} />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HistoricCard;