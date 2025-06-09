'use client';

import { motion } from 'framer-motion';
import { FiCoffee, FiHeart, FiStar } from 'react-icons/fi';
import styles from './styles.module.css';

const AuthBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.authBackground}>
      {/* Floating Food Icons */}
      <motion.div
        className={styles.floatingElement}
        style={{ top: '15%', left: '10%' }}
        animate={{ 
          y: [-10, 10, -10],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FiCoffee size={40} className="text-white" />
      </motion.div>

      <motion.div
        className={styles.floatingElement}
        style={{ top: '25%', right: '15%' }}
        animate={{ 
          y: [10, -10, 10],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <FiHeart size={35} className="text-white" />
      </motion.div>

      <motion.div
        className={styles.floatingElement}
        style={{ bottom: '20%', left: '20%' }}
        animate={{ 
          y: [-15, 15, -15],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <FiStar size={30} className="text-white" />
      </motion.div>

      <motion.div
        className={styles.floatingElement}
        style={{ bottom: '30%', right: '10%' }}
        animate={{ 
          y: [8, -8, 8],
          rotate: [0, -8, 8, 0]
        }}
        transition={{ 
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      >
        <div className="w-8 h-8 bg-white rounded-full opacity-20" />
      </motion.div>

      <motion.div
        className={styles.floatingElement}
        style={{ top: '60%', left: '80%' }}
        animate={{ 
          y: [-12, 12, -12],
          rotate: [0, 15, -15, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <div className="w-6 h-6 bg-white rounded-lg opacity-15" />
      </motion.div>

      {/* Additional Floating Particles */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-2 h-2 bg-white rounded-full opacity-20"
        animate={{ 
          y: [-20, 20, -20],
          x: [-5, 5, -5]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-2/3 right-1/3 w-3 h-3 bg-white rounded-full opacity-15"
        animate={{ 
          y: [15, -15, 15],
          x: [5, -5, 5]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />

      {/* Main Content */}
      <div className={styles.authContainer}>
        {children}
      </div>
    </div>
  );
};

export default AuthBackground;
