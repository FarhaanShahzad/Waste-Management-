import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin' // Default role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    // In a real app, you would make an API call to register the user
    // For now, just redirect to login
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900">Create Account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>

            {/* Account Type Selection */}
            <div className="pt-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => handleRoleChange('admin')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.role === 'admin' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      formData.role === 'admin' 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-400'
                    }`}>
                      {formData.role === 'admin' && (
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M3.707 9.293a1 1 0 0 1-1.414 0l-1-1a1 1 0 1 1 1.414-1.414l.293.293 3-3a1 1 0 0 1 1.414 1.414l-4 4z"/>
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Admin</h4>
                      <p className="text-xs text-gray-500">Full access to all features</p>
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => handleRoleChange('citizen')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.role === 'citizen' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      formData.role === 'citizen' 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-400'
                    }`}>
                      {formData.role === 'citizen' && (
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M3.707 9.293a1 1 0 0 1-1.414 0l-1-1a1 1 0 1 1 1.414-1.414l.293.293 3-3a1 1 0 0 1 1.414 1.414l-4 4z"/>
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Citizen</h4>
                      <p className="text-xs text-gray-500">Basic access</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create {formData.role === 'admin' ? 'Admin' : 'Citizen'} Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;