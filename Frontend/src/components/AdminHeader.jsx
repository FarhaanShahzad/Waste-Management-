// src/components/AdminHeader.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiLogOut, FiMenu, FiX, FiBell, FiUser } from 'react-icons/fi';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard' },
  { name: 'Requests', href: '/admin/requests' },
  { name: 'Map View', href: '/admin/map' },
  { name: 'Reports', href: '/admin/reports' },
];

const AdminHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Handle logout logic
    navigate('/admin/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-4 flex items-center justify-between border-b border-gray-200 lg:border-none">
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-green-600">WasteWise</span>
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-base font-medium ${
                    location.pathname === item.href
                      ? 'text-green-600'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4 flex items-center">
            <button
              type="button"
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span className="sr-only">View notifications</span>
              <FiBell className="h-6 w-6" aria-hidden="true" />
            </button>
            
            <div className="relative ml-3">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <FiUser className="h-5 w-5 text-gray-500" />
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FiLogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
          <div className="lg:hidden ml-4">
            <button
              type="button"
              className="bg-white p-2 rounded-md text-gray-400 hover:text-gray-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        <div
          className={`${
            mobileMenuOpen ? 'block' : 'hidden'
          } py-2 px-2 space-y-1 lg:hidden`}
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === item.href
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;