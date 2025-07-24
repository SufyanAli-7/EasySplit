import { motion } from 'framer-motion';
import { 
  Users, 
  Calculator, 
  Camera, 
  Bell, 
  Smartphone,
  BarChart3,
  Shield,
  Globe,
  Zap,
  Heart,
  Star,
  CheckCircle
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const FeaturesPage = () => {
  const features = [
    {
      icon: Users,
      title: 'Multi-Group Management',
      description: 'Create and manage multiple expense groups with advanced categorization and templates.',
      status: 'new',
      color: 'blue'
    },
    {
      icon: Calculator,
      title: 'Smart Splitting',
      description: 'Automatically calculate who owes what with equal, custom, or percentage-based splits.',
      status: 'enhanced',
      color: 'green'
    },
    {
      icon: Camera,
      title: 'Receipt Scanner',
      description: 'Scan receipts with OCR technology to automatically extract expense details.',
      status: 'coming-soon',
      color: 'purple'
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Get notified about pending payments and upcoming expenses with intelligent scheduling.',
      status: 'enhanced',
      color: 'orange'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive dashboard with insights, trends, and detailed expense analytics.',
      status: 'new',
      color: 'indigo'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and stored securely with privacy-first approach.',
      status: 'core',
      color: 'red'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Works perfectly on all devices with offline support and responsive design.',
      status: 'core',
      color: 'teal'
    },
    {
      icon: Globe,
      title: 'Multi-Currency Support',
      description: 'Support for multiple currencies including INR, USD, EUR with real-time conversion.',
      status: 'new',
      color: 'yellow'
    },
    {
      icon: Zap,
      title: 'Real-time Sync',
      description: 'Instant synchronization across all devices with real-time updates.',
      status: 'enhanced',
      color: 'pink'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            <Star className="h-3 w-3 mr-1" />
            NEW
          </span>
        );
      case 'enhanced':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
            <Zap className="h-3 w-3 mr-1" />
            ENHANCED
          </span>
        );
      case 'coming-soon':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
            <Heart className="h-3 w-3 mr-1" />
            COMING SOON
          </span>
        );
      case 'core':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            CORE
          </span>
        );
      default:
        return null;
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600',
      green: 'bg-green-100 dark:bg-green-900/20 text-green-600',
      purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600',
      orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600',
      indigo: 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600',
      red: 'bg-red-100 dark:bg-red-900/20 text-red-600',
      teal: 'bg-teal-100 dark:bg-teal-900/20 text-teal-600',
      yellow: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600',
      pink: 'bg-pink-100 dark:bg-pink-900/20 text-pink-600'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Features & Capabilities
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Discover all the powerful features that make ExpenseSplit the best choice for managing shared expenses
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <div className="p-6 space-y-4">
                  {/* Icon and Status */}
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(feature.color)}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    {getStatusBadge(feature.status)}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      disabled={feature.status === 'coming-soon'}
                    >
                      {feature.status === 'coming-soon' ? 'Coming Soon' : 'Learn More'}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Call to Action */}
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="max-w-2xl mx-auto">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Join thousands of users who are already simplifying their expense management with ExpenseSplit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Start Using ExpenseSplit
              </Button>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default FeaturesPage;
