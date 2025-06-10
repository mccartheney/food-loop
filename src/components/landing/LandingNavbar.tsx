'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiHeart, FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import styles from './styles.module.css';

const LandingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav 
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={styles.navbarContainer}>
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" className={styles.logo}>
            <FiHeart size={28} />
            <span>Food Loop</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className={styles.navLinks}>
          <motion.li
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <button 
              onClick={() => scrollToSection('about')}
              className={styles.navLink}
            >
              About
            </button>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className={styles.navLink}
            >
              How It Works
            </button>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <button 
              onClick={() => scrollToSection('features')}
              className={styles.navLink}
            >
              Features
            </button>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <button 
              onClick={() => scrollToSection('testimonials')}
              className={styles.navLink}
            >
              Testimonials
            </button>
          </motion.li>
        </ul>

        {/* Desktop Buttons */}
        <div className={styles.navButtons}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/auth/login" 
              className={`${styles.navButton} ${styles.navButtonOutline}`}
            >
              Login
            </Link>
          </motion.div>
         
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}
        initial={false}
        animate={{ 
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.button 
          onClick={() => scrollToSection('about')}
          className={styles.navLink}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          About
        </motion.button>
        <motion.button 
          onClick={() => scrollToSection('how-it-works')}
          className={styles.navLink}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          How It Works
        </motion.button>
        <motion.button 
          onClick={() => scrollToSection('features')}
          className={styles.navLink}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Features
        </motion.button>
        <motion.button 
          onClick={() => scrollToSection('testimonials')}
          className={styles.navLink}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Testimonials
        </motion.button>
        
        {/* Mobile Auth Buttons */}
        <div className="flex flex-col gap-2 mt-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="/auth/login" 
              className={`${styles.navButton} ${styles.navButtonOutline} w-full text-center`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          </motion.div>
          
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default LandingNavbar;