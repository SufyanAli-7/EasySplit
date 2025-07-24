import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Home, 
  Plane, 
  Users, 
  Heart, 
  GraduationCap,
  Coffee,
  Car,
  ShoppingBag,
  Gamepad2,
  Plus,
  Edit3,
  Trash2
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const GroupCategories = ({ selectedCategory, onCategorySelect, onCreateCategory }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', icon: '', color: '#3B82F6' });

  const defaultCategories = [
    { id: 'all', name: 'All Groups', icon: Users, color: '#6B7280', count: 0 },
    { id: 'personal', name: 'Personal', icon: Heart, color: '#EF4444', count: 0 },
    { id: 'work', name: 'Work', icon: Briefcase, color: '#3B82F6', count: 0 },
    { id: 'travel', name: 'Travel', icon: Plane, color: '#10B981', count: 0 },
    { id: 'home', name: 'Home', icon: Home, color: '#F59E0B', count: 0 },
    { id: 'education', name: 'Education', icon: GraduationCap, color: '#8B5CF6', count: 0 },
    { id: 'social', name: 'Social', icon: Coffee, color: '#06B6D4', count: 0 },
    { id: 'transport', name: 'Transport', icon: Car, color: '#84CC16', count: 0 },
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: '#F97316', count: 0 },
    { id: 'entertainment', name: 'Entertainment', icon: Gamepad2, color: '#EC4899', count: 0 }
  ];

  const iconOptions = [
    { icon: Briefcase, name: 'Briefcase' },
    { icon: Home, name: 'Home' },
    { icon: Plane, name: 'Plane' },
    { icon: Heart, name: 'Heart' },
    { icon: GraduationCap, name: 'Education' },
    { icon: Coffee, name: 'Coffee' },
    { icon: Car, name: 'Car' },
    { icon: ShoppingBag, name: 'Shopping' },
    { icon: Gamepad2, name: 'Gaming' }
  ];

  const colorOptions = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
    '#8B5CF6', '#06B6D4', '#84CC16', '#F97316',
    '#EC4899', '#6B7280'
  ];

  const handleCreateCategory = () => {
    if (newCategory.name.trim()) {
      const category = {
        id: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
        name: newCategory.name,
        icon: iconOptions.find(opt => opt.name === newCategory.icon)?.icon || Users,
        color: newCategory.color,
        count: 0,
        isCustom: true
      };
      onCreateCategory(category);
      setNewCategory({ name: '', icon: '', color: '#3B82F6' });
      setShowCreateForm(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Categories
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Create Category Form */}
      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Icon
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {iconOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={option.name}
                        onClick={() => setNewCategory(prev => ({ ...prev, icon: option.name }))}
                        className={`p-2 rounded-lg border-2 transition-colors ${
                          newCategory.icon === option.name
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <IconComponent className="h-5 w-5 mx-auto text-gray-600 dark:text-gray-400" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewCategory(prev => ({ ...prev, color }))}
                      className={`w-8 h-8 rounded-full border-2 ${
                        newCategory.color === color
                          ? 'border-gray-400 dark:border-gray-300'
                          : 'border-gray-200 dark:border-gray-600'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleCreateCategory} size="sm">
                  Create Category
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Category List */}
      <div className="space-y-2">
        {defaultCategories.map((category) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <motion.button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                isSelected
                  ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200 dark:border-primary-700'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <IconComponent 
                    className="h-4 w-4" 
                    style={{ color: category.color }}
                  />
                </div>
                <span className={`font-medium ${
                  isSelected 
                    ? 'text-primary-900 dark:text-primary-100' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {category.name}
                </span>
              </div>
              <span className={`text-sm px-2 py-1 rounded-full ${
                isSelected
                  ? 'bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {category.count}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default GroupCategories;
