import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../../components/ui/Card';
import formatCurrency from '../../utils/formatCurrency';

const BalanceCard = ({ title, amount, type, trend, className = '' }) => {
  const isPositive = amount >= 0;
  const isOwed = type === 'owed';
  
  const getCardColor = () => {
    if (isOwed) {
      return isPositive ? 'border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-800' : 'border-gray-200';
    } else {
      return isPositive ? 'border-gray-200' : 'border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800';
    }
  };

  const getAmountColor = () => {
    if (isOwed) {
      return isPositive ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400';
    } else {
      return isPositive ? 'text-gray-600 dark:text-gray-400' : 'text-red-600 dark:text-red-400';
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className={`${getCardColor()} transition-all duration-200`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {title}
            </p>
            <motion.p
              className={`text-2xl font-bold ${getAmountColor()}`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {formatCurrency(Math.abs(amount))}
            </motion.p>
            {trend !== undefined && (
              <div className="flex items-center mt-2 space-x-1">
                {getTrendIcon()}
                <span className={`text-xs ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(trend)}% from last month
                </span>
              </div>
            )}
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isOwed 
              ? (isPositive ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-gray-800')
              : (isPositive ? 'bg-gray-100 dark:bg-gray-800' : 'bg-red-100 dark:bg-red-900/20')
          }`}>
            {isOwed ? (
              <TrendingUp className={`h-6 w-6 ${isPositive ? 'text-green-600' : 'text-gray-400'}`} />
            ) : (
              <TrendingDown className={`h-6 w-6 ${isPositive ? 'text-gray-400' : 'text-red-600'}`} />
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default BalanceCard;
