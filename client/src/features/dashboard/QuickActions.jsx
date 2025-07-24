import { motion } from 'framer-motion';
import { Plus, Users, Camera, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';

const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      title: 'Add Expense',
      description: 'Record a new expense',
      path: '/add-expense',
      color: 'bg-primary-500 hover:bg-primary-600',
      textColor: 'text-white'
    },
    {
      icon: Users,
      title: 'Create Group',
      description: 'Start a new group',
      path: '/groups/new',
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white'
    },
    {
      icon: Camera,
      title: 'Scan Receipt',
      description: 'Upload receipt photo',
      path: '/scan',
      color: 'bg-purple-500 hover:bg-purple-600',
      textColor: 'text-white'
    },
    {
      icon: Calculator,
      title: 'Settle Up',
      description: 'Calculate balances',
      path: '/settle',
      color: 'bg-orange-500 hover:bg-orange-600',
      textColor: 'text-white'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h2>
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div key={index} variants={itemVariants}>
              <Link to={action.path}>
                <motion.div
                  className={`${action.color} ${action.textColor} rounded-xl p-6 text-center transition-all duration-200 hover:shadow-lg cursor-pointer`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-8 w-8 mx-auto mb-3" />
                  <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                  <p className="text-xs opacity-90">{action.description}</p>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default QuickActions;
