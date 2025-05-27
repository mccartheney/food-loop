'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const boxRows = [
  [
    { id: 1, color: 'bg-red-500', text: 'telepizza' },
    { id: 2, color: 'bg-red-500', text: 'telepizza' },
    { id: 3, color: 'bg-slate-800', text: 'pingo doce' },
    { id: 4, color: 'bg-slate-800', text: 'pingo doce' },
  ]
];

const BoxesCard: React.FC = () => {
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
      transition={{ duration: 0.3, delay: 0.2 }}
      className="card bg-base-100 shadow-sm h-full"
    >
      <div className="px-4 py-3 border-b flex items-center">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-sm font-medium">Last added boxes</h2>
      </div>
      
      <div className={`card-body ${isMobile ? 'p-3' : 'p-4'}`}>
        <div className="grid grid-cols-4 gap-2">
          {boxRows[0].map((box) => (
            <motion.div 
              key={box.id}
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-md overflow-hidden"
            >
              <div className={`w-full h-full ${box.color} flex items-center justify-center text-white ${isMobile ? 'text-[0.6rem]' : 'text-xs'} font-medium`}>
                {isMobile ? '' : box.text}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BoxesCard;