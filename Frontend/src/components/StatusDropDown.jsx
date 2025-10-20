// src/components/StatusDropdown.jsx
import React, { useState } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

const statusOptions = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'in-progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
];

const StatusDropdown = ({ value, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedStatus = statusOptions.find(option => option.value === value) || statusOptions[0];

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <div>
        <button
          type="button"
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${selectedStatus.color} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedStatus.label}
          <FiChevronDown className="ml-1.5 h-4 w-4" />
        </button>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                    value === option.value
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {value === option.value && (
                    <FiCheck className="mr-2 h-4 w-4" />
                  )}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StatusDropdown;