'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiBox, FiArrowRight, FiCalendar, FiTruck } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import styles from '../../../app/app/styles.module.css';

const boxes = [
  { id: 1, color: 'bg-red-500', text: 'Telepizza', brand: 'Telepizza', type: 'delivery', date: '2 dias atrás', items: 3 },
  { id: 2, color: 'bg-red-500', text: 'Telepizza', brand: 'Telepizza', type: 'delivery', date: '2 dias atrás', items: 2 },
  { id: 3, color: 'bg-slate-800', text: 'Pingo Doce', brand: 'Pingo Doce', type: 'grocery', date: '1 dia atrás', items: 8 },
  { id: 4, color: 'bg-slate-800', text: 'Pingo Doce', brand: 'Pingo Doce', type: 'grocery', date: '1 dia atrás', items: 5 },
  { id: 5, color: 'bg-green-600', text: 'Continente', brand: 'Continente', type: 'grocery', date: 'Hoje', items: 12 },
  { id: 6, color: 'bg-blue-600', text: 'IKEA', brand: 'IKEA', type: 'furniture', date: 'Hoje', items: 1 }
];

const BoxesCard: React.FC = () => {
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

  const getBoxIcon = (type: string) => {
    switch (type) {
      case 'delivery': return '🍕';
      case 'grocery': return '🛒';
      case 'furniture': return '🏠';
      default: return '📦';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={`${styles.dashboardCard} ${styles.boxesCard} rounded-2xl shadow-lg h-full overflow-hidden`}
    >
      <div className={`${styles.cardHeader} px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <FiBox className="text-green-600" size={20} />
          </motion.div>
          <div>
            <h2 className="text-sm font-semibold text-gray-800">Últimas Caixas Adicionadas</h2>
            <p className="text-xs text-gray-600">Suas entregas recentes</p>
          </div>
        </div>
        
        <motion.button
          className="text-green-600 hover:text-green-800 p-1"
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => console.log('Navigate to boxes')} // TODO: Add boxes route
        >
          <FiArrowRight size={16} />
        </motion.button>
      </div>
      
      <div className={`card-body ${isMobile ? 'p-3' : 'p-4'}`}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {boxes.slice(0, 6).map((box, index) => (
            <motion.div 
              key={box.id}
              className={`${styles.boxItem} relative aspect-square rounded-xl overflow-hidden cursor-pointer`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => console.log('View box details:', box.id)}
            >
              <div className={`w-full h-full ${box.color} relative`}>
                {/* Box Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-white">
                  <div className="text-lg mb-1">{getBoxIcon(box.type)}</div>
                  <div className={`font-semibold text-center ${isMobile ? 'text-[0.6rem]' : 'text-xs'}`}>
                    {isMobile ? box.brand.slice(0, 8) : box.brand}
                  </div>
                  <div className="text-xs opacity-80 text-center">
                    {box.items} itens
                  </div>
                </div>

                {/* Date Badge */}
                <div className="absolute top-1 right-1">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-[0.5rem] text-white font-medium">
                      {box.date === 'Hoje' ? '🔥' : '📅'}
                    </span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-white text-xs font-medium">Ver Detalhes</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Box Summary */}
        <motion.div 
          className="mt-4 grid grid-cols-2 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-sm font-semibold text-green-700">{boxes.length}</div>
            <div className="text-xs text-green-600">Total de Caixas</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-sm font-semibold text-blue-700">
              {boxes.reduce((sum, box) => sum + box.items, 0)}
            </div>
            <div className="text-xs text-blue-600">Itens Totais</div>
          </div>
        </motion.div>

        {/* View All Button */}
        <motion.div 
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            className="w-full btn btn-outline btn-sm rounded-xl border-green-200 text-green-600 hover:bg-green-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => console.log('Navigate to all boxes')}
          >
            Ver Todas as Caixas
            <FiArrowRight className="ml-2" size={14} />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BoxesCard;
