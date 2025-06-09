'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ProfileLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function ProfileLayout({ children, className = '' }: ProfileLayoutProps) {
  return (
    <motion.div
      className={`max-w-6xl mx-auto pb-16 min-h-screen ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

interface ProfileCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ProfileCard({ children, className = '', delay = 0 }: ProfileCardProps) {
  return (
    <motion.div
      className={`modern-card p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg ${className}`}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -2 }}
    >
      {children}
    </motion.div>
  );
}

interface ProfileStatProps {
  value: string | number;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function ProfileStat({ value, label, onClick, className = '' }: ProfileStatProps) {
  return (
    <motion.div
      className={`text-center p-4 md:p-6 glass-effect rounded-xl md:rounded-2xl border border-white/20 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={onClick ? { scale: 0.95 } : undefined}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="text-2xl md:text-3xl font-bold text-gray-800">{value}</div>
      <div className="text-xs md:text-sm text-gray-500 font-medium">{label}</div>
    </motion.div>
  );
}

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  iconColor?: string;
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  action, 
  iconColor = 'from-blue-400 to-purple-500' 
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 md:py-16">
      <motion.div
        className={`w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gradient-to-br ${iconColor} rounded-full flex items-center justify-center`}
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">{title}</h3>
      <p className="text-gray-500 text-base md:text-lg mb-6 md:mb-8 max-w-md mx-auto px-4">
        {description}
      </p>
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {action}
        </motion.div>
      )}
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
}

export function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <motion.button
      className={`flex-1 py-3 md:py-4 px-4 md:px-6 flex items-center justify-center gap-2 font-semibold transition-all duration-200 ${
        active
          ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
      }`}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      <span className="text-lg md:text-xl">{icon}</span>
      <span className="text-sm md:text-base">{label}</span>
    </motion.button>
  );
}

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  gradient?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function GradientButton({ 
  children, 
  onClick, 
  className = '', 
  gradient = 'from-blue-500 to-purple-600',
  size = 'md'
}: GradientButtonProps) {
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  };

  return (
    <motion.button
      className={`bg-gradient-to-r ${gradient} text-white ${sizeClasses[size]} rounded-xl font-semibold hover:shadow-lg transition-all duration-200 ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
