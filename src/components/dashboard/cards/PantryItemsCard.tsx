'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FiPackage, FiClock, FiArrowRight, FiLoader } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import styles from '../../../app/app/styles.module.css';

// Define interface for your pantry items from API
interface PantryItem {
  id: string;
  name: string;
  type: string;
  dateBought: string;
}

// Map item types to colors
const typeColorMap: Record<string, string> = {
  'VEGETABLES': 'bg-green-200',
  'FRUITS': 'bg-orange-200',
  'DAIRY': 'bg-blue-200',
  'MEAT': 'bg-red-200',
  'BAKERY': 'bg-amber-200',
  'GRAINS_CEREALS': 'bg-amber-100',
  'FROZEN_FOODS': 'bg-cyan-200',
  'BEVERAGES': 'bg-sky-200',
  'OTHER': 'bg-gray-300',
};

const getIcon = (type: string) => {
  const color = typeColorMap[type] || 'bg-gray-300';
  return <div className={`w-6 h-6 rounded ${color}`}></div>;
};

// Calculate days ago from date
const getDaysAgo = (dateStr: string) => {
  try {
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch (e) {
    return 0;
  }
};

// Format date from YYYY-MM-DD to DD/MM/YYYY
const formatDate = (dateStr: string) => {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (e) {
    return dateStr;
  }
};

const PantryItemsCard: React.FC = () => {
  const { data: session } = useSession();
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  // Fetch pantry items
  useEffect(() => {
    const fetchPantryItems = async () => {
      if (!session?.user?.email) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const userEmail = session.user.email;
        const response = await fetch(`/api/pantry?email=${encodeURIComponent(userEmail)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch pantry items');
        }
        
        const data = await response.json();
        
        // Sort by date added (newest first) and take only the last 6 items
        const sortedItems = data.items
          .sort((a: PantryItem, b: PantryItem) => {
            return new Date(b.dateBought).getTime() - new Date(a.dateBought).getTime();
          })
          .slice(0, 6);
        
        setPantryItems(sortedItems);
      } catch (err) {
        console.error('Error fetching pantry items:', err);
        setError('Failed to load recent items');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPantryItems();
  }, [session?.user?.email]);

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
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <FiLoader className="text-blue-600 mr-2" size={20} />
            </motion.div>
            <span className="text-sm text-gray-600">Carregando itens...</span>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-sm text-gray-500">{error}</div>
        ) : pantryItems.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">
            Ainda não há itens na sua despensa
          </div>
        ) : (
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
                    {getIcon(item.type)}
                  </motion.div>
                  <div>
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                    <div className="flex items-center gap-1 mt-1">
                      <FiClock size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-500">há {getDaysAgo(item.dateBought)} dias</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="text-xs text-gray-400">{formatDate(item.dateBought)}</span>
                  <div className="flex justify-end mt-1">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                      Recente
                    </span>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
        
        {/* View All Button - only show if there are items */}
        {!isLoading && !error && pantryItems.length > 0 && (
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
        )}
      </div>
    </motion.div>
  );
};

export default PantryItemsCard;
