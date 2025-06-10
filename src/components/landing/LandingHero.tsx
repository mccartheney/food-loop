'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiPlay, FiRefreshCw } from 'react-icons/fi';
import styles from './styles.module.css';

const LandingHero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero} id="hero">
      <motion.div 
        className={styles.heroContent}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        {/* Hero Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <FiRefreshCw size={16} className="text-amber-400" />
          </motion.div>
          <span className="text-white/90 text-sm font-medium">
            🌱 Sustainable Revolution
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Join the{' '}
          <span className={styles.heroAccent}>Food Loop</span>
          <br />
          Revolution
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          🍃 We connect people, businesses and NGOs to eliminate food waste.
          <br />
          Transform excess into positive impact in your community.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className={styles.heroButtons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/auth/register" 
              className={`${styles.heroButton} ${styles.heroButtonPrimary}`}
            >
              Get Started
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FiArrowRight size={20} />
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/auth/login" 
              className={`${styles.heroButton} ${styles.heroButtonSecondary}`}
            >
              <FiArrowRight size={18} />
              Sign In
            </Link>
          </motion.div>

          <motion.button
            onClick={() => scrollToSection('features')}
            className={`${styles.heroButton} ${styles.heroButtonSecondary}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlay size={18} />
            Learn More
          </motion.button>
        </motion.div>

        {/* Hero Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-amber-400 mb-1">30%</div>
            <div className="text-white/70 text-sm">Food wasted</div>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-emerald-400 mb-1">1.3B</div>
            <div className="text-white/70 text-sm">Tons per year</div>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-blue-400 mb-1">8%</div>
            <div className="text-white/70 text-sm">Global emissions</div>
          </motion.div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 border-white/30 flex items-center justify-center text-xs font-bold text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.3 + i * 0.1 }}
                whileHover={{ scale: 1.2, zIndex: 10 }}
              >
                {String.fromCharCode(65 + i - 1)}
              </motion.div>
            ))}
          </div>
          <div className="text-white/70 text-sm">
            <span className="font-semibold text-white">500+</span> people have already joined
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LandingHero;