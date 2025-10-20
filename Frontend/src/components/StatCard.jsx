// src/components/StatCard.jsx
import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const StatCard = ({ title, value, trend, trendType = 'up', icon }) => {
  const isPositive = trendType === 'up';
  const trendIcon = isPositive ? (
    <FiArrowUp className="h-4 w-4" />
  ) : (
    <FiArrowDown className="h-4 w-4" />
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {trend && (
              <div
                className={`ml-2 flex items-center text-sm font-medium ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trendIcon}
                <span className="ml-1">{trend}</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;