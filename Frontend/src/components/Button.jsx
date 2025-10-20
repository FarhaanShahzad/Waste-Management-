// src/components/Button.jsx
import React from 'react';
import { FiLoader } from 'react-icons/fi';

const Button = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      className = '',
      startIcon: StartIcon,
      endIcon: EndIcon,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
    
    const variants = {
      primary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-green-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-green-500',
      link: 'text-green-600 hover:text-green-800 focus:ring-green-500',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || isLoading}
        className={`
          ${baseStyles}
          ${variants[variant] || variants.primary}
          ${sizes[size] || sizes.md}
          ${(disabled || isLoading) ? 'opacity-70 cursor-not-allowed' : ''}
          ${className}
        `}
        {...props}
      >
        {isLoading && (
          <FiLoader className="animate-spin mr-2 h-4 w-4" />
        )}
        {StartIcon && !isLoading && (
          <StartIcon className="mr-2 h-4 w-4" />
        )}
        {children}
        {EndIcon && !isLoading && (
          <EndIcon className="ml-2 h-4 w-4" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;