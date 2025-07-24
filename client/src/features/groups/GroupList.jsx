import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Grid, List, SortAsc, MoreVertical } from 'lucide-react';
import GroupCard from './GroupCard';
import AddGroupModal from './AddGroupModal';
import GroupCategories from './GroupCategories';
import GroupSetupWizard from './GroupSetupWizard';
import GroupBulkActions from './GroupBulkActions';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
import storage from '../../utils/storage';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  const [filterType, setFilterType] = useState('all'); // all, active, settled
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [sortBy, setSortBy] = useState('name'); // name, date, balance, members
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = () => {
    setTimeout(() => {
      const guestData = storage.get('guestData', { groups: [] });
      
      // Sample groups for demonstration
      const sampleGroups = [
        {
          id: '1',
          name: 'Weekend Trip',
          icon: '🏖️',
          color: '#3B82F6',
          category: 'travel',
          description: 'Our amazing weekend getaway to the beach',
          members: [
            { id: 'user1', name: 'You', email: 'you@example.com' },
            { id: 'user2', name: 'Alice', email: 'alice@example.com' },
            { id: 'user3', name: 'Bob', email: 'bob@example.com' }
          ],
          balance: 45.50,
          totalExpenses: 320.75,
          createdAt: new Date('2024-01-15'),
          isActive: true
        },
        {
          id: '2',
          name: 'Roommates',
          icon: '🏠',
          color: '#10B981',
          category: 'home',
          description: 'Shared household expenses',
          members: [
            { id: 'user1', name: 'You', email: 'you@example.com' },
            { id: 'user4', name: 'Sarah', email: 'sarah@example.com' },
            { id: 'user5', name: 'Mike', email: 'mike@example.com' }
          ],
          balance: -23.25,
          totalExpenses: 156.80,
          createdAt: new Date('2024-01-10'),
          isActive: true
        },
        {
          id: '3',
          name: 'Dinner Club',
          icon: '🍽️',
          color: '#F59E0B',
          category: 'social',
          description: 'Regular dining experiences with friends',
          members: [
            { id: 'user1', name: 'You', email: 'you@example.com' },
            { id: 'user6', name: 'Emma', email: 'emma@example.com' },
            { id: 'user7', name: 'David', email: 'david@example.com' },
            { id: 'user8', name: 'Lisa', email: 'lisa@example.com' }
          ],
          balance: 0,
          totalExpenses: 89.40,
          createdAt: new Date('2024-01-05'),
          isActive: false
        },
        {
          id: '4',
          name: 'Office Team',
          icon: '💼',
          color: '#8B5CF6',
          category: 'work',
          description: 'Team lunches and office expenses',
          members: [
            { id: 'user1', name: 'You', email: 'you@example.com' },
            { id: 'user9', name: 'John', email: 'john@example.com' },
            { id: 'user10', name: 'Kate', email: 'kate@example.com' },
            { id: 'user11', name: 'Tom', email: 'tom@example.com' }
          ],
          balance: 12.75,
          totalExpenses: 245.60,
          createdAt: new Date('2024-01-20'),
          isActive: true
        }
      ];

      setGroups(guestData.groups.length > 0 ? guestData.groups : sampleGroups);
      setLoading(false);
    }, 800);
  };

  const handleAddGroup = (newGroup) => {
    const updatedGroups = [...groups, { ...newGroup, id: Date.now().toString() }];
    setGroups(updatedGroups);

    // Update localStorage
    const guestData = storage.get('guestData', {});
    storage.set('guestData', { ...guestData, groups: updatedGroups });

    setShowAddModal(false);
  };

  const handleWizardComplete = (newGroup) => {
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);

    // Update localStorage
    const guestData = storage.get('guestData', {});
    storage.set('guestData', { ...guestData, groups: updatedGroups });

    setShowSetupWizard(false);
  };

  const handleGroupSelect = (groupId) => {
    setSelectedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleBulkAction = (action, groupIds) => {
    let updatedGroups = [...groups];

    switch (action) {
      case 'archive':
        updatedGroups = updatedGroups.map(group =>
          groupIds.includes(group.id) ? { ...group, isActive: false } : group
        );
        break;
      case 'activate':
        updatedGroups = updatedGroups.map(group =>
          groupIds.includes(group.id) ? { ...group, isActive: true } : group
        );
        break;
      case 'delete':
        updatedGroups = updatedGroups.filter(group => !groupIds.includes(group.id));
        break;
    }

    setGroups(updatedGroups);
    const guestData = storage.get('guestData', {});
    storage.set('guestData', { ...guestData, groups: updatedGroups });
    setSelectedGroups([]);
    setShowBulkActions(false);
  };

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.members.some(member =>
                           member.name.toLowerCase().includes(searchTerm.toLowerCase())
                         ) ||
                         (group.description && group.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = filterType === 'all' ||
                         (filterType === 'active' && group.isActive) ||
                         (filterType === 'settled' && !group.isActive);

    const matchesCategory = selectedCategory === 'all' || group.category === selectedCategory;

    return matchesSearch && matchesFilter && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'balance':
        return Math.abs(b.balance) - Math.abs(a.balance);
      case 'members':
        return b.members.length - a.members.length;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton height="h-8" width="w-32" />
          <Skeleton height="h-10" width="w-24" />
        </div>
        <div className="flex space-x-4">
          <Skeleton height="h-10" width="w-64" />
          <Skeleton height="h-10" width="w-32" />
        </div>
        <Skeleton.List items={3} />
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Your Groups
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your expense sharing groups
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
          <Button onClick={() => setShowSetupWizard(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Setup Wizard
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <motion.div
        className="flex flex-col lg:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search groups, members, or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input-field w-auto"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="settled">Settled</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field w-auto"
          >
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
            <option value="balance">Sort by Balance</option>
            <option value="members">Sort by Members</option>
          </select>
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          {selectedGroups.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setShowBulkActions(true)}
              className="flex items-center"
            >
              <MoreVertical className="h-4 w-4 mr-2" />
              Actions ({selectedGroups.length})
            </Button>
          )}
        </div>
      </motion.div>

      {/* Categories Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <GroupCategories
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            onCreateCategory={(category) => {
              // Handle custom category creation
              console.log('New category:', category);
            }}
          />
        </div>
        <div className="lg:col-span-3">
          {/* Groups List */}
          {filteredGroups.length > 0 ? (
            <motion.div
              className={viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                : "space-y-4"
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, staggerChildren: 0.1 }}
            >
              {filteredGroups.map((group) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {selectedGroups.length > 0 && (
                    <div className="absolute top-2 left-2 z-10">
                      <input
                        type="checkbox"
                        checked={selectedGroups.includes(group.id)}
                        onChange={() => handleGroupSelect(group.id)}
                        className="w-4 h-4 text-primary-600 bg-white border-gray-300 rounded focus:ring-primary-500"
                      />
                    </div>
                  )}
                  <GroupCard group={group} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {searchTerm || selectedCategory !== 'all' ? 'No groups found' : 'No groups yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || selectedCategory !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Create your first group to start tracking shared expenses'
                }
              </p>
              {!searchTerm && selectedCategory === 'all' && (
                <Button onClick={() => setShowSetupWizard(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Group
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Bulk Actions */}
      <GroupBulkActions
        selectedGroups={selectedGroups}
        groups={groups}
        onAction={handleBulkAction}
        onClose={() => {
          setSelectedGroups([]);
          setShowBulkActions(false);
        }}
        isOpen={showBulkActions}
      />

      {/* Add Group Modal */}
      <AddGroupModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddGroup}
      />

      {/* Setup Wizard */}
      <GroupSetupWizard
        isOpen={showSetupWizard}
        onClose={() => setShowSetupWizard(false)}
        onComplete={handleWizardComplete}
      />
    </motion.div>
  );
};

export default GroupList;
