'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence, stagger } from 'framer-motion';
import { FiHome, FiPlus, FiSettings, FiUser, FiSearch, FiUsers } from 'react-icons/fi';
import { LiaStoreAltSolid } from "react-icons/lia";
import { PiChefHatLight } from "react-icons/pi";
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
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isMessageHovered, setIsMessageHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [tooltipItem, setTooltipItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile]);

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
            className={`w-full h-full transition-opacity duration-200 ${
              isActive ? 'filter brightness-0 invert' : ''
            }`}
          />
        </div>
      ),
      isCustomIcon: true
    },
    { name: 'Recipes', href: '/app/recipes', icon: PiChefHatLight },
    { name: 'Friends', href: '/app/friends', icon: FiUsers },
    { name: 'Create Trade', href: '/app/marketplace/create', icon: FiPlus, isPrimary: true },
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
    } else if (item.href !== '#') {
      // Navigate to the page using Next.js router
      router.push(item.href);
    }
  };

  const handleItemHover = (item: NavItem, element: HTMLElement) => {
    if (!isMobile) {
      const rect = element.getBoundingClientRect();
      setTooltipItem(item.name);
      setMousePosition({ x: rect.right + 20, y: rect.top + rect.height / 2 });
    }
  };

  const sidebarVariants = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0, scale: 0.8 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const magneticVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {isMobile && <MobileHeader />}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={closeSearchModal} />

      {!isMobile && (
        <motion.div
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          className="fixed left-0 top-0 h-full w-14 flex flex-col items-center py-4 z-30"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: `
              0 8px 32px 0 rgba(31, 38, 135, 0.15),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
              0 0 0 1px rgba(255, 255, 255, 0.05)
            `
          }}
        >
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.div
              className="w-10 h-10 flex items-center justify-center rounded-xl"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
              }}
            >
              <Image
                src="/logo.svg"
                alt="Food Loop Logo"
                width={32}
                height={32}
                priority
                className="text-primary"
              />
            </motion.div>
          </motion.div>

          <nav className="flex flex-col items-center space-y-4 flex-1">
            {navItems.slice(0, 7).map((item, index) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                custom={index}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    pathname === item.href
                      ? 'text-white bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg'
                      : 'text-gray-600 bg-white/70 hover:text-gray-800 hover:bg-white/90'
                  }`}
                  onMouseEnter={(e) => {
                    setHoveredItem(item.href);
                    handleItemHover(item, e.currentTarget as HTMLElement);
                  }}
                  onMouseLeave={() => {
                    setHoveredItem(null);
                    setTooltipItem(null);
                  }}
                  onClick={(e) => handleItemClick(item, e)}
                >
                  {renderIcon(item, pathname === item.href)}
                </div>
              </motion.div>
            ))}

            {/* Messages - fixed navigation */}
            <motion.div
              variants={itemVariants}
              custom={7}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  pathname === '/app/messages'
                    ? 'text-white bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg'
                    : 'text-gray-600 bg-white/70 hover:text-gray-800 hover:bg-white/90'
                }`}
                onMouseEnter={(e) => {
                  handleItemHover({ name: 'Messages', href: '/app/messages', icon: FiUser }, e.currentTarget as HTMLElement);
                }}
                onMouseLeave={() => {
                  setTooltipItem(null);
                }}
                onClick={() => router.push('/app/messages')}
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
              </div>
            </motion.div>
          </nav>

          <div className="mt-auto flex flex-col items-center space-y-4 mb-6">
            {/* Logout - keep as is */}
            <motion.div
              variants={itemVariants}
              custom={8}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 hover:text-gray-800 bg-white/70 hover:bg-white/90 transition-all duration-200 cursor-pointer"
                onMouseEnter={(e) => {
                  handleItemHover({ name: 'Logout', href: '#', icon: FaSignOutAlt }, e.currentTarget as HTMLElement);
                }}
                onMouseLeave={() => {
                  setTooltipItem(null);
                }}
                onClick={() => signOut()}
              >
                <FaSignOutAlt />
              </div>
            </motion.div>

            {/* Settings e MyProfile - fixed navigation */}
            {navItems.slice(7).map((item, index) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                custom={9 + index}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    pathname === item.href
                      ? 'text-white bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg'
                      : 'text-gray-600 bg-white/70 hover:text-gray-800 hover:bg-white/90'
                  }`}
                  onMouseEnter={(e) => {
                    setHoveredItem(item.href);
                    handleItemHover(item, e.currentTarget as HTMLElement);
                  }}
                  onMouseLeave={() => {
                    setHoveredItem(null);
                    setTooltipItem(null);
                  }}
                  onClick={() => router.push(item.href)}
                >
                  {renderIcon(item, pathname === item.href)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Modern Tooltip System */}
      <AnimatePresence>
        {tooltipItem && !isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 30
              }
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              x: -10,
              transition: { duration: 0.2 }
            }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: mousePosition.x + 30,
              top: mousePosition.y - 20,
            }}
          >
            <div
              className="px-3 py-2 text-sm font-medium text-white rounded-lg shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {tooltipItem}
              <motion.div
                className="absolute w-2 h-2 -left-1 top-1/2 transform -translate-y-1/2 rotate-45"
                style={{
                  background: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRight: 'none',
                  borderBottom: 'none'
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`flex-1 ${!isMobile ? 'ml-14' : 'mt-16'}`}>
        <main className="max-w-10xl mx-auto p-4">
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
            className="fixed bottom-0 left-0 right-0 h-16 border-t flex justify-around items-center z-30"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 -8px 32px 0 rgba(31, 38, 135, 0.15)'
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center"
                onClick={(e) => handleItemClick(item, e)}
              >
                {item.isPrimary ? (
                  <motion.div
                    className="w-12 h-12 rounded-full -mt-6 flex items-center justify-center text-white transition-all duration-300 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4), 0 0 20px rgba(139, 92, 246, 0.3)',
                      border: '2px solid rgba(255, 255, 255, 0.3)'
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 12px 35px rgba(99, 102, 241, 0.5), 0 0 25px rgba(139, 92, 246, 0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.4 }
                      }}
                    >
                      {renderIcon(item, false)}
                    </motion.div>

                    <motion.div
                      className="absolute inset-0 bg-white rounded-full"
                      initial={{ scale: 0, opacity: 0.5 }}
                      whileTap={{
                        scale: 1.5,
                        opacity: 0,
                        transition: { duration: 0.4 }
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${pathname === item.href ? 'text-primary' : 'text-gray-500'
                      }`}
                    style={{
                      background: pathname === item.href
                        ? 'rgba(99, 102, 241, 0.1)'
                        : 'transparent'
                    }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(99, 102, 241, 0.05)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      whileHover={{
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 }
                      }}
                    >
                      {renderIcon(item, pathname === item.href)}
                    </motion.div>
                  </motion.div>
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
