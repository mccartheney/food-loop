'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiGrid, FiPlus, FiSettings, FiUser } from 'react-icons/fi';
import MobileHeader from './cards/MobileHeader';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { name: 'Home', href: '/dashboard', icon: FiHome },
  { name: 'Inventory', href: '/dashboard/inventory', icon: FiGrid },
  { name: 'Add', href: '/dashboard/add', icon: FiPlus, isPrimary: true },
  { name: 'Settings', href: '/dashboard/settings', icon: FiSettings },
  { name: 'Profile', href: '/dashboard/profile', icon: FiUser }
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isMobile && <MobileHeader />}

      {!isMobile && (
        <motion.div 
          initial={{ x: -60 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed left-0 top-0 h-full bg-white w-14 flex flex-col items-center py-4 z-30 shadow-md"
        >
          <div className="mb-8">
            <div className="w-10 h-10 flex items-center justify-center">
              <Image 
                src="/logo.svg" 
                alt="Food Loop Logo" 
                width={32} 
                height={32} 
                priority
                className="text-primary"
              />
            </div>
          </div>
          
          <nav className="flex flex-col items-center space-y-6 flex-1">
            {navItems.slice(0, 3).map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  pathname === item.href 
                    ? 'bg-primary text-white' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon size={20} />
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto flex flex-col items-center space-y-6 mb-6">
            {navItems.slice(3).map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  pathname === item.href 
                    ? 'bg-primary text-white' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon size={20} />
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      <div className={`flex-1 ${!isMobile ? 'ml-14' : 'mt-16'}`}>
        <main className="max-w-7xl mx-auto p-4">
          {children}
        </main>
      </div>

      <AnimatePresence>
        {isMobile && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center z-30"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center"
              >
                {item.isPrimary ? (
                  <div className="w-12 h-12 rounded-full bg-primary -mt-6 flex items-center justify-center text-white">
                    <item.icon size={20} />
                  </div>
                ) : (
                  <div className={`w-10 h-10 flex items-center justify-center ${
                    pathname === item.href ? 'text-primary' : 'text-gray-500'
                  }`}>
                    <item.icon size={20} />
                  </div>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {isMobile && <div className="h-16"></div>}
    </div>
  );
};

export default DashboardLayout;