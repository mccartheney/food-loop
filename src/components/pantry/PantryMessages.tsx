// src/components/pantry/PantryMessages.tsx
import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

interface PantryMessagesProps {
  error: string | null;
  successMessage: string | null;
  onClearError: () => void;
  onClearSuccess: () => void;
}

export default function PantryMessages({
  error,
  successMessage,
  onClearError,
  onClearSuccess,
}: PantryMessagesProps) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          role="alert"
          className="alert alert-error mb-6 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <FiAlertCircle size={24} />
          <div>
            <h3 className="font-bold">Error!</h3>
            <div className="text-xs">{error}</div>
          </div>
          <motion.button
            className="btn btn-sm btn-ghost"
            onClick={onClearError}
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.9 }}
          >
            Dismiss
          </motion.button>
        </motion.div>
      )}
      {successMessage && (
        <motion.div
          role="alert"
          className="alert alert-success mb-6 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <FiCheckCircle size={24} />
          <div>
            <h3 className="font-bold">Success!</h3>
            <div className="text-xs">{successMessage}</div>
          </div>
          <motion.button
            className="btn btn-sm btn-ghost"
            onClick={onClearSuccess}
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.9 }}
          >
            Dismiss
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
