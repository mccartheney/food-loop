// src/components/pantry/PantryItemsGrid.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiTrash2, FiX, FiSearch } from 'react-icons/fi';

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
    // Show "no results" when searching
    return (
      <motion.div
        className="text-center py-10 card bg-base-200 p-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <FiSearch size={48} className="mx-auto mb-4 text-neutral-content opacity-50" />
        </motion.div>
        <motion.p
          className="text-lg text-neutral-content opacity-70"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          No items match your search.
        </motion.p>
        <motion.button
          className="btn btn-sm btn-outline mt-4"
          onClick={onClearSearch}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiX className="mr-2" /> Clear Search
        </motion.button>
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
      {filteredItems.map(item => (
        <motion.div
          key={item.id}
          className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          {item.img && (
            <motion.figure
              className="h-48 overflow-hidden relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={item.img} alt={item.name} layout="fill" objectFit="cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </motion.figure>
          )}
          <div className="card-body p-5">
            <h3 className="card-title text-lg truncate" title={item.name}>{item.name}</h3>
            <div className="flex items-center">
              <span className="text-sm font-semibold mr-2">Quantity:</span>
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="btn btn-xs btn-circle btn-outline"
                  aria-label={`Decrease quantity of ${item.name}`}
                  whileHover={{
                    scale: 1.2,
                    backgroundColor: "#FEE2E2",
                    borderColor: "#EF4444",
                    color: "#EF4444"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  -
                </motion.button>
                <motion.span
                  className="font-medium"
                  key={item.quantity}
                  initial={{ scale: 1.2, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.quantity}
                </motion.span>
                <motion.button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="btn btn-xs btn-circle btn-outline"
                  aria-label={`Increase quantity of ${item.name}`}
                  whileHover={{
                    scale: 1.2,
                    backgroundColor: "#DCFCE7",
                    borderColor: "#22C55E",
                    color: "#22C55E"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  +
                </motion.button>
              </div>
            </div>
            <p className="text-sm"><span className="font-semibold">Type:</span> {formatItemTypeLabel(item.type)}</p>
            <p className={`text-sm ${item.expire_date === 'N/A' || new Date(item.expire_date) > new Date() ? '' : 'text-error font-semibold'}`}>
              <span className="font-semibold">Expires:</span> {item.expire_date}
            </p>
            <p className="text-xs text-gray-500"><span className="font-semibold">Added:</span> {item.dateBought}</p>
            <div className="card-actions justify-end mt-4">
              <motion.button
                onClick={() => onDeleteItem(item.id)}
                className="btn btn-error btn-sm btn-outline"
                aria-label={`Delete ${item.name}`}
                whileHover={{ scale: 1.05, backgroundColor: "#FCA5A5" }}
                whileTap={{ scale: 0.95 }}
              >
                <FiTrash2 /> Delete
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
