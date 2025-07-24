import { motion } from 'framer-motion';
import { 
  Plane, 
  Home, 
  Briefcase, 
  GraduationCap, 
  Coffee,
  Car,
  ShoppingBag,
  Heart,
  Users,
  Utensils,
  Dumbbell,
  Camera
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const GroupTemplates = ({ onSelectTemplate }) => {
  const templates = [
    {
      id: 'weekend-trip',
      name: 'Weekend Trip',
      description: 'Perfect for short getaways with friends',
      icon: Plane,
      color: '#3B82F6',
      category: 'travel',
      suggestedMembers: 3,
      commonExpenses: ['Accommodation', 'Food', 'Transportation', 'Activities'],
      settings: {
        splitMethod: 'equal',
        currency: 'USD',
        allowDecimals: true
      }
    },
    {
      id: 'roommates',
      name: 'Roommates',
      description: 'Manage shared household expenses',
      icon: Home,
      color: '#10B981',
      category: 'home',
      suggestedMembers: 4,
      commonExpenses: ['Rent', 'Utilities', 'Groceries', 'Internet', 'Cleaning Supplies'],
      settings: {
        splitMethod: 'equal',
        currency: 'USD',
        allowDecimals: true,
        recurringExpenses: true
      }
    },
    {
      id: 'office-team',
      name: 'Office Team',
      description: 'Track team lunches and office expenses',
      icon: Briefcase,
      color: '#F59E0B',
      category: 'work',
      suggestedMembers: 6,
      commonExpenses: ['Team Lunch', 'Coffee', 'Office Supplies', 'Team Events'],
      settings: {
        splitMethod: 'equal',
        currency: 'USD',
        allowDecimals: true
      }
    },
    {
      id: 'study-group',
      name: 'Study Group',
      description: 'Share costs for study materials and sessions',
      icon: GraduationCap,
      color: '#8B5CF6',
      category: 'education',
      suggestedMembers: 5,
      commonExpenses: ['Books', 'Study Materials', 'Group Sessions', 'Snacks'],
      settings: {
        splitMethod: 'equal',
        currency: 'USD',
        allowDecimals: true
      }
    },
    {
      id: 'dinner-club',
      name: 'Dinner Club',
      description: 'Regular dining experiences with friends',
      icon: Utensils,
      color: '#EF4444',
      category: 'social',
      suggestedMembers: 4,
      commonExpenses: ['Restaurant Bills', 'Drinks', 'Tips', 'Delivery'],
      settings: {
        splitMethod: 'equal',
        currency: 'USD',
        allowDecimals: true
      }
    },
    {
      id: 'fitness-group',
      name: 'Fitness Group',
      description: 'Share gym memberships and fitness costs',
      icon: Dumbbell,
      color: '#06B6D4',
      category: 'personal',
      suggestedMembers: 3,
      commonExpenses: ['Gym Membership', 'Personal Trainer', 'Equipment', 'Supplements'],
      settings: {
        splitMethod: 'equal',
        currency: 'USD',
        allowDecimals: true
      }
    },
    {
      id: 'carpool',
      name: 'Carpool',
      description: 'Split transportation costs',
      icon: Car,
      color: '#84CC16',
      category: 'transport',
      suggestedMembers: 4,
      commonExpenses: ['Gas', 'Parking', 'Tolls', 'Car Maintenance'],
      settings: {
        splitMethod: 'equal',
        currency: 'USD',
        allowDecimals: true
      }
    },
    {
      id: 'shopping-group',
      name: 'Shopping Group',
      description: 'Bulk buying and shared purchases',
      icon: ShoppingBag,
      color: '#F97316',
      category: 'shopping',
      suggestedMembers: 3,
      commonExpenses: ['Bulk Items', 'Shared Purchases', 'Delivery Fees'],
      settings: {
        splitMethod: 'equal',
        currency: 'USD',
        allowDecimals: true
      }
    },
    {
      id: 'photography-group',
      name: 'Photography Group',
      description: 'Share equipment and workshop costs',
      icon: Camera,
      color: '#EC4899',
      category: 'entertainment',
      suggestedMembers: 4,
      commonExpenses: ['Equipment Rental', 'Workshops', 'Photo Prints', 'Travel'],
      settings: {
        splitMethod: 'equal',
        currency: 'USD',
        allowDecimals: true
      }
    }
  ];

  const handleSelectTemplate = (template) => {
    onSelectTemplate(template);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Group Templates
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Choose a template to quickly set up your group with common settings and expense categories
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => {
          const IconComponent = template.icon;
          
          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                hover 
                className="h-full cursor-pointer transition-all duration-200 hover:shadow-lg"
                onClick={() => handleSelectTemplate(template)}
              >
                <div className="p-4 space-y-4">
                  {/* Header */}
                  <div className="flex items-start space-x-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: template.color }}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {template.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {template.description}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Suggested members:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {template.suggestedMembers}
                      </span>
                    </div>

                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 block mb-2">
                        Common expenses:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {template.commonExpenses.slice(0, 3).map((expense, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                          >
                            {expense}
                          </span>
                        ))}
                        {template.commonExpenses.length > 3 && (
                          <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                            +{template.commonExpenses.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTemplate(template);
                      }}
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Custom Template Option */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card 
          hover 
          className="cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 transition-colors"
          onClick={() => handleSelectTemplate(null)}
        >
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Create Custom Group
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Start from scratch with your own settings
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default GroupTemplates;
