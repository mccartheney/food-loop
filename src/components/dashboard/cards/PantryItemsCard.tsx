'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiPackage, FiClock, FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import styles from '../../../app/app/styles.module.css';

const pantryItems = [
  {
    id: 1, 
    name: 'Sliced wheat bread',
    icon: 'bread',
    iconColor: 'bg-amber-200',
    date: '12/04/2023',
    daysAgo: 2
  },
  {
    id: 2,
    name: 'Rice',
    icon: 'rice',
    iconColor: 'bg-amber-100',
    date: '11/04/2023',
    daysAgo: 3
  },
  {
    id: 3,
    name: 'Pasta',
    icon: 'pasta',
    iconColor: 'bg-yellow-200',
    date: '11/04/2023',
    daysAgo: 3
  },
  {
    id: 4,
    name: 'Canned beans',
    icon: 'beans',
    iconColor: 'bg-red-200',
    date: '10/04/2023',
    daysAgo: 4
  },
  {
    id: 5,
    name: 'Fresh vegetables',
    icon: 'vegetables',
    iconColor: 'bg-green-200',
    date: '10/04/2023',
    daysAgo: 4
  },
  {
    id: 6,
    name: 'Fresh fruits',
    icon: 'fruits',
    iconColor: 'bg-orange-200',
    date: '09/04/2023',
    daysAgo: 5
  }
];

const getIcon = (icon: string, color: string) => {
  return <div className={`w-6 h-6 rounded ${color}`}></div>;
};

const PantryItemsCard: React.FC = () => {
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${styles.dashboardCard} ${styles.pantryCard} rounded-2xl shadow-lg h-full overflow-hidden`}
    >
      <div className={`${styles.cardHeader} px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <FiPackage className="text-blue-600" size={20} />
          </motion.div>
          <div>
            <h2 className="text-sm font-semibold text-gray-800">Últimos Itens Adicionados</h2>
            <p className="text-xs text-gray-600">Na sua despensa</p>
          </div>
        </div>
        
        <motion.button
          className="text-blue-600 hover:text-blue-800 p-1"
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push('/app/pantry')}
        >
          <FiArrowRight size={16} />
        </motion.button>
      </div>
      
      <div className="card-body p-0">
        <ul className="divide-y divide-gray-50">
          {pantryItems.map((item, index) => (
            <motion.li 
              key={item.id}
              className={`${styles.listItem} flex items-center justify-between px-4 py-3 cursor-pointer`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => router.push('/app/pantry')}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className={`${isMobile ? 'w-7 h-7' : 'w-10 h-10'} rounded-lg flex items-center justify-center bg-gradient-to-br from-white to-gray-50 shadow-sm`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {getIcon(item.icon, item.iconColor)}
                </motion.div>
                <div>
                  <span className="text-sm font-medium text-gray-800">{item.name}</span>
                  <div className="flex items-center gap-1 mt-1">
                    <FiClock size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-500">há {item.daysAgo} dias</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-xs text-gray-400">{item.date}</span>
                <div className="flex justify-end mt-1">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                    Recente
                  </span>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
        
        {/* View All Button */}
        <motion.div 
          className="p-4 bg-gradient-to-t from-gray-50 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="w-full btn btn-outline btn-sm rounded-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/app/pantry')}
          >
            Ver Toda a Despensa
            <FiArrowRight className="ml-2" size={14} />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PantryItemsCard;
