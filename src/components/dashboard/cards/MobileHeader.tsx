'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiUser, FiBell } from 'react-icons/fi';

const MobileHeader: React.FC = () => {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 h-16 flex justify-between items-center px-4 z-30"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
      }}
    >
      {/* Profile Button */}
      <Link href="/app/myprofile" className="relative">
        <motion.div
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
            pathname === '/app/myprofile'
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg'
              : 'bg-white/70 text-gray-600 hover:bg-white/90 hover:text-gray-800'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            boxShadow: pathname === '/app/myprofile' 
              ? '0 8px 25px rgba(99, 102, 241, 0.4)' 
              : '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}
        >
          <FiUser size={20} />
        </motion.div>
      </Link>

      {/* Logo */}
      <motion.div
        className="flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
          }}>
          <Image 
            src="/logo.svg" 
            alt="Food Loop Logo" 
            width={32} 
            height={32} 
            priority
            className="text-primary"
          />
        </div>
      </motion.div>

      {/* Messages/Notifications Button */}
      <Link href="/app/messages" className="relative">
        <motion.div
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
            pathname === '/app/messages'
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg'
              : 'bg-white/70 text-gray-600 hover:bg-white/90 hover:text-gray-800'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            boxShadow: pathname === '/app/messages' 
              ? '0 8px 25px rgba(99, 102, 241, 0.4)' 
              : '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Image
            src="/sent.svg"
            alt="Messages"
            width={20}
            height={20}
            className={`w-5 h-5 ${
              pathname === '/app/messages' ? 'filter brightness-0 invert' : ''
            }`}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default MobileHeader;
