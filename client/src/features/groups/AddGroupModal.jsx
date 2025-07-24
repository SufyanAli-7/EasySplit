import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Mail } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import generateId from '../../utils/generateId';

const AddGroupModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
    icon: ''
  });
  const [members, setMembers] = useState([
    { id: 'user1', name: 'You', email: 'you@example.com', isCurrentUser: true }
  ]);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const colorOptions = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
    '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
  ];

  const iconOptions = ['🏖️', '🏠', '🍽️', '✈️', '🎉', '💼', '🏋️', '🎬', '🛒', '🚗'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMember = () => {
    if (newMemberEmail && !members.some(m => m.email === newMemberEmail)) {
      const newMember = {
        id: generateId(),
        name: newMemberEmail.split('@')[0],
        email: newMemberEmail,
        isCurrentUser: false
      };
      setMembers(prev => [...prev, newMember]);
      setNewMemberEmail('');
    }
  };

  const handleRemoveMember = (memberId) => {
    setMembers(prev => prev.filter(m => m.id !== memberId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newGroup = {
        ...formData,
        id: generateId(),
        members,
        balance: 0,
        totalExpenses: 0,
        createdAt: new Date(),
        isActive: true
      };
      
      onAdd(newGroup);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        color: '#3B82F6',
        icon: ''
      });
      setMembers([
        { id: 'user1', name: 'You', email: 'you@example.com', isCurrentUser: true }
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Group"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Group Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Group Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Weekend Trip, Roommates, Dinner Club"
            className="input-field"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description (Optional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="What's this group for?"
            rows={3}
            className="input-field resize-none"
          />
        </div>

        {/* Color Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Group Color
          </label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => (
              <motion.button
                key={color}
                type="button"
                className={`w-8 h-8 rounded-full border-2 ${
                  formData.color === color ? 'border-gray-400' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setFormData(prev => ({ ...prev, color }))}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* Icon Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Group Icon (Optional)
          </label>
          <div className="flex flex-wrap gap-2">
            {iconOptions.map((icon) => (
              <motion.button
                key={icon}
                type="button"
                className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-lg ${
                  formData.icon === icon 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, icon }))}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {icon}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Members */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Members
          </label>
          
          {/* Current Members */}
          <div className="space-y-2 mb-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {member.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {member.email}
                    </p>
                  </div>
                </div>
                {!member.isCurrentUser && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add Member */}
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder="Enter email address"
                className="input-field pl-10"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMember())}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleAddMember}
              disabled={!newMemberEmail}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
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
            disabled={!formData.name.trim()}
            className="flex-1"
          >
            Create Group
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddGroupModal;
