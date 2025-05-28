'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const historyItems = [
  { id: 1, name: 'Order Name', value: '26' },
  { id: 2, name: 'Order Name', value: '14' },
  { id: 3, name: 'Order Name', value: '18' },
  { id: 4, name: 'Order Name', value: '20' },
  { id: 5, name: 'Order Name', value: '15' },
];

const HistoricCard: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

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
      transition={{ duration: 0.3, delay: 0.3 }}
      className="card bg-base-100 shadow-sm h-full"
    >
      <div className="px-4 py-3 border-b flex items-center">
        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
        <h2 className="text-sm font-medium">Historic</h2>
      </div>
      
      <div className="card-body p-0">
        <ul className="divide-y divide-gray-100">
          {historyItems.map((item, index) => (
            <motion.li 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.3 + index * 0.05 }}
              className={`flex items-center justify-between px-4 ${isMobile ? 'py-3' : 'py-2'}`}
            >
              <div className="flex items-center">
                <div className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} bg-gray-100 rounded-full flex items-center justify-center mr-3`}>
                  <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-4">
                      <span className="text-[0.5rem]">O</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs">{item.name}</span>
              </div>
              <span className="text-xs font-semibold">{item.value}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default HistoricCard;