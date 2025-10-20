// src/components/InputField.jsx
import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const InputField = React.forwardRef(
  (
    {
      label,
      name,
      type = 'text',
      placeholder = '',
      error = '',
      icon: Icon,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative rounded-md shadow-sm">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <input
            ref={ref}
            type={type}
            name={name}
            id={name}
            className={`block w-full rounded-md border ${
              error
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
            } ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2`}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p
            className="mt-1 text-sm text-red-600 flex items-center"
            id={`${name}-error`}
          >
            <FiAlertCircle className="mr-1 h-4 w-4" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;