import { motion } from 'framer-motion';
import { 
  Users, 
  Calculator, 
  Camera, 
  Bell, 
  Smartphone, 
  Shield, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import DarkModeToggle from '../components/ui/DarkModeToggle';

const LandingPage = () => {
  const features = [
    {
      icon: Users,
      title: 'Group Management',
      description: 'Create and manage expense groups with friends, family, or colleagues.'
    },
    {
      icon: Calculator,
      title: 'Smart Splitting',
      description: 'Automatically calculate who owes what with equal or custom splits.'
    },
    {
      icon: Camera,
      title: 'Receipt Scanner',
      description: 'Scan receipts with OCR technology to automatically extract expense details.'
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Get notified about pending payments and upcoming expenses.'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Works perfectly on all devices with offline support.'
    },
    {
      icon: Shield,
      title: 'Privacy Focused',
      description: 'Your data stays private with local storage and optional cloud sync.'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Create a Group',
      description: 'Add friends and start tracking shared expenses together.'
    },
    {
      step: '02',
      title: 'Add Expenses',
      description: 'Scan receipts or manually add expenses with smart splitting.'
    },
    {
      step: '03',
      title: 'Settle Up',
      description: 'See who owes what and settle debts with optimized payments.'
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
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl font-bold text-primary-600">EasySplit</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <DarkModeToggle />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Split Expenses
              <span className="text-primary-600"> Effortlessly</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Track shared expenses, split bills fairly, and settle up with friends. 
              No more awkward money conversations or forgotten debts.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/guest">
                <Button size="xl" className="text-lg px-8 py-4">
                  Start as Guest
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to split expenses
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to make expense sharing simple and stress-free.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card hover className="h-full text-center">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get started in three simple steps and never worry about splitting expenses again.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to simplify expense sharing?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have made expense splitting effortless.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/guest">
                <Button 
                  variant="secondary" 
                  size="xl" 
                  className="bg-white text-primary-600 hover:bg-gray-100"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">EasySplit</h3>
            <p className="text-gray-400 mb-4">
              Making expense sharing simple and stress-free.
            </p>
            <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Privacy focused</span>
              <span>•</span>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Works offline</span>
              <span>•</span>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>No signup required</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
