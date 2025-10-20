// src/components/TeamAssignment.jsx
import React, { useState } from 'react';
import { FiUser, FiChevronDown, FiCheck, FiUsers } from 'react-icons/fi';

const TeamAssignment = ({ value, onChange, className = '', collectors = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Mock data - replace with actual API call
  const teamMembers = [
    { id: '1', name: 'John Doe', role: 'Collector' },
    { id: '2', name: 'Jane Smith', role: 'Driver' },
    { id: '3', name: 'Mike Johnson', role: 'Collector' },
    { id: '4', name: 'Sarah Williams', role: 'Driver' },
  ];

  const selectedMember = teamMembers.find(member => member.id === value);

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <div>
        <button
          type="button"
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiUsers className="mr-2 h-4 w-4 text-gray-400" />
          {selectedMember ? selectedMember.name : 'Assign Team Member'}
          <FiChevronDown className="ml-2 h-4 w-4" />
        </button>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1">
              <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team Members
              </div>
              {teamMembers.map((member) => (
                <button
                  key={member.id}
                  onClick={() => {
                    onChange(member.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                    value === member.id
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {value === member.id ? (
                    <FiCheck className="mr-2 h-4 w-4 text-green-500" />
                  ) : (
                    <FiUser className="mr-2 h-4 w-4 text-gray-400" />
                  )}
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-xs text-gray-500">{member.role}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamAssignment;