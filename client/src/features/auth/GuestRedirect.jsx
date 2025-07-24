import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import generateId from '../../utils/generateId';
import storage from '../../utils/storage';

const GuestRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const initializeGuest = () => {
      // Check if guest ID already exists
      let guestId = storage.get('guestId');
      
      if (!guestId) {
        // Generate new guest ID
        guestId = generateId();
        storage.set('guestId', guestId);
        
        // Initialize empty data structure for guest
        const initialData = {
          groups: [],
          expenses: [],
          reminders: [],
          settings: {
            currency: 'USD',
            darkMode: false,
            notifications: true
          }
        };
        
        storage.set('guestData', initialData);
      }
      
      // Redirect to dashboard after a brief delay for UX
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    };

    initializeGuest();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-6"
        >
          <Loader2 className="h-12 w-12 text-primary-600" />
        </motion.div>
        
        <motion.h1
          className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Setting up your account...
        </motion.h1>
        
        <motion.p
          className="text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Creating your personal expense tracker
        </motion.p>
      </motion.div>
    </div>
  );
};

export default GuestRedirect;
