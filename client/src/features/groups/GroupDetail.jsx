import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Users, 
  DollarSign, 
  Plus, 
  Settings,
  Receipt,
  Calculator
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Skeleton from '../../components/ui/Skeleton';
import formatCurrency from '../../utils/formatCurrency';

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('expenses'); // expenses, balances, members

  useEffect(() => {
    loadGroupDetail();
  }, [groupId]);

  const loadGroupDetail = () => {
    setTimeout(() => {
      // Sample group data
      const sampleGroup = {
        id: groupId,
        name: 'Weekend Trip',
        icon: '🏖️',
        color: '#3B82F6',
        description: 'Our amazing weekend getaway to the beach',
        members: [
          { id: 'user1', name: 'You', email: 'you@example.com', balance: 45.50 },
          { id: 'user2', name: 'Alice', email: 'alice@example.com', balance: -15.25 },
          { id: 'user3', name: 'Bob', email: 'bob@example.com', balance: -30.25 }
        ],
        expenses: [
          {
            id: '1',
            title: 'Hotel Booking',
            amount: 240.00,
            paidBy: 'user1',
            paidByName: 'You',
            date: new Date('2024-01-20'),
            category: 'accommodation',
            splitBetween: ['user1', 'user2', 'user3']
          },
          {
            id: '2',
            title: 'Gas for Road Trip',
            amount: 45.75,
            paidBy: 'user2',
            paidByName: 'Alice',
            date: new Date('2024-01-19'),
            category: 'transport',
            splitBetween: ['user1', 'user2', 'user3']
          },
          {
            id: '3',
            title: 'Dinner at Beach Restaurant',
            amount: 89.50,
            paidBy: 'user3',
            paidByName: 'Bob',
            date: new Date('2024-01-21'),
            category: 'food',
            splitBetween: ['user1', 'user2', 'user3']
          }
        ],
        totalExpenses: 375.25,
        createdAt: new Date('2024-01-15'),
        isActive: true
      };

      setGroup(sampleGroup);
      setLoading(false);
    }, 800);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      food: '🍽️',
      transport: '🚗',
      accommodation: '🏨',
      entertainment: '🎬',
      shopping: '🛒',
      other: '📝'
    };
    return icons[category] || icons.other;
  };

  const getBalanceColor = (balance) => {
    if (balance > 0) return 'text-green-600 dark:text-green-400';
    if (balance < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Skeleton height="h-8" width="w-8" rounded="rounded-lg" />
          <Skeleton height="h-8" width="w-48" />
        </div>
        <Skeleton.Card />
        <div className="flex space-x-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} height="h-10" width="w-24" />
          ))}
        </div>
        <Skeleton.List items={3} />
      </div>
    );
  }

  if (!group) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Group not found
        </h2>
        <Button onClick={() => navigate('/groups')}>
          Back to Groups
        </Button>
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/groups')}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: group.color }}
            >
              {group.icon || group.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {group.name}
              </h1>
              {group.description && (
                <p className="text-gray-600 dark:text-gray-400">
                  {group.description}
                </p>
              )}
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(group.totalExpenses)}
              </p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Members</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {group.members.length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Receipt className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Expenses</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {group.expenses.length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
        <Button variant="outline">
          <Calculator className="h-4 w-4 mr-2" />
          Settle Up
        </Button>
        <Button variant="outline">
          <Receipt className="h-4 w-4 mr-2" />
          Scan Receipt
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {[
            { id: 'expenses', label: 'Expenses', count: group.expenses.length },
            { id: 'balances', label: 'Balances', count: group.members.length },
            { id: 'members', label: 'Members', count: group.members.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'expenses' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {group.expenses.map((expense) => (
              <Card key={expense.id} hover>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">
                      {getCategoryIcon(expense.category)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {expense.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Paid by {expense.paidByName} • {expense.date.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      {formatCurrency(expense.amount)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Split {expense.splitBetween.length} ways
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        )}

        {activeTab === 'balances' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {group.members.map((member) => (
              <Card key={member.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <div className={`font-bold ${getBalanceColor(member.balance)}`}>
                    {member.balance > 0 && '+'}
                    {formatCurrency(member.balance)}
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        )}

        {activeTab === 'members' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {group.members.map((member) => (
              <Card key={member.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Member since {group.createdAt.toLocaleDateString()}
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default GroupDetail;
