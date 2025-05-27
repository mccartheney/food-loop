'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { CgProfile } from "react-icons/cg";

const MobileHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 h-16 bg-white border-b flex justify-between items-center px-4 z-30"
    >
      <Link href="/dashboard/profile" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
          <CgProfile className="w-6 h-6 text-slate-600" />
        </div>
      </Link>

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