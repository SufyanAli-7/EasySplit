import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import useDarkMode from '../../hooks/useDarkMode';

const DarkModeToggle = ({ className = '' }) => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <motion.button
      className={`relative inline-flex h-10 w-18 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${className}`}
      onClick={() => setDarkMode(!darkMode)}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg"
        animate={{
          x: darkMode ? 32 : 4,
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30
        }}
      >
        <motion.div
          animate={{ rotate: darkMode ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {darkMode ? (
            <Moon className="h-4 w-4 text-gray-600" />
          ) : (
            <Sun className="h-4 w-4 text-yellow-500" />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;
