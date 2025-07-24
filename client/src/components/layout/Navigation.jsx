import { motion } from 'framer-motion';
import { Home, Users, Plus, Bell, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DarkModeToggle from '../ui/DarkModeToggle';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Groups', path: '/groups' },
    { icon: Plus, label: 'Add Expense', path: '/add-expense' },
    { icon: Bell, label: 'Reminders', path: '/reminders' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const isActive = (path) => location.pathname === path;

  // Mobile Navigation (Bottom Bar)
  const MobileNav = () => (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-40">
      {/* Background blur overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent dark:from-gray-900/80 backdrop-blur-sm pointer-events-none" />

      <div className="relative mx-4 mb-4">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 px-2 py-3">
          <div className="flex justify-around items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative flex flex-col items-center"
                >
                  <motion.div
                    className={`flex flex-col items-center px-3 py-2 rounded-xl transition-all duration-200 ${
                      active
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: active ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className={`h-4 w-4 ${active ? 'text-white' : ''}`} />
                    <span className={`text-xs mt-1 font-medium ${active ? 'text-white' : ''}`}>
                      {item.label}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // Desktop Navigation (Sidebar)
  const DesktopNav = () => (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-40">
      <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-5 pb-4 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-4 mb-8">
          <h1 className="text-xl font-bold text-primary-600">EasySplit</h1>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    className="ml-auto w-1 h-6 bg-primary-600 rounded-full"
                    layoutId="activeIndicator"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Dark Mode Toggle */}
        <div className="flex-shrink-0 px-4 py-4">
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );

  // Mobile Menu Overlay
  const MobileMenuOverlay = () => (
    <motion.div
      className="fixed inset-0 z-50 md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
      <motion.div
        className="fixed right-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Menu</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-4">
          <DarkModeToggle />
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <DesktopNav />
      <MobileNav />
      {isMobileMenuOpen && <MobileMenuOverlay />}
    </>
  );
};

export default Navigation;
