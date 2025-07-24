import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Users, 
  Calendar, 
  Tag, 
  Receipt,
  Camera,
  Plus,
  Minus
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import storage from '../../utils/storage';
import generateId from '../../utils/generateId';

const AddExpenseForm = ({ isOpen, onClose, onAdd, groupId = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    paidBy: '',
    category: 'other',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    splitType: 'equal', // equal, custom, percentage
    tags: []
  });
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [customSplits, setCustomSplits] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'food', name: 'Food & Dining', icon: '🍽️', color: '#F59E0B' },
    { id: 'transport', name: 'Transportation', icon: '🚗', color: '#3B82F6' },
    { id: 'accommodation', name: 'Accommodation', icon: '🏨', color: '#10B981' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: '#8B5CF6' },
    { id: 'shopping', name: 'Shopping', icon: '🛒', color: '#EF4444' },
    { id: 'utilities', name: 'Utilities', icon: '💡', color: '#06B6D4' },
    { id: 'health', name: 'Health & Medical', icon: '🏥', color: '#EC4899' },
    { id: 'other', name: 'Other', icon: '📝', color: '#6B7280' }
  ];

  useEffect(() => {
    loadGroups();
  }, []);

  useEffect(() => {
    if (groupId) {
      const group = groups.find(g => g.id === groupId);
      if (group) {
        setSelectedGroup(group);
        setFormData(prev => ({ ...prev, paidBy: 'user1' })); // Current user
      }
    }
  }, [groupId, groups]);

  const loadGroups = () => {
    const guestData = storage.get('guestData', { groups: [] });
    
    // Sample groups if none exist
    const sampleGroups = [
      {
        id: '1',
        name: 'Weekend Trip',
        members: [
          { id: 'user1', name: 'You', email: 'you@example.com' },
          { id: 'user2', name: 'Alice', email: 'alice@example.com' },
          { id: 'user3', name: 'Bob', email: 'bob@example.com' }
        ]
      },
      {
        id: '2',
        name: 'Roommates',
        members: [
          { id: 'user1', name: 'You', email: 'you@example.com' },
          { id: 'user4', name: 'Sarah', email: 'sarah@example.com' },
          { id: 'user5', name: 'Mike', email: 'mike@example.com' }
        ]
      }
    ];

    setGroups(guestData.groups.length > 0 ? guestData.groups : sampleGroups);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGroupChange = (groupId) => {
    const group = groups.find(g => g.id === groupId);
    setSelectedGroup(group);
    setFormData(prev => ({ ...prev, paidBy: 'user1' }));
    
    // Initialize custom splits
    if (group) {
      const splits = {};
      group.members.forEach(member => {
        splits[member.id] = '';
      });
      setCustomSplits(splits);
    }
  };

  const handleCustomSplitChange = (memberId, value) => {
    setCustomSplits(prev => ({
      ...prev,
      [memberId]: value
    }));
  };

  const calculateEqualSplit = () => {
    if (!selectedGroup || !formData.amount) return 0;
    return (parseFloat(formData.amount) / selectedGroup.members.length).toFixed(2);
  };

  const validateCustomSplits = () => {
    if (formData.splitType !== 'custom') return true;
    
    const total = Object.values(customSplits).reduce((sum, value) => {
      return sum + (parseFloat(value) || 0);
    }, 0);
    
    return Math.abs(total - parseFloat(formData.amount)) < 0.01;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGroup || !formData.title.trim() || !formData.amount) return;

    if (!validateCustomSplits()) {
      alert('Custom split amounts must equal the total expense amount');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newExpense = {
        id: generateId(),
        ...formData,
        amount: parseFloat(formData.amount),
        groupId: selectedGroup.id,
        groupName: selectedGroup.name,
        paidByName: selectedGroup.members.find(m => m.id === formData.paidBy)?.name || 'Unknown',
        splitBetween: selectedGroup.members.map(m => m.id),
        customSplits: formData.splitType === 'custom' ? customSplits : null,
        createdAt: new Date()
      };

      onAdd(newExpense);
      
      // Reset form
      setFormData({
        title: '',
        amount: '',
        paidBy: '',
        category: 'other',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        splitType: 'equal',
        tags: []
      });
      setCustomSplits({});
      setLoading(false);
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Expense"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Group Selection */}
        {!groupId && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Group *
            </label>
            <select
              value={selectedGroup?.id || ''}
              onChange={(e) => handleGroupChange(e.target.value)}
              className="input-field"
              required
            >
              <option value="">Choose a group...</option>
              {groups.map(group => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Expense Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Expense Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Dinner at restaurant, Gas for trip"
            className="input-field"
            required
          />
        </div>

        {/* Amount and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="input-field pl-10"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="input-field pl-10"
              />
            </div>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {categories.map(category => (
              <motion.button
                key={category.id}
                type="button"
                className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                  formData.category === category.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-lg mb-1">{category.icon}</div>
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {category.name}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Paid By */}
        {selectedGroup && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Paid By *
            </label>
            <select
              name="paidBy"
              value={formData.paidBy}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="">Select who paid...</option>
              {selectedGroup.members.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Split Type */}
        {selectedGroup && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Split Method
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="splitType"
                  value="equal"
                  checked={formData.splitType === 'equal'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Equal Split
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="splitType"
                  value="custom"
                  checked={formData.splitType === 'custom'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Custom Amounts
              </label>
            </div>

            {/* Split Preview */}
            {formData.amount && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Split Preview
                </h4>
                <div className="space-y-2">
                  {selectedGroup.members.map(member => (
                    <div key={member.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {member.name}
                      </span>
                      {formData.splitType === 'equal' ? (
                        <span className="font-medium">
                          ${calculateEqualSplit()}
                        </span>
                      ) : (
                        <input
                          type="number"
                          value={customSplits[member.id] || ''}
                          onChange={(e) => handleCustomSplitChange(member.id, e.target.value)}
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Add any additional details..."
            rows={3}
            className="input-field resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            disabled={!selectedGroup || !formData.title.trim() || !formData.amount}
            className="flex-1"
          >
            Add Expense
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddExpenseForm;
