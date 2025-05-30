// src/components/pantry/PantryRecentItemsList.tsx
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import { GiOrange } from 'react-icons/gi';
import { ItemType } from '@prisma/client';

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
    .slice(0, 7);

  return (
    <motion.div
      className="card bg-base-100 shadow-lg mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-body p-5">
        <motion.h2
          className="text-lg font-semibold flex items-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="badge badge-primary mr-2">
            <FiClock className="mr-1" />
          </span>
          Last Items added to the pantry
        </motion.h2>
        <motion.div
          className="divide-y"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {recentItems.map(item => (
            <motion.div
              key={item.id}
              className="py-3 flex items-center"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                backgroundColor: 'rgba(0,0,0,0.02)',
                transition: { duration: 0.2 }
              }}
            >
              <motion.div
                className="w-10 h-10 flex-shrink-0 rounded-full bg-base-200 flex items-center justify-center mr-3"
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {getItemIcon(item.type)}
              </motion.div>
              <div className="flex-grow">
                <p className="font-medium">
                  {item.quantity} {item.name}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(item.dateBought).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
