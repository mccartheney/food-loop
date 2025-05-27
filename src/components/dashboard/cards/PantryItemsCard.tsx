'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const pantryItems = [
  {
    id: 1, 
    name: 'Sliced wheat bread',
    icon: 'bread',
    iconColor: 'bg-amber-200',
    date: '12/04/2023'
  },
  {
    id: 2,
    name: 'Rice',
    icon: 'rice',
    iconColor: 'bg-amber-100',
    date: '11/04/2023'
  },
  {
    id: 3,
    name: 'Pasta',
    icon: 'pasta',
    iconColor: 'bg-yellow-200',
    date: '11/04/2023'
  },
  {
    id: 4,
    name: 'Canned beans',
    icon: 'beans',
    iconColor: 'bg-red-200',
    date: '10/04/2023'
  },
  {
    id: 5,
    name: 'Fresh vegetables',
    icon: 'vegetables',
    iconColor: 'bg-green-200',
    date: '10/04/2023'
  },
  {
    id: 6,
    name: 'Fresh fruits',
    icon: 'fruits',
    iconColor: 'bg-orange-200',
    date: '09/04/2023'
  }
];

const getIcon = (icon: string, color: string) => {
  return <div className={`w-6 h-6 rounded ${color}`}></div>;
};

const PantryItemsCard: React.FC = () => {
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
      transition={{ duration: 0.3 }}
      className="card bg-base-100 shadow-sm h-full"
    >
      <div className="px-4 py-3 border-b flex items-center">
        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
        <h2 className="text-sm font-medium">Last items added on the pantry</h2>
      </div>
      
      <div className="card-body p-0">
        <ul className="divide-y divide-gray-100">
          {pantryItems.map((item) => (
            <motion.li 
              key={item.id}
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
              className={`flex items-center justify-between px-4 py-2 ${isMobile ? 'py-3' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className={`${isMobile ? 'w-7 h-7' : 'w-8 h-8'} rounded-md flex items-center justify-center bg-gray-50`}>
                  {getIcon(item.icon, item.iconColor)}
                </div>
                <span className="text-xs">{item.name}</span>
              </div>
              <span className="text-xs text-gray-400">{item.date}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default PantryItemsCard;