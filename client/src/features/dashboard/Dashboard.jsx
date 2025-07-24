import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import BalanceCard from './BalanceCard';
import QuickActions from './QuickActions';
import GroupCard from '../groups/GroupCard';
import GroupDashboard from '../groups/GroupDashboard';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
import storage from '../../utils/storage';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, analytics
  const [data, setData] = useState({
    groups: [],
    totalOwed: 0,
    totalOwing: 0,
    recentExpenses: []
  });

  useEffect(() => {
    // Simulate loading and fetch data from localStorage
    const loadData = () => {
      setTimeout(() => {
        const guestData = storage.get('guestData', {
          groups: [],
          expenses: [],
          reminders: []
        });

        // Sample data for demonstration
        const sampleGroups = [
          {
            id: '1',
            name: 'Weekend Trip',
            icon: '🏖️',
            color: '#3B82F6',
            members: ['You', 'Alice', 'Bob'],
            balance: 45.50,
            totalExpenses: 320.75
          },
          {
            id: '2',
            name: 'Roommates',
            icon: '🏠',
            color: '#10B981',
            members: ['You', 'Sarah', 'Mike'],
            balance: -23.25,
            totalExpenses: 156.80
          },
          {
            id: '3',
            name: 'Dinner Club',
            icon: '🍽️',
            color: '#F59E0B',
            members: ['You', 'Emma', 'David', 'Lisa'],
            balance: 0,
            totalExpenses: 89.40
          }
        ];

        // Calculate totals
        const totalOwed = sampleGroups
          .filter(group => group.balance > 0)
          .reduce((sum, group) => sum + group.balance, 0);
        
        const totalOwing = Math.abs(sampleGroups
          .filter(group => group.balance < 0)
          .reduce((sum, group) => sum + group.balance, 0));

        setData({
          groups: guestData.groups.length > 0 ? guestData.groups : sampleGroups,
          totalOwed,
          totalOwing,
          recentExpenses: guestData.expenses || []
        });
        
        setLoading(false);
      }, 1000);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Balance Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton.Card />
          <Skeleton.Card />
        </div>
        
        {/* Quick Actions Skeleton */}
        <div>
          <Skeleton height="h-6" width="w-32" className="mb-4" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height="h-24" rounded="rounded-xl" />
            ))}
          </div>
        </div>
        
        {/* Groups Skeleton */}
        <div>
          <Skeleton height="h-6" width="w-24" className="mb-4" />
          <Skeleton.List items={3} />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome back! 👋
          </motion.h1>
          <motion.p
            className="text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Here's your expense overview
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mt-4 sm:mt-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'analytics'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="h-4 w-4 mr-2 inline" />
            Analytics
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BalanceCard
              title="You're owed"
              amount={data.totalOwed}
              type="owed"
              trend={12}
            />
            <BalanceCard
              title="You owe"
              amount={-data.totalOwing}
              type="owing"
              trend={-5}
            />
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Groups Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Your Groups
              </h2>
              <Link to="/groups">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  View All Groups
                </Button>
              </Link>
            </div>

            {data.groups.length > 0 ? (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, staggerChildren: 0.1 }}
              >
                {data.groups.slice(0, 3).map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
                {data.groups.length > 3 && (
                  <div className="text-center pt-4">
                    <Link to="/groups">
                      <Button variant="outline">
                        View {data.groups.length - 3} More Groups
                      </Button>
                    </Link>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No groups yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Create your first group to start tracking shared expenses
                </p>
                <Link to="/groups">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Group
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </>
      )}

      {activeTab === 'analytics' && (
        <GroupDashboard groups={data.groups} />
      )}
    </motion.div>
  );
};

export default Dashboard;
