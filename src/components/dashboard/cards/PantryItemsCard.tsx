'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiPackage, FiClock, FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styles from '../../../app/app/styles.module.css';

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  expire_date: string;
  type: string;
  img?: string;
  dateBought: string;
}

const getIcon = (icon: string, color: string) => {
  return <div className={`w-6 h-6 rounded ${color}`}></div>;
};

const PantryItemsCard: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchPantryItems = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/pantry?email=${encodeURIComponent(session.user.email)}`);
        const data = await response.json();
        
        if (data.items) {
          // Sort by dateBought descending and take last 6 items
          const sortedItems = data.items
            .sort((a: PantryItem, b: PantryItem) => 
              new Date(b.dateBought).getTime() - new Date(a.dateBought).getTime()
            )
            .slice(0, 6);
          
          setPantryItems(sortedItems);
        }
      } catch (error) {
        console.error('Error fetching pantry items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPantryItems();
  }, [session]);

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getItemTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'vegetables': return 'bg-green-200';
      case 'fruits': return 'bg-orange-200';
      case 'meat': return 'bg-red-200';
      case 'dairy': return 'bg-blue-200';
      case 'grains_cereals': return 'bg-amber-200';
      case 'bakery': return 'bg-yellow-200';
      default: return 'bg-gray-200';
    }
  };

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
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : pantryItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FiPackage size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhum item na despensa</p>
            <p className="text-xs">Adicione itens para começar</p>
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
                    <div className={`w-6 h-6 rounded ${getItemTypeColor(item.type)}`}></div>
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
                  <span className="text-xs text-gray-400">
                    {new Date(item.dateBought).toLocaleDateString('pt-PT')}
                  </span>
                  <div className="flex justify-end mt-1">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                      {item.quantity}x
                    </span>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
        
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
