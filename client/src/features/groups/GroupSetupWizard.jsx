import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Users, 
  Settings, 
  Palette,
  Mail,
  Plus,
  X
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import GroupTemplates from './GroupTemplates';

const GroupSetupWizard = ({ isOpen, onClose, onComplete, selectedTemplate = null }) => {
  const [currentStep, setCurrentStep] = useState(selectedTemplate ? 1 : 0);
  const [formData, setFormData] = useState({
    template: selectedTemplate,
    name: selectedTemplate?.name || '',
    description: selectedTemplate?.description || '',
    category: selectedTemplate?.category || 'personal',
    color: selectedTemplate?.color || '#3B82F6',
    icon: selectedTemplate?.icon || '👥',
    members: [{ id: 'user1', name: 'You', email: 'you@example.com', isCurrentUser: true }],
    settings: {
      splitMethod: selectedTemplate?.settings?.splitMethod || 'equal',
      currency: selectedTemplate?.settings?.currency || 'USD',
      allowDecimals: selectedTemplate?.settings?.allowDecimals || true,
      recurringExpenses: selectedTemplate?.settings?.recurringExpenses || false
    }
  });
  const [newMemberEmail, setNewMemberEmail] = useState('');

  const steps = [
    { id: 0, title: 'Choose Template', icon: Palette },
    { id: 1, title: 'Group Details', icon: Settings },
    { id: 2, title: 'Add Members', icon: Users },
    { id: 3, title: 'Review & Create', icon: Check }
  ];

  const colorOptions = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
    '#8B5CF6', '#06B6D4', '#84CC16', '#F97316',
    '#EC4899', '#6B7280'
  ];

  const iconOptions = ['👥', '🏖️', '🏠', '🍽️', '✈️', '🎉', '💼', '🏋️', '🎬', '🛒', '🚗', '📚'];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTemplateSelect = (template) => {
    if (template) {
      setFormData(prev => ({
        ...prev,
        template,
        name: template.name,
        description: template.description,
        category: template.category,
        color: template.color,
        settings: { ...prev.settings, ...template.settings }
      }));
    }
    setCurrentStep(1);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSettingChange = (setting, value) => {
    setFormData(prev => ({
      ...prev,
      settings: { ...prev.settings, [setting]: value }
    }));
  };

  const addMember = () => {
    if (newMemberEmail.trim()) {
      const newMember = {
        id: `user${Date.now()}`,
        name: newMemberEmail.split('@')[0],
        email: newMemberEmail.trim(),
        isCurrentUser: false
      };
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, newMember]
      }));
      setNewMemberEmail('');
    }
  };

  const removeMember = (memberId) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter(member => member.id !== memberId)
    }));
  };

  const handleComplete = () => {
    const newGroup = {
      ...formData,
      id: Date.now().toString(),
      balance: 0,
      totalExpenses: 0,
      createdAt: new Date(),
      isActive: true,
      expenses: []
    };
    onComplete(newGroup);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return true;
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return formData.members.length >= 2;
      case 3:
        return true;
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />
        
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create New Group
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center mt-4 space-x-4">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = currentStep === index;
                const isCompleted = currentStep > index;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isActive 
                          ? 'bg-primary-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <StepIcon className="h-4 w-4" />
                      )}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      isActive 
                        ? 'text-primary-600 dark:text-primary-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className="w-8 h-px bg-gray-300 dark:bg-gray-600 ml-4" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="template"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <GroupTemplates onSelectTemplate={handleTemplateSelect} />
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Group Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Group Name *
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Enter group name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description
                          </label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Describe your group"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Icon
                          </label>
                          <div className="grid grid-cols-6 gap-2">
                            {iconOptions.map((icon) => (
                              <button
                                key={icon}
                                onClick={() => handleInputChange('icon', icon)}
                                className={`p-2 text-xl rounded-lg border-2 transition-colors ${
                                  formData.icon === icon
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                }`}
                              >
                                {icon}
                              </button>
                            ))}
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
                                onClick={() => handleInputChange('color', color)}
                                className={`w-8 h-8 rounded-full border-2 ${
                                  formData.color === color
                                    ? 'border-gray-400 dark:border-gray-300'
                                    : 'border-gray-200 dark:border-gray-600'
                                }`}
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="members"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Add Members
                    </h3>

                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        <input
                          type="email"
                          value={newMemberEmail}
                          onChange={(e) => setNewMemberEmail(e.target.value)}
                          placeholder="Enter email address"
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          onKeyPress={(e) => e.key === 'Enter' && addMember()}
                        />
                        <Button onClick={addMember} disabled={!newMemberEmail.trim()}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {formData.members.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium">
                                {member.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {member.name} {member.isCurrentUser && '(You)'}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {member.email}
                                </p>
                              </div>
                            </div>
                            {!member.isCurrentUser && (
                              <button
                                onClick={() => removeMember(member.id)}
                                className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Review & Create
                    </h3>

                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center space-x-4 mb-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl"
                            style={{ backgroundColor: formData.color }}
                          >
                            {formData.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {formData.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formData.description}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Members:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">
                              {formData.members.length}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Split Method:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">
                              {formData.settings.splitMethod === 'equal' ? 'Equal Split' : 'Custom Split'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-between">
            <Button
              variant="outline"
              onClick={currentStep === 0 ? onClose : handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentStep === 0 ? 'Cancel' : 'Previous'}
            </Button>

            <Button
              onClick={currentStep === steps.length - 1 ? handleComplete : handleNext}
              disabled={!canProceed()}
            >
              {currentStep === steps.length - 1 ? 'Create Group' : 'Next'}
              {currentStep < steps.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupSetupWizard;
