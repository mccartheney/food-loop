'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiPlus, FiSettings, FiUser, FiSearch, FiUsers } from 'react-icons/fi';
import { LiaStoreAltSolid } from "react-icons/lia";
import { PiChefHatLight } from "react-icons/pi"; // Added chef hat icon import
import MobileHeader from './cards/MobileHeader';
import { FaSignOutAlt } from 'react-icons/fa';
import { signIn, signOut } from 'next-auth/react';
import { IconType as ReactIconType } from 'react-icons';
import SearchModal from './SearchModal';

interface DashboardLayoutProps {
  children: ReactNode;
}

// Define our icon types more carefully
type CustomIconFunction = (isActive: boolean, isHovered?: boolean) => React.ReactNode;

interface NavItem {
  name: string;
  href: string;
  icon: ReactIconType | CustomIconFunction;
  isPrimary?: boolean;
  isCustomIcon?: boolean;
  action?: () => void; // Add action property for click handlers
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isMessageHovered, setIsMessageHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openSearchModal = () => {
    setIsSearchOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchOpen(false);
  };

  const navItems: NavItem[] = [
    { name: 'Home', href: '/app', icon: FiHome },
    { name: 'Marketplace', href: '/app/marketplace', icon: LiaStoreAltSolid }, 
    { name: 'Search', href: '#', icon: FiSearch, action: openSearchModal },
    { 
      name: 'Pantry', 
      href: '/app/pantry', 
      icon: (isActive: boolean, isHovered?: boolean) => (
        <div className="relative w-5 h-5">
          <Image 
            src="/pantry.svg" 
            alt="Pantry" 
            width={20} 
            height={20}
            className={`absolute top-0 left-0 w-full h-full ${
              (isActive || isHovered) ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <Image 
            src="/pantry.svg" 
            alt="Pantry" 
            width={20} 
            height={20}
            className={`absolute top-0 left-0 w-full h-full filter brightness-0 invert ${
              (isActive || isHovered) ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      ),
      isCustomIcon: true
    },
    { name: 'Recipes', href: '/app/recipes', icon: PiChefHatLight },
    { name: 'Friends', href: '/app/friends', icon: FiUsers }, 
    { name: 'Add', href: '/app/add', icon: FiPlus, isPrimary: true },
    { name: 'Settings', href: '/app/settings', icon: FiSettings },
    { name: 'MyProfile', href: '/app/myprofile', icon: FiUser }
  ];

  const renderIcon = (item: NavItem, isActive: boolean) => {
    if (item.isCustomIcon && typeof item.icon === 'function') {
      // For custom function icons
      return (item.icon as CustomIconFunction)(isActive, hoveredItem === item.href);
    } else {
      // For regular React icons
      const IconComponent = item.icon as ReactIconType;
      return <IconComponent size={20} />;
    }
  };

  const handleItemClick = (item: NavItem, e: React.MouseEvent) => {
    if (item.action) {
      e.preventDefault();
      item.action();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isMobile && <MobileHeader />}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={closeSearchModal} />

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
            {navItems.slice(0, 7).map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={item.href}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                    pathname === item.href 
                      ? 'bg-primary text-white' 
                      : 'text-gray-500 hover:text-white hover:bg-primary/80'
                  }`}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={(e) => handleItemClick(item, e)}
                >
                  {renderIcon(item, pathname === item.href)}
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/app/messages"
                onMouseEnter={() => setIsMessageHovered(true)}
                onMouseLeave={() => setIsMessageHovered(false)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                  pathname === '/app/messages'
                    ? 'bg-primary text-white' 
                    : 'text-gray-500 hover:text-white hover:bg-primary/80'
                }`}
              >
                <div className="relative w-5 h-5">
                  <Image 
                    src="/sent.svg" 
                    alt="Messages" 
                    width={20} 
                    height={20}
                    className={`absolute top-0 left-0 w-full h-full ${
                      (pathname === '/app/messages' || isMessageHovered)
                        ? 'opacity-0' 
                        : 'opacity-100'
                    }`}
                  />
                  <Image 
                    src="/sent.svg" 
                    alt="Messages" 
                    width={20} 
                    height={20}
                    className={`absolute top-0 left-0 w-full h-full filter brightness-0 invert ${
                      (pathname === '/app/messages' || isMessageHovered)
                        ? 'opacity-100' 
                        : 'opacity-0'
                    }`}
                  />
                </div>
              </Link>
            </motion.div>
          </nav>
          
          <div className="mt-auto flex flex-col items-center space-y-6 mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => {signOut()}}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 
                    'text-gray-500 hover:text-white hover:bg-primary/80'
                  }`}
              >
                <FaSignOutAlt/>
              </button>
            </motion.div>
            {navItems.slice(7).map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={item.href}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                    pathname === item.href 
                      ? 'bg-primary text-white' 
                      : 'text-gray-500 hover:text-white hover:bg-primary/80'
                  }`}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={(e) => handleItemClick(item, e)}
                >
                  {renderIcon(item, pathname === item.href)}
                </Link>
              </motion.div>
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
                onClick={(e) => handleItemClick(item, e)}
              >
                {item.isPrimary ? (
                  <div className="w-12 h-12 rounded-full bg-primary -mt-6 flex items-center justify-center text-white hover:bg-primary-focus transition-colors duration-200">
                    {renderIcon(item, false)}
                  </div>
                ) : (
                  <div className={`w-10 h-10 flex items-center justify-center ${
                    pathname === item.href ? 'text-primary' : 'text-gray-500'
                  }`}>
                    {renderIcon(item, pathname === item.href)}
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
