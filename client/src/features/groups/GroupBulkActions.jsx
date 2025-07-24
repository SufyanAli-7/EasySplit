import { motion } from 'framer-motion';
import { 
  Archive, 
  RotateCcw, 
  Trash2, 
  Users, 
  Merge,
  X,
  Check
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const GroupBulkActions = ({ 
  selectedGroups, 
  groups, 
  onAction, 
  onClose, 
  isOpen 
}) => {
  if (!isOpen || selectedGroups.length === 0) return null;

  const selectedGroupsData = groups.filter(group => selectedGroups.includes(group.id));
  const hasActiveGroups = selectedGroupsData.some(group => group.isActive);
  const hasInactiveGroups = selectedGroupsData.some(group => !group.isActive);

  const actions = [
    {
      id: 'archive',
      label: 'Archive Groups',
      description: 'Move selected groups to archived state',
      icon: Archive,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      available: hasActiveGroups,
      destructive: false
    },
    {
      id: 'activate',
      label: 'Activate Groups',
      description: 'Restore selected groups to active state',
      icon: RotateCcw,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      available: hasInactiveGroups,
      destructive: false
    },
    {
      id: 'merge',
      label: 'Merge Groups',
      description: 'Combine selected groups into one',
      icon: Merge,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      available: selectedGroups.length >= 2,
      destructive: false
    },
    {
      id: 'delete',
      label: 'Delete Groups',
      description: 'Permanently remove selected groups',
      icon: Trash2,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      available: true,
      destructive: true
    }
  ];

  const handleAction = (actionId) => {
    onAction(actionId, selectedGroups);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
    >
      <Card className="shadow-xl border-2 border-primary-200 dark:border-primary-700">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                <Check className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {selectedGroups.length} Group{selectedGroups.length !== 1 ? 's' : ''} Selected
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose an action to apply
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Selected Groups Preview */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {selectedGroupsData.slice(0, 3).map((group) => (
                <div
                  key={group.id}
                  className="flex items-center space-x-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  <div 
                    className="w-4 h-4 rounded-full flex items-center justify-center text-xs"
                    style={{ backgroundColor: group.color }}
                  >
                    {group.icon || group.name.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {group.name}
                  </span>
                </div>
              ))}
              {selectedGroupsData.length > 3 && (
                <div className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    +{selectedGroupsData.length - 3} more
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            {actions.filter(action => action.available).map((action) => {
              const IconComponent = action.icon;
              
              return (
                <motion.button
                  key={action.id}
                  onClick={() => handleAction(action.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                    action.destructive
                      ? 'border-red-200 dark:border-red-700 hover:border-red-300 dark:hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/10'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.bgColor}`}>
                    <IconComponent className={`h-4 w-4 ${action.color}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`font-medium ${
                      action.destructive 
                        ? 'text-red-700 dark:text-red-300' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {action.label}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {action.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="w-full"
            >
              Cancel Selection
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default GroupBulkActions;
