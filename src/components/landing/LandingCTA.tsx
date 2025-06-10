'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiHeart, FiUsers, FiTrendingUp } from 'react-icons/fi';
import styles from './styles.module.css';

const LandingCTA: React.FC = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        {/* Main CTA */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FiHeart size={16} className="text-red-400" />
            </motion.div>
            <span className="text-white/90 text-sm font-medium">
              🌟 Joining is Free
            </span>
          </motion.div>

          <motion.h2 
            className={styles.ctaTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Ready to be part of the{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              sustainable revolution?
            </span>
          </motion.h2>

          <motion.p 
            className={styles.ctaDescription}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Join thousands of people and businesses transforming 
            food waste into opportunities. Every action counts towards a more sustainable future.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className={styles.ctaButtons}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/auth/register"
                className={`${styles.heroButton} ${styles.heroButtonPrimary} text-lg px-8 py-4`}
              >
                Start For Free
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
                className={`${styles.heroButton} ${styles.heroButtonSecondary} text-lg px-8 py-4`}
              >
                <FiUsers size={20} />
                I'm Already a Member
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            className="mt-12 grid md:grid-cols-3 gap-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp size={24} className="text-emerald-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Constant Growth</h4>
              <p className="text-white/70 text-sm">+50% new users monthly</p>
            </motion.div>

            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers size={24} className="text-blue-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Active Community</h4>
              <p className="text-white/70 text-sm">500+ satisfied users</p>
            </motion.div>

            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeart size={24} className="text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Real Impact</h4>
              <p className="text-white/70 text-sm">2.5 tons of food saved</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Secondary CTA - Different User Types */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* For Individuals */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center"
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3 }
            }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🏠</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">For Individuals</h3>
            <p className="text-white/80 mb-6">
              Manage your pantry, save money and be part of the solution.
            </p>
            <div className="space-y-2 mb-8 text-sm text-white/70">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Free forever</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>Expiration alerts</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>Local community</span>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/auth/register"
                className={`${styles.heroButton} ${styles.heroButtonPrimary} w-full justify-center`}
              >
                Register as Individual
                <FiArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>

          {/* For Businesses */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center"
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3 }
            }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🏢</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">For Businesses</h3>
            <p className="text-white/80 mb-6">
              Reduce costs, improve sustainability and gain new customers.
            </p>
            <div className="space-y-2 mb-8 text-sm text-white/70">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>30-day free trial</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>Advanced reports</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>Dedicated support</span>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/auth/register"
                className={`${styles.heroButton} ${styles.heroButtonSecondary} w-full justify-center border-2 border-emerald-400/50 hover:border-emerald-400`}
              >
                Register Business
                <FiArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Final Message */}
        <motion.div
          className="text-center mt-16 pt-12 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-white/70 text-lg mb-4">
            💚 Every registration counts. Every action makes a difference.
          </p>
          <p className="text-white/50 text-sm">
            Join the sustainable revolution today and be part of the global solution.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingCTA;