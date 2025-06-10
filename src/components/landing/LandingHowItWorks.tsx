'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FiHome, FiShoppingBag, FiUser, FiArrowRight,
  FiCamera, FiShare, FiDollarSign, FiPackage, FiHeart, FiBarChart
} from 'react-icons/fi';
import styles from './styles.module.css';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const individualSteps: Step[] = [
  {
    icon: <FiCamera size={24} />,
    title: "Digitize your pantry",
    description: "Scan receipts or add products manually. Receive alerts before expiration dates."
  },
  {
    icon: <FiShare size={24} />,
    title: "Share the excess",
    description: "Connect with neighbors to exchange or donate food you won't be able to use."
  },
  {
    icon: <FiDollarSign size={24} />,
    title: "Save money",
    description: "Buy discounted boxes of products nearing expiration date from local stores."
  }
];

const businessSteps: Step[] = [
  {
    icon: <FiPackage size={24} />,
    title: "List surplus products",
    description: "Create boxes of products nearing expiration to sell at a discount to the community."
  },
  {
    icon: <FiHeart size={24} />,
    title: "Make donations easily",
    description: "Connect with local NGOs to donate food that would be wasted."
  },
  {
    icon: <FiBarChart size={24} />,
    title: "Analyze and optimize",
    description: "Track waste patterns and improve your business sustainability."
  }
];

const LandingHowItWorks: React.FC = () => {
  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.sectionContainer}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FiArrowRight size={16} className="text-purple-400" />
            <span className="text-white/90 text-sm font-medium">
              📋 How It Works
            </span>
          </motion.div>

          <h2 className={styles.sectionTitle}>
            Simple for{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              everyone to use
            </span>
          </h2>
          
          <p className={styles.sectionSubtitle}>
            Whether you're an individual or a business, we have the perfect solution 
            to effectively reduce food waste.
          </p>
        </motion.div>

        {/* How It Works Grid */}
        <div className={styles.howItWorksGrid}>
          {/* For Individuals */}
          <motion.div
            className={styles.glassCard}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -10 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                <FiHome size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">For Individuals</h3>
                <p className="text-white/70 text-sm">People and families</p>
              </div>
            </div>

            {/* Steps */}
            <ul className={styles.stepsList}>
              {individualSteps.map((step, index) => (
                <motion.li
                  key={index}
                  className={styles.stepItem}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <div className={styles.stepNumber}>
                    <div className="text-blue-500">
                      {step.icon}
                    </div>
                  </div>
                  <div className={styles.stepContent}>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <motion.div
              className="mt-8 pt-6 border-t border-white/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/auth/register"
                  className={`${styles.heroButton} ${styles.heroButtonPrimary} w-full justify-center`}
                >
                  <FiUser size={18} />
                  Register as Individual
                  <FiArrowRight size={18} />
                </Link>
              </motion.div>
              
              <div className="flex items-center justify-center gap-4 mt-4 text-white/60 text-sm">
                <span>✓ Free forever</span>
                <span>✓ No credit card needed</span>
              </div>
            </motion.div>
          </motion.div>

          {/* For Businesses */}
          <motion.div
            className={styles.glassCard}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -10 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <FiShoppingBag size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">For Businesses</h3>
                <p className="text-white/70 text-sm">Restaurants and stores</p>
              </div>
            </div>

            {/* Steps */}
            <ul className={styles.stepsList}>
              {businessSteps.map((step, index) => (
                <motion.li
                  key={index}
                  className={styles.stepItem}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <div className={styles.stepNumber}>
                    <div className="text-emerald-500">
                      {step.icon}
                    </div>
                  </div>
                  <div className={styles.stepContent}>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <motion.div
              className="mt-8 pt-6 border-t border-white/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/auth/register"
                  className={`${styles.heroButton} ${styles.heroButtonSecondary} w-full justify-center border-2 border-emerald-400/50 hover:border-emerald-400`}
                >
                  <FiShoppingBag size={18} />
                  Register Business
                  <FiArrowRight size={18} />
                </Link>
              </motion.div>
              
              <div className="flex items-center justify-center gap-4 mt-4 text-white/60 text-sm">
                <span>✓ 30-day free trial</span>
                <span>✓ Dedicated support</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still not sure which option is best for you?
            </h3>
            <p className="text-white/80 mb-8">
              Don't worry! You can start as an individual and later upgrade to a business account. 
              The important thing is to start making a difference today.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiUser size={24} className="text-blue-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Individual</h4>
                <p className="text-white/70 text-sm">Perfect for homes and families</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiShoppingBag size={24} className="text-emerald-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Small Business</h4>
                <p className="text-white/70 text-sm">Ideal for local restaurants</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiPackage size={24} className="text-purple-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Enterprise</h4>
                <p className="text-white/70 text-sm">Complete enterprise solutions</p>
              </div>
            </div>

            <motion.div
              className="mt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/auth/register"
                className={`${styles.heroButton} ${styles.heroButtonPrimary}`}
              >
                Start For Free
                <FiArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingHowItWorks;