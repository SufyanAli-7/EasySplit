import { motion } from 'framer-motion';
import { Home, Users, Receipt, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const TopHeader = () => {
  const location = useLocation();

  const navItems = [
    { 
      icon: Home, 
      label: 'Home', 
      path: '/dashboard',
      badge: null
    },
    { 
      icon: Users, 
      label: 'Group', 
      path: '/groups',
      badge: null // Removed NEW badge as requested
    },
    { 
      icon: Receipt, 
      label: 'Expenses', 
      path: '/add-expense',
      badge: null
    },
    { 
      icon: Settings, 
      label: 'Features', 
      path: '/features',
      badge: 'NEW' // Added NEW badge to Features as requested
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section - Removed image, kept text only */}
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span className="text-purple-600">Expense</span>
                <span className="text-blue-600">Split</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Smart & Fair
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative flex items-center space-x-2 group"
                >
                  <motion.div
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      active
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                    
                    {/* Badge */}
                    {item.badge && (
                      <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </motion.div>
                  
                  {/* Active indicator */}
                  {active && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                      layoutId="activeTab"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Currency Display - Added RS currency tag as requested */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Currency:</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded">
                ₹ RS
              </span>
            </div>
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
        <div className="px-4 py-2">
          <div className="flex justify-around">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative flex flex-col items-center py-2 px-3"
                >
                  <div className={`flex flex-col items-center ${
                    active 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    <div className="relative">
                      <IconComponent className="h-5 w-5" />
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 px-1 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full min-w-[16px] h-4 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs mt-1 font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
