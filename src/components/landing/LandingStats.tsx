'use client';

import { motion } from 'framer-motion';
import { FiBarChart, FiTrendingUp, FiGlobe } from 'react-icons/fi';
import { FaBreadSlice, FaCarrot, FaAppleAlt } from 'react-icons/fa';
import styles from './styles.module.css';

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  color: string;
}

const stats: Stat[] = [
  {
    icon: <FaBreadSlice size={32} />,
    value: "30%",
    label: "Food Wasted",
    description: "of all food produced globally ends up in the trash",
    color: "text-amber-400"
  },
  {
    icon: <FaCarrot size={32} />,
    value: "8%",
    label: "Global Emissions",
    description: "of greenhouse gas emissions come from food waste",
    color: "text-orange-400"
  },
  {
    icon: <FaAppleAlt size={32} />,
    value: "1.3B",
    label: "Tons per Year",
    description: "of food is wasted annually worldwide",
    color: "text-red-400"
  }
];

const LandingStats: React.FC = () => {
  return (
    <section className={`${styles.section} ${styles.ctaSection}`} id="about">
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
            <FiBarChart size={16} className="text-red-400" />
            <span className="text-white/90 text-sm font-medium">
              📊 The Impact of Waste
            </span>
          </motion.div>

          <h2 className={styles.sectionTitle}>
            Why is{' '}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Food Loop
            </span>{' '}
            essential?
          </h2>
          
          <p className={styles.sectionSubtitle}>
            Food waste is one of the biggest environmental and social problems of our time. 
            Every action counts to build a more sustainable future.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className={styles.statsGrid}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2 + 0.4,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {/* Icon */}
              <motion.div
                className="mb-4"
                whileHover={{ 
                  scale: 1.2,
                  rotate: 360
                }}
                transition={{ duration: 0.6 }}
              >
                <div className={`${stat.color} flex justify-center`}>
                  {stat.icon}
                </div>
              </motion.div>

              {/* Value */}
              <motion.div 
                className={styles.statValue}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2 + 0.6,
                  type: "spring",
                  bounce: 0.4
                }}
              >
                {stat.value}
              </motion.div>

              {/* Label */}
              <h3 className={styles.statLabel}>{stat.label}</h3>

              {/* Description */}
              <p className="text-white/70 text-sm mt-2 leading-relaxed">
                {stat.description}
              </p>

              {/* Progress bar effect */}
              <motion.div
                className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.2 + 0.8 }}
              >
                <motion.div
                  className={`h-full bg-gradient-to-r ${
                    index === 0 ? 'from-amber-400 to-orange-400' :
                    index === 1 ? 'from-orange-400 to-red-400' :
                    'from-red-400 to-pink-400'
                  } rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.2 + 1 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Impact Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Left - Problem */}
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTrendingUp size={24} className="text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">The Problem</h3>
                <p className="text-white/70 text-sm">
                  Millions of tons of food are wasted while 
                  millions of people go hungry.
                </p>
              </div>

              {/* Center - Solution */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍃</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">The Solution</h3>
                <p className="text-white/70 text-sm">
                  Food Loop connects excess food with those who need it, 
                  creating a sustainable cycle.
                </p>
              </div>

              {/* Right - Impact */}
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiGlobe size={24} className="text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">The Impact</h3>
                <p className="text-white/70 text-sm">
                  Each saved meal reduces emissions, saves resources 
                  and feeds communities.
                </p>
              </div>
            </div>

            {/* Call to action */}
            <motion.div
              className="mt-8 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Be part of the change the world needs
              </h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Join a growing community of people and businesses committed 
                to sustainability and social responsibility.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto text-sm">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="font-semibold text-emerald-400 mb-1">🌱 Environmental</div>
                  <div className="text-white/70">Reduces carbon footprint</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="font-semibold text-blue-400 mb-1">🤝 Social</div>
                  <div className="text-white/70">Fights hunger</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="font-semibold text-purple-400 mb-1">💰 Economic</div>
                  <div className="text-white/70">Saves money</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingStats;