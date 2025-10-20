import React, { useState } from 'react';
import { FiUser, FiShield, FiBell, FiCreditCard, FiGlobe, FiInfo, FiLogOut } from 'react-icons/fi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+1 (555) 123-4567',
    language: 'en',
    timezone: 'UTC',
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your API call here
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: <FiUser className="mr-2" /> },
    { id: 'security', name: 'Security', icon: <FiShield className="mr-2" /> },
    { id: 'notifications', name: 'Notifications', icon: <FiBell className="mr-2" /> },
    { id: 'billing', name: 'Billing', icon: <FiCreditCard className="mr-2" /> },
    { id: 'preferences', name: 'Preferences', icon: <FiGlobe className="mr-2" /> },
    { id: 'about', name: 'About', icon: <FiInfo className="mr-2" /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Profile content */}
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            {/* Security content */}
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            {/* Notifications content */}
          </div>
        );
      case 'billing':
        return (
          <div className="space-y-6">
            {/* Billing content */}
          </div>
        );
      case 'preferences':
        return (
          <div className="space-y-6">
            {/* Preferences content */}
          </div>
        );
      case 'about':
        return (
          <div className="space-y-6">
            {/* About content */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Settings</h2>
            <p className="mt-1 text-sm text-gray-500">Manage your account settings and preferences</p>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'bg-blue-50 border-blue-500 text-blue-700 hover:bg-blue-50 hover:text-blue-700'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group border-l-4 px-3 py-2 flex items-center text-sm font-medium rounded-r-md w-full text-left`}
                  >
                    {tab.icon}
                    <span className="truncate">{tab.name}</span>
                  </button>
                ))}
                <button
                  className="mt-8 group border-l-4 border-transparent px-3 py-2 flex items-center text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-r-md w-full text-left"
                  onClick={() => {
                    // Handle sign out logic here
                  }}
                >
                  <FiLogOut className="mr-2" />
                  <span className="truncate">Sign Out</span>
                </button>
              </nav>
            </aside>
            
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;