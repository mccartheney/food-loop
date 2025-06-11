'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiHeart } from 'react-icons/fi';
import styles from './styles.module.css';

const ModernLoginForm: React.FC = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn('google', { callbackUrl: '/app' });
    } catch (error) {
      console.error('Google sign in error:', error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <motion.div 
      className={`${styles.authCard} ${styles.fadeInUp}`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo Section */}
      <motion.div 
        className={styles.logoSection}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className={styles.logoContainer}
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/logo.svg"
            alt="Food Loop Logo"
            width={40}
            height={40}
            priority
            className="text-white"
          />
        </motion.div>
        <h1 className={styles.logoText}>Food Loop</h1>
        <p className={styles.logoSubtext}>Conectando sabores, evitando desperdícios</p>
      </motion.div>

      {/* Form Title */}
      <motion.h2 
        className={styles.formTitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Bem-vindo de volta!
      </motion.h2>

      {/* Google Login Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8"
      >
        <motion.button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
          className={styles.googleButton}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isGoogleLoading ? (
            <>
              <div className={styles.loadingSpinner} />
              Entrando...
            </>
          ) : (
            <>
              <Image 
                src="/google.svg" 
                alt="Google" 
                width={20} 
                height={20} 
              />
              Entrar com Google
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Welcome Message */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
          <p className="text-white/80 text-sm">
            💡 <span className="font-semibold">Dica:</span> Junte-se à revolução contra o desperdício alimentar!
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModernLoginForm;
