import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Calendar,
  Activity,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import formatCurrency from '../../utils/formatCurrency';

const GroupDashboard = ({ groups = [] }) => {
  const [timeRange, setTimeRange] = useState('30d'); // 7d, 30d, 90d, 1y
  const [stats, setStats] = useState({
    totalGroups: 0,
    activeGroups: 0,
    totalMembers: 0,
    totalExpenses: 0,
    totalOwed: 0,
    totalOwing: 0,
    recentActivity: []
  });

  useEffect(() => {
    calculateStats();
  }, [groups, timeRange]);

  const calculateStats = () => {
    const totalGroups = groups.length;
    const activeGroups = groups.filter(group => group.isActive).length;
    
    // Calculate unique members across all groups
    const allMembers = new Set();
    groups.forEach(group => {
      group.members?.forEach(member => allMembers.add(member.email));
    });
    
    const totalExpenses = groups.reduce((sum, group) => sum + (group.totalExpenses || 0), 0);
    const totalOwed = groups.reduce((sum, group) => sum + Math.max(0, group.balance || 0), 0);
    const totalOwing = groups.reduce((sum, group) => sum + Math.abs(Math.min(0, group.balance || 0)), 0);

    setStats({
      totalGroups,
      activeGroups,
      totalMembers: allMembers.size,
      totalExpenses,
      totalOwed,
      totalOwing,
      recentActivity: generateRecentActivity()
    });
  };

  const generateRecentActivity = () => {
    // Mock recent activity data
    return [
      {
        id: 1,
        type: 'expense_added',
        groupName: 'Weekend Trip',
        description: 'Dinner at restaurant',
        amount: 85.50,
        time: '2 hours ago'
      },
      {
        id: 2,
        type: 'member_joined',
        groupName: 'Office Team',
        description: 'Sarah joined the group',
        time: '5 hours ago'
      },
      {
        id: 3,
        type: 'payment_made',
        groupName: 'Roommates',
        description: 'Mike paid $45.00',
        amount: 45.00,
        time: '1 day ago'
      }
    ];
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'expense_added':
        return <DollarSign className="h-4 w-4 text-red-500" />;
      case 'member_joined':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'payment_made':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const statCards = [
    {
      title: 'Total Groups',
      value: stats.totalGroups,
      change: '+2 this month',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Groups',
      value: stats.activeGroups,
      change: `${stats.activeGroups}/${stats.totalGroups} active`,
      trend: 'neutral',
      icon: Activity,
      color: 'green'
    },
    {
      title: 'Total Members',
      value: stats.totalMembers,
      change: '+3 this month',
      trend: 'up',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(stats.totalExpenses),
      change: '+12% this month',
      trend: 'up',
      icon: DollarSign,
      color: 'orange'
    }
  ];

  const balanceCards = [
    {
      title: "You're Owed",
      value: formatCurrency(stats.totalOwed),
      trend: 'up',
      color: 'green'
    },
    {
      title: 'You Owe',
      value: formatCurrency(stats.totalOwing),
      trend: 'down',
      color: 'red'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Group Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Overview of all your expense groups
          </p>
        </div>
        <div className="flex space-x-2">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-1">
                      {stat.trend === 'up' && <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />}
                      {stat.trend === 'down' && <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />}
                      <span className={`text-xs ${
                        stat.trend === 'up' ? 'text-green-600' : 
                        stat.trend === 'down' ? 'text-red-600' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/20' :
                    stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/20' :
                    stat.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/20' :
                    stat.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/20' :
                    'bg-gray-100 dark:bg-gray-900/20'
                  }`}>
                    <IconComponent className={`h-6 w-6 ${
                      stat.color === 'blue' ? 'text-blue-600' :
                      stat.color === 'green' ? 'text-green-600' :
                      stat.color === 'purple' ? 'text-purple-600' :
                      stat.color === 'orange' ? 'text-orange-600' :
                      'text-gray-600'
                    }`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {balanceCards.map((balance, index) => (
          <motion.div
            key={balance.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          >
            <Card>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {balance.title}
                </p>
                <p className={`text-3xl font-bold ${
                  balance.color === 'green' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {balance.value}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h3>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {activity.groupName} • {activity.time}
                  </p>
                </div>
                {activity.amount && (
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(activity.amount)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default GroupDashboard;
