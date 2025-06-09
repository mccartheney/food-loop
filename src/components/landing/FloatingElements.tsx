'use client';

import { motion } from 'framer-motion';
import styles from './styles.module.css';

const FloatingElements: React.FC = () => {
  const foodEmojis = ['🍎', '🥖', '🥕', '🍌', '🥦'];

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 0.9, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={styles.floatingElements}>
      {foodEmojis.map((emoji, index) => (
        <motion.div
          key={index}
          className={styles.floatingFood}
          style={{
            position: 'absolute',
            top: `${20 + index * 15}%`,
            left: index % 2 === 0 ? `${5 + index * 10}%` : 'auto',
            right: index % 2 === 1 ? `${5 + index * 8}%` : 'auto',
          }}
          variants={floatingVariants}
          animate="animate"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: false }}
          transition={{
            delay: index * 2,
            duration: 1,
          }}
        >
          {emoji}
        </motion.div>
      ))}
      
      {/* Additional floating particles */}
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-2 h-2 bg-white/10 rounded-full"
          style={{
            top: `${30 + index * 20}%`,
            left: `${70 + index * 5}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 6 + index * 2,
            repeat: Infinity,
            delay: index * 1.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
