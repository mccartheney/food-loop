'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiTrash2, FiPlus, FiMinus, FiCalendar, FiPackage, FiUser, FiFeather, FiDroplet, 
         FiCoffee, FiGrid, FiThermometer, FiBox } from 'react-icons/fi';
import { GiOrange } from 'react-icons/gi';
import { ItemType } from '@prisma/client';
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

interface PantryItemCardProps {
  item: PantryDisplayItem;
  index: number;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onDeleteItem: (id: string) => void;
}

const PantryItemCard: React.FC<PantryItemCardProps> = ({ 
  item, 
  index, 
  onUpdateQuantity, 
  onDeleteItem 
}) => {
  // Helper function to get item icons based on type
  const getItemIcon = (type: string) => {
    switch (type) {
      case ItemType.MEAT:
        return <FiPackage className="text-rose-500" />;
      case ItemType.VEGETABLES:
        return <FiFeather className="text-green-500" />;
      case ItemType.FRUITS:
        return <GiOrange className="text-orange-500" />;
      case ItemType.DAIRY:
        return <FiDroplet className="text-blue-500" />;
      case ItemType.BEVERAGES:
        return <FiCoffee className="text-amber-600" />;
      case ItemType.GRAINS_CEREALS:
        return <FiGrid className="text-amber-800" />;
      case ItemType.FROZEN_FOODS:
        return <FiThermometer className="text-cyan-500" />;
      default:
        return <FiBox className="text-gray-500" />;
    }
  };

  // Helper to format enum keys for display
  const formatItemTypeLabel = (typeKey: string) => {
    return typeKey
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Get category color class
  const getCategoryClass = (type: string) => {
    switch (type) {
      case ItemType.MEAT:
        return styles.categoryMeat;
      case ItemType.VEGETABLES:
        return styles.categoryVegetables;
      case ItemType.FRUITS:
        return styles.categoryFruits;
      case ItemType.DAIRY:
        return styles.categoryDairy;
      case ItemType.BEVERAGES:
        return styles.categoryBeverages;
      case ItemType.GRAINS_CEREALS:
        return styles.categoryGrains;
      case ItemType.FROZEN_FOODS:
        return styles.categoryFrozen;
      default:
        return styles.categoryBakery;
    }
  };

  // Calculate expiration status
  const getExpirationStatus = () => {
    if (item.expire_date === 'N/A') {
      return { status: 'fresh', class: styles.itemFresh, badge: styles.expirationFresh, text: 'Sem prazo' };
    }
    
    const today = new Date();
    const expireDate = new Date(item.expire_date);
    const daysUntilExpire = Math.ceil((expireDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpire < 0) {
      return { 
        status: 'expired', 
        class: styles.itemExpired, 
        badge: styles.expirationExpired, 
        text: `Vencido há ${Math.abs(daysUntilExpire)} dia${Math.abs(daysUntilExpire) > 1 ? 's' : ''}`
      };
    } else if (daysUntilExpire <= 7) {
      return { 
        status: 'warning', 
        class: styles.itemWarning, 
        badge: styles.expirationWarning, 
        text: `${daysUntilExpire} dia${daysUntilExpire > 1 ? 's' : ''} restante${daysUntilExpire > 1 ? 's' : ''}`
      };
    } else {
      return { 
        status: 'fresh', 
        class: styles.itemFresh, 
        badge: styles.expirationFresh, 
        text: `${daysUntilExpire} dias restantes`
      };
    }
  };

  const expirationInfo = getExpirationStatus();

  // Format date for display
  const formatDate = (dateString: string) => {
    if (dateString === 'N/A') return dateString;
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <motion.div
      className={`${styles.itemCard} ${expirationInfo.class} rounded-2xl p-6 relative overflow-hidden`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        type: "spring",
        stiffness: 300
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 }
      }}
    >
      {/* Expiration badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`${styles.expirationBadge} ${expirationInfo.badge} px-2 py-1 rounded-full text-xs`}>
          {expirationInfo.text}
        </span>
      </div>

      {/* Category badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className={`${getCategoryClass(item.type)} px-2 py-1 rounded-full text-xs font-medium`}>
          {formatItemTypeLabel(item.type)}
        </span>
      </div>

      {/* Image */}
      {item.img ? (
        <motion.div 
          className={`${styles.imageContainer} h-40 mb-4 rounded-xl overflow-hidden`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={item.img}
            alt={item.name}
            width={300}
            height={160}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </motion.div>
      ) : (
        <motion.div 
          className="h-40 mb-4 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="text-6xl opacity-30"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            {getItemIcon(item.type)}
          </motion.div>
        </motion.div>
      )}

      {/* Content */}
      <div className="space-y-4">
        {/* Title and Icon */}
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-10 h-10 rounded-full bg-white bg-opacity-80 flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.15, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {getItemIcon(item.type)}
          </motion.div>
          <h3 className="text-lg font-bold text-gray-800 truncate flex-1" title={item.name}>
            {item.name}
          </h3>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Quantidade:</span>
          <div className={`${styles.actionButtons} gap-2`}>
            <motion.button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className={`${styles.quantityControl} ${styles.quantityDecrease} w-8 h-8 rounded-full flex items-center justify-center`}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              disabled={item.quantity <= 1}
            >
              <FiMinus size={14} />
            </motion.button>
            
            <motion.span
              className={`${styles.quantityDisplay} min-w-[2rem] text-center text-lg`}
              key={item.quantity}
              initial={{ scale: 1.2, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {item.quantity}
            </motion.span>
            
            <motion.button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className={`${styles.quantityControl} ${styles.quantityIncrease} w-8 h-8 rounded-full flex items-center justify-center`}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPlus size={14} />
            </motion.button>
          </div>
        </div>

        {/* Expiration Date */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Validade:</span>
          <div className="flex items-center gap-2">
            <FiCalendar size={14} className="text-gray-500" />
            <span className={`text-sm ${expirationInfo.status === 'expired' ? 'text-red-600 font-semibold' : 
              expirationInfo.status === 'warning' ? 'text-yellow-600 font-medium' : 'text-gray-700'}`}>
              {formatDate(item.expire_date)}
            </span>
          </div>
        </div>

        {/* Added Date */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Adicionado:</span>
          <span className="text-sm text-gray-500">
            {formatDate(item.dateBought)}
          </span>
        </div>

        {/* Action Button */}
        <motion.button
          onClick={() => onDeleteItem(item.id)}
          className={`${styles.dangerButton} w-full rounded-xl py-2 px-4 flex items-center justify-center gap-2 mt-4`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiTrash2 size={16} />
          <span className="font-medium">Remover Item</span>
        </motion.button>
      </div>

      {/* Background decoration */}
      <div className={`absolute inset-0 opacity-5 pointer-events-none bg-gradient-to-br ${
        expirationInfo.status === 'expired' ? 'from-red-500 to-red-700' :
        expirationInfo.status === 'warning' ? 'from-yellow-500 to-orange-500' :
        'from-green-500 to-blue-500'
      }`}></div>
    </motion.div>
  );
};

export default PantryItemCard;
