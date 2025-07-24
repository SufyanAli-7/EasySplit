import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Calendar, DollarSign } from 'lucide-react';
import AddExpenseForm from './AddExpenseForm';
import ExpenseCard from './ExpenseCard';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Skeleton from '../../components/ui/Skeleton';
import storage from '../../utils/storage';
import formatCurrency from '../../utils/formatCurrency';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('all'); // all, week, month, year
  const [sortBy, setSortBy] = useState('date'); // date, amount, title

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'food', name: 'Food & Dining', icon: '🍽️' },
    { id: 'transport', name: 'Transportation', icon: '🚗' },
    { id: 'accommodation', name: 'Accommodation', icon: '🏨' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
    { id: 'shopping', name: 'Shopping', icon: '🛒' },
    { id: 'utilities', name: 'Utilities', icon: '💡' },
    { id: 'health', name: 'Health & Medical', icon: '🏥' },
    { id: 'other', name: 'Other', icon: '📝' }
  ];

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = () => {
    setTimeout(() => {
      const guestData = storage.get('guestData', { expenses: [] });
      
      // Sample expenses for demonstration
      const sampleExpenses = [
        {
          id: '1',
          title: 'Hotel Booking',
          amount: 240.00,
          paidBy: 'user1',
          paidByName: 'You',
          category: 'accommodation',
          date: new Date('2024-01-20'),
          groupId: '1',
          groupName: 'Weekend Trip',
          splitBetween: ['user1', 'user2', 'user3'],
          notes: 'Beachfront hotel for 2 nights',
          createdAt: new Date('2024-01-20')
        },
        {
          id: '2',
          title: 'Gas for Road Trip',
          amount: 45.75,
          paidBy: 'user2',
          paidByName: 'Alice',
          category: 'transport',
          date: new Date('2024-01-19'),
          groupId: '1',
          groupName: 'Weekend Trip',
          splitBetween: ['user1', 'user2', 'user3'],
          createdAt: new Date('2024-01-19')
        },
        {
          id: '3',
          title: 'Dinner at Beach Restaurant',
          amount: 89.50,
          paidBy: 'user3',
          paidByName: 'Bob',
          category: 'food',
          date: new Date('2024-01-21'),
          groupId: '1',
          groupName: 'Weekend Trip',
          splitBetween: ['user1', 'user2', 'user3'],
          notes: 'Amazing seafood place with ocean view',
          createdAt: new Date('2024-01-21')
        },
        {
          id: '4',
          title: 'Grocery Shopping',
          amount: 67.32,
          paidBy: 'user1',
          paidByName: 'You',
          category: 'shopping',
          date: new Date('2024-01-18'),
          groupId: '2',
          groupName: 'Roommates',
          splitBetween: ['user1', 'user4', 'user5'],
          createdAt: new Date('2024-01-18')
        }
      ];

      setExpenses(guestData.expenses.length > 0 ? guestData.expenses : sampleExpenses);
      setLoading(false);
    }, 800);
  };

  const handleAddExpense = (newExpense) => {
    const updatedExpenses = [newExpense, ...expenses];
    setExpenses(updatedExpenses);
    
    // Update localStorage
    const guestData = storage.get('guestData', {});
    storage.set('guestData', { ...guestData, expenses: updatedExpenses });
    
    setShowAddForm(false);
  };

  const handleEditExpense = (expense) => {
    // TODO: Implement edit functionality
    console.log('Edit expense:', expense);
  };

  const handleDeleteExpense = (expense) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      const updatedExpenses = expenses.filter(e => e.id !== expense.id);
      setExpenses(updatedExpenses);
      
      // Update localStorage
      const guestData = storage.get('guestData', {});
      storage.set('guestData', { ...guestData, expenses: updatedExpenses });
    }
  };

  const getFilteredExpenses = () => {
    let filtered = expenses;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(expense =>
        expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.paidByName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.groupName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(expense => expense.category === filterCategory);
    }

    // Date range filter
    if (filterDateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filterDateRange) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(expense => 
        new Date(expense.date || expense.createdAt) >= filterDate
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'amount':
          return b.amount - a.amount;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
        default:
          return new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt);
      }
    });

    return filtered;
  };

  const getTotalAmount = () => {
    return getFilteredExpenses().reduce((sum, expense) => sum + expense.amount, 0);
  };

  const filteredExpenses = getFilteredExpenses();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton height="h-8" width="w-32" />
          <Skeleton height="h-10" width="w-24" />
        </div>
        <Skeleton.Card />
        <div className="flex space-x-4">
          <Skeleton height="h-10" width="w-64" />
          <Skeleton height="h-10" width="w-32" />
        </div>
        <Skeleton.List items={4} />
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.h1
          className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Expense Tracker
        </motion.h1>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(getTotalAmount())}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {filteredExpenses.length} expenses
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Filter className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Average</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(filteredExpenses.length > 0 ? getTotalAmount() / filteredExpenses.length : 0)}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="flex flex-col lg:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="input-field w-auto"
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        
        <select
          value={filterDateRange}
          onChange={(e) => setFilterDateRange(e.target.value)}
          className="input-field w-auto"
        >
          <option value="all">All Time</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-field w-auto"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="title">Sort by Title</option>
        </select>
      </motion.div>

      {/* Expenses List */}
      {filteredExpenses.length > 0 ? (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
        >
          {filteredExpenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {searchTerm || filterCategory !== 'all' ? 'No expenses found' : 'No expenses yet'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm || filterCategory !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Start tracking your expenses by adding your first expense'
            }
          </p>
          {!searchTerm && filterCategory === 'all' && (
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Expense
            </Button>
          )}
        </motion.div>
      )}

      {/* Add Expense Modal */}
      <AddExpenseForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onAdd={handleAddExpense}
      />
    </motion.div>
  );
};

export default ExpenseTracker;
