'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const MobileHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 h-16 bg-white border-b flex justify-between items-center px-4 z-30"
    >
      {/* User Profile Icon */}
      <Link href="/dashboard/profile" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-slate-600">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
        </div>
      </Link>

      {/* App Logo - Using your logo.svg */}
      <div className="flex items-center justify-center">
        <div className="w-10 h-10 flex items-center justify-center">
          <Image 
            src="/logo.svg" 
            alt="Food Loop Logo" 
            width={36} 
            height={36} 
            priority
            className="text-primary"
          />
        </div>
      </div>

      {/* Messages/Navigation Icon - Using sent.png */}
      <Link href="/dashboard/messages" className="btn btn-ghost btn-circle">
        <div className="w-10 h-10 flex items-center justify-center">
          <Image 
            src="/sent.png" 
            alt="Messages" 
            width={24} 
            height={24} 
            className="text-slate-600"
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default MobileHeader;