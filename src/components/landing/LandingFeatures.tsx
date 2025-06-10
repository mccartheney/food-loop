'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FiShoppingBag, FiShare2, FiCalendar, FiUsers, FiHeart, 
  FiDatabase, FiArrowRight, FiShield, FiTrendingUp 
} from 'react-icons/fi';
import styles from './styles.module.css';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const features: Feature[] = [
  {
    icon: <FiShoppingBag size={32} />,
    title: "Digital Pantry",
    description: "Manage your food inventory with smart expiration alerts and recipe suggestions.",
    color: "text-blue-400",
    delay: 0.1
  },
  {
    icon: <FiShare2 size={32} />,
    title: "Community Sharing", 
    description: "Connect with neighbors to exchange or donate food you won't use.",
    color: "text-emerald-400",
    delay: 0.2
  },
  {
    icon: <FiCalendar size={32} />,
    title: "Discount Boxes",
    description: "Buy products near their expiration date with discounts up to 70%.",
    color: "text-amber-400",
    delay: 0.3
  },
  {
    icon: <FiUsers size={32} />,
    title: "Sustainable Network",
    description: "Join an active community fighting against food waste.",
    color: "text-purple-400",
    delay: 0.4
  },
  {
    icon: <FiHeart size={32} />,
    title: "Simple Donations",
    description: "Make easy donations to local NGOs and track your social impact.",
    color: "text-rose-400",
    delay: 0.5
  },
  {
    icon: <FiDatabase size={32} />,
    title: "Business Tools",
    description: "Advanced analytics for businesses to reduce waste and operational costs.",
    color: "text-cyan-400",
    delay: 0.6
  },
  {
    icon: <FiShield size={32} />,
    title: "Food Safety",
    description: "Quality checks and complete traceability of shared foods.",
    color: "text-indigo-400",
    delay: 0.7
  },
  {
    icon: <FiTrendingUp size={32} />,
    title: "Measurable Impact",
    description: "Visualize your environmental contribution with detailed sustainability reports.",
    color: "text-green-400",
    delay: 0.8
  }
];

const LandingFeatures: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className={styles.section} id="features">
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
            <FiShoppingBag size={16} className="text-emerald-400" />
            <span className="text-white/90 text-sm font-medium">
              🚀 Key Features
            </span>
          </motion.div>

          <h2 className={styles.sectionTitle}>
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              eliminate waste
            </span>
          </h2>
          
          <p className={styles.sectionSubtitle}>
            Powerful and intuitive tools for individuals, businesses, and organizations 
            to transform how they manage their food resources.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className={styles.featuresGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={styles.glassCard}
              variants={itemVariants}
              whileHover={{ 
                y: -15,
                transition: { duration: 0.3 }
              }}
            >
              {/* Icon */}
              <motion.div 
                className={styles.cardIcon}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <div className={feature.color}>
                  {feature.icon}
                </div>
              </motion.div>

              {/* Content */}
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>

              {/* Hover Effect */}
              <motion.div
                className="mt-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to start making a difference?
            </h3>
            <p className="text-white/80 mb-6">
              Join hundreds of people and businesses already transforming 
              food waste into opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/auth/register"
                  className={`${styles.heroButton} ${styles.heroButtonPrimary}`}
                >
                  Try for Free
                  <FiArrowRight size={18} />
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
                  I already have an account
                </Link>
              </motion.div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/70">
                <FiShield size={16} />
                <span className="text-sm">100% Secure</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <FiUsers size={16} />
                <span className="text-sm">500+ Users</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <FiHeart size={16} />
                <span className="text-sm">Real Impact</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingFeatures;