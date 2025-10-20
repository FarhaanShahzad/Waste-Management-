import React, { useState, useRef, useEffect } from 'react';
import { FiBell, FiCheck, FiTrash2, FiClock } from 'react-icons/fi';
import { useNotifications } from '../context/NotificationContext';

const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>;
      case 'warning':
        return <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>;
      case 'error':
        return <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>;
      default:
        return <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen && unreadCount > 0) {
            markAllAsRead();
          }
        }}
        className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative"
      >
        <FiBell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
              <div className="flex space-x-2">
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-800"
                  title="Mark all as read"
                >
                  <FiCheck className="h-4 w-4" />
                </button>
                <button
                  onClick={clearAll}
                  className="text-xs text-red-600 hover:text-red-800"
                  title="Clear all"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <li 
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="ml-3 w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {notification.message}
                        </p>
                        <div className="mt-1 flex items-center text-xs text-gray-400">
                          <FiClock className="mr-1 h-3 w-3" />
                          <span>{formatTimeAgo(notification.date)}</span>
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="ml-4 flex-shrink-0">
                          <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                No notifications
              </div>
            )}
          </div>
          
          <div className="px-4 py-3 bg-gray-50 text-right border-t border-gray-200">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View all notifications
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
