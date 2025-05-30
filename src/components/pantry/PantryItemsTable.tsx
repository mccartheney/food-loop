// src/components/pantry/PantryItemsTable.tsx
import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';

interface PantryDisplayItem {
  id: string;
  name: string;
  quantity: number;
  expire_date: string;
  type: string;
  img?: string | null;
  dateBought: string;
}

interface PantryItemsTableProps {
  items: PantryDisplayItem[];
  isLoading: boolean;
  error: string | null;
  filteredItems: PantryDisplayItem[];
  containerVariants: any;
  itemVariants: any;
  formatItemTypeLabel: (type: string) => string;
  getItemIcon: (type: string) => React.ReactNode;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onDeleteItem: (id: string) => void;
}

export default function PantryItemsTable({
  items,
  isLoading,
  error,
  filteredItems,
  containerVariants,
  itemVariants,
  formatItemTypeLabel,
  getItemIcon,
  onUpdateQuantity,
  onDeleteItem,
}: PantryItemsTableProps) {
  if (isLoading && !items.length) {
    return (
      <motion.div
        className="flex justify-center items-center py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <span className="loading loading-spinner loading-lg text-primary" />
        </motion.div>
        <p className="ml-3">Loading your pantry items...</p>
      </motion.div>
    );
  }

  if (!filteredItems.length) {
    if (!items.length && !error) {
      return (
        <motion.div
          className="text-center py-10 card bg-base-200 p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-lg text-neutral-content opacity-70">
            Your pantry is currently empty.
          </span>
          <span className="text-sm text-neutral-content opacity-60">
            Use the form above to add your first item!
          </span>
        </motion.div>
      );
    }
    // If there are items but none match the search
    return (
      <motion.div
        className="text-center py-10 card bg-base-200 p-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-lg text-neutral-content opacity-70">
          No items match your search.
        </span>
      </motion.div>
    );
  }

  // Sort items by name for list view
  const sortedItems = [...filteredItems].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <motion.div
      className="card bg-base-100 shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="card-body p-5">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Type</th>
                <th>Expires</th>
                <th>Added</th>
                <th>Action</th>
              </tr>
            </thead>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sortedItems.map(item => (
                <motion.tr
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{
                    backgroundColor: 'rgba(0,0,0,0.03)',
                    transition: { duration: 0.2 }
                  }}
                >
                  <td className="flex items-center space-x-2">
                    <motion.div
                      className="w-8 h-8 flex-shrink-0 rounded-full bg-base-200 flex items-center justify-center"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {getItemIcon(item.type)}
                    </motion.div>
                    <span className="font-medium">{item.name}</span>
                  </td>
                  <td>
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
                  </td>
                  <td>{formatItemTypeLabel(item.type)}</td>
                  <td className={item.expire_date === 'N/A' || new Date(item.expire_date) > new Date() ? '' : 'text-error font-semibold'}>
                    {item.expire_date}
                  </td>
                  <td>{new Date(item.dateBought).toLocaleDateString()}</td>
                  <td>
                    <motion.button
                      onClick={() => onDeleteItem(item.id)}
                      className="btn btn-error btn-xs btn-outline"
                      aria-label={`Delete ${item.name}`}
                      whileHover={{ scale: 1.05, backgroundColor: "#FCA5A5" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiTrash2 /> Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
