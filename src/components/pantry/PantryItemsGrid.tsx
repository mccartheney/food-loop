'use client';

import { motion } from 'framer-motion';
import { FiX, FiSearch } from 'react-icons/fi';
import PantryItemCard from './PantryItemCard';
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

interface PantryItemsGridProps {
  filteredItems: PantryDisplayItem[];
  searchTerm: string;
  onClearSearch: () => void;
  containerVariants: any;
  itemVariants: any;
  formatItemTypeLabel: (type: string) => string;
  getItemIcon: (type: string) => React.ReactNode;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onDeleteItem: (id: string) => void;
}

export default function PantryItemsGrid({
  filteredItems,
  searchTerm,
  onClearSearch,
  containerVariants,
  itemVariants,
  formatItemTypeLabel,
  getItemIcon,
  onUpdateQuantity,
  onDeleteItem,
}: PantryItemsGridProps) {
  if (!filteredItems.length && searchTerm) {
    return (
      <motion.div
        className={`${styles.emptyState} rounded-2xl p-12 text-center`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <FiSearch size={64} className={`mx-auto mb-6 ${styles.emptyIcon}`} />
        </motion.div>
        <motion.h3
          className="text-2xl font-bold text-gray-800 mb-4"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Nenhum item encontrado
        </motion.h3>
        <motion.p
          className="text-gray-500 mb-6"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Tente buscar com um termo diferente ou verifique a ortografia.
        </motion.p>
        <motion.button
          onClick={onClearSearch}
          className={`px-6 py-3 rounded-xl ${styles.secondaryButton} flex items-center gap-2 mx-auto`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiX size={18} />
          <span className="font-medium">Limpar Busca</span>
        </motion.button>
      </motion.div>
    );
  }

  if (!filteredItems.length) {
    return (
      <motion.div
        className={`${styles.emptyState} rounded-2xl p-12 text-center`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <FiSearch size={64} className={`mx-auto mb-6 ${styles.emptyIcon}`} />
        </motion.div>
        <motion.h3
          className="text-2xl font-bold text-gray-800 mb-4"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Sua despensa está vazia
        </motion.h3>
        <motion.p
          className="text-gray-500"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Use o botão + para adicionar seus primeiros itens!
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filteredItems.map((item, index) => (
        <PantryItemCard
          key={item.id}
          item={item}
          index={index}
          onUpdateQuantity={onUpdateQuantity}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </motion.div>
  );
}
