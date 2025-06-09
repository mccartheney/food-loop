'use client';

import { motion } from 'framer-motion';
import { FiClock, FiTrendingUp, FiPackage } from 'react-icons/fi';
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

interface PantryRecentItemsListProps {
  items: PantryDisplayItem[];
  getItemIcon: (type: string) => React.ReactNode;
  containerVariants: any;
  itemVariants: any;
}

export default function PantryRecentItemsList({
  items,
  getItemIcon,
  containerVariants,
  itemVariants,
}: PantryRecentItemsListProps) {
  if (items.length === 0) return null;

  // Sort by date added, most recent first
  const recentItems = [...items]
    .sort((a, b) => new Date(b.dateBought).getTime() - new Date(a.dateBought).getTime())
    .slice(0, 5); // Show 5 most recent items

  // Get items added today and this week
  const today = new Date();
  const todayItems = recentItems.filter(item => {
    const addedDate = new Date(item.dateBought);
    return addedDate.toDateString() === today.toDateString();
  });

  const thisWeekItems = recentItems.filter(item => {
    const addedDate = new Date(item.dateBought);
    const daysAgo = Math.ceil((today.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysAgo <= 7;
  });

  const formatTimeAgo = (dateString: string) => {
    const addedDate = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - addedDate.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    if (diffDays <= 7) return `${diffDays} dias atrás`;
    return addedDate.toLocaleDateString('pt-BR');
  };

  return (
    <motion.div
      className={`${styles.recentItemsList} rounded-2xl p-6 mb-6 ${styles.customScroll}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          className="text-xl font-bold text-gray-800 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white shadow-lg"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FiClock size={20} />
          </motion.div>
          Adicionados Recentemente
        </motion.h2>

        <motion.div 
          className="flex items-center gap-4 text-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {todayItems.length > 0 && (
            <div className="flex items-center gap-1 text-green-600">
              <FiTrendingUp size={14} />
              <span className="font-medium">{todayItems.length} hoje</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-blue-600">
            <FiPackage size={14} />
            <span className="font-medium">{thisWeekItems.length} esta semana</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {recentItems.map((item, index) => (
          <motion.div
            key={item.id}
            className={`${styles.recentItem} flex items-center gap-4 p-4 rounded-xl`}
            variants={itemVariants}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
            whileHover={{
              x: 6,
              transition: { duration: 0.2 }
            }}
          >
            {/* Item Icon */}
            <motion.div
              className="w-12 h-12 flex-shrink-0 rounded-full bg-white bg-opacity-80 flex items-center justify-center shadow-md border-2 border-white border-opacity-50"
              whileHover={{ scale: 1.15, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {getItemIcon(item.type)}
            </motion.div>

            {/* Item Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700 font-medium">
                  {item.quantity} {item.quantity === 1 ? 'unidade' : 'unidades'}
                </span>
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <FiClock size={12} />
                {formatTimeAgo(item.dateBought)}
              </p>
            </div>

            {/* Expiration indicator */}
            <div className="flex flex-col items-end">
              {item.expire_date !== 'N/A' && (
                <motion.div
                  className="text-xs text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  Vence: {new Date(item.expire_date).toLocaleDateString('pt-BR')}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Button */}
      {items.length > 5 && (
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.button
            className={`${styles.secondaryButton} px-6 py-2 rounded-xl font-medium`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver todos os {items.length} itens
          </motion.button>
        </motion.div>
      )}

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-200 to-blue-200 opacity-10 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200 to-pink-200 opacity-10 rounded-full -ml-12 -mb-12 pointer-events-none"></div>
    </motion.div>
  );
}
