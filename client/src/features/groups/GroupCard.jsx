import { motion } from 'framer-motion';
import { Users, DollarSign, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import formatCurrency from '../../utils/formatCurrency';

const GroupCard = ({ group, className = '' }) => {
  const { id, name, icon, color, members, balance, totalExpenses } = group;
  
  const getBalanceColor = () => {
    if (balance > 0) return 'text-green-600 dark:text-green-400';
    if (balance < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getBalanceText = () => {
    if (balance > 0) return `You are owed ${formatCurrency(balance)}`;
    if (balance < 0) return `You owe ${formatCurrency(Math.abs(balance))}`;
    return 'All settled up';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Link to={`/groups/${id}`}>
        <Card hover className="transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Group Icon */}
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg`}
                style={{ backgroundColor: color }}
              >
                {icon || name.charAt(0).toUpperCase()}
              </div>
              
              {/* Group Info */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {name}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{members?.length || 0} members</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{formatCurrency(totalExpenses || 0)} total</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Balance and Arrow */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className={`font-semibold ${getBalanceColor()}`}>
                  {getBalanceText()}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default GroupCard;
