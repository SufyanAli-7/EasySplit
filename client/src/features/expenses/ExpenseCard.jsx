import { motion } from 'framer-motion';
import { MoreVertical, Edit, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import Card from '../../components/ui/Card';
import formatCurrency from '../../utils/formatCurrency';

const ExpenseCard = ({ expense, onEdit, onDelete, className = '' }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getCategoryIcon = (category) => {
    const icons = {
      food: '🍽️',
      transport: '🚗',
      accommodation: '🏨',
      entertainment: '🎬',
      shopping: '🛒',
      utilities: '💡',
      health: '🏥',
      other: '📝'
    };
    return icons[category] || icons.other;
  };

  const getCategoryColor = (category) => {
    const colors = {
      food: '#F59E0B',
      transport: '#3B82F6',
      accommodation: '#10B981',
      entertainment: '#8B5CF6',
      shopping: '#EF4444',
      utilities: '#06B6D4',
      health: '#EC4899',
      other: '#6B7280'
    };
    return colors[category] || colors.other;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getSplitInfo = () => {
    if (expense.customSplits) {
      return `Custom split • ${expense.splitBetween.length} people`;
    }
    return `Split ${expense.splitBetween.length} ways`;
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card hover className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            {/* Category Icon */}
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
              style={{ backgroundColor: getCategoryColor(expense.category) }}
            >
              {getCategoryIcon(expense.category)}
            </div>
            
            {/* Expense Details */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {expense.title}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Paid by {expense.paidByName}</span>
                <span>•</span>
                <span>{formatDate(expense.date || expense.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-500 mt-1">
                <Users className="h-3 w-3" />
                <span>{getSplitInfo()}</span>
                {expense.groupName && (
                  <>
                    <span>•</span>
                    <span>{expense.groupName}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Amount and Actions */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="font-bold text-lg text-gray-900 dark:text-white">
                {formatCurrency(expense.amount)}
              </p>
              {expense.splitBetween && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatCurrency(expense.amount / expense.splitBetween.length)} per person
                </p>
              )}
            </div>
            
            {/* Menu Button */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <MoreVertical className="h-4 w-4 text-gray-400" />
              </button>
              
              {/* Dropdown Menu */}
              {showMenu && (
                <motion.div
                  className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10"
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="py-1">
                    <button
                      onClick={() => {
                        onEdit(expense);
                        setShowMenu(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Edit className="h-4 w-4 mr-3" />
                      Edit Expense
                    </button>
                    <button
                      onClick={() => {
                        onDelete(expense);
                        setShowMenu(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Trash2 className="h-4 w-4 mr-3" />
                      Delete Expense
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        
        {/* Notes */}
        {expense.notes && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {expense.notes}
            </p>
          </div>
        )}
        
        {/* Tags */}
        {expense.tags && expense.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {expense.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Card>
      
      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowMenu(false)}
        />
      )}
    </motion.div>
  );
};

export default ExpenseCard;
