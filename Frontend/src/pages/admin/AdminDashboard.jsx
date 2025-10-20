// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  FiHome,
  FiUsers,
  FiTruck,
  FiMapPin,
  FiSettings,
  FiLogOut,
  FiBell,
  FiSearch,
  FiPlus,
  FiFilter,
  FiDownload,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiUser
} from 'react-icons/fi';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Chart Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-red-600">Chart could not be displayed.</div>;
    }
    return this.props.children;
  }
}

// Mock data
const generateMockData = () => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: `REQ${1000 + i}`,
    customer: `Customer ${i + 1}`,
    type: ['Household', 'Commercial', 'Hazardous', 'Recycling'][Math.floor(Math.random() * 4)],
    status: ['Pending', 'In Progress', 'Completed', 'Cancelled'][Math.floor(Math.random() * 4)],
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: (Math.random() * 1000).toFixed(2)
  }));
};

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New waste collection request received', time: '2 min ago', read: false },
    { id: 2, message: 'Payment received from Customer #1234', time: '1 hour ago', read: false },
    { id: 3, message: 'Maintenance scheduled for tomorrow', time: '3 hours ago', read: true }
  ]);
  const [wasteRequests] = useState(generateMockData());

  // Memoize filtered data to prevent unnecessary recalculations
  const { filteredRequests, totalPages, currentItems } = useMemo(() => {
    const filtered = wasteRequests.filter(req => 
      (req.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
       req.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'All' || req.status === statusFilter) &&
      (!dateRange.start || req.date >= dateRange.start) &&
      (!dateRange.end || req.date <= dateRange.end)
    );

    const total = Math.ceil(filtered.length / 10);
    const items = filtered.slice(
      (currentPage - 1) * 10,
      currentPage * 10
    );

    return { filteredRequests: filtered, totalPages: total, currentItems: items };
  }, [wasteRequests, searchTerm, statusFilter, dateRange, currentPage]);

  // Chart data
  const chartData = useMemo(() => {
    const statusCounts = {
      'Pending': 0,
      'In Progress': 0,
      'Completed': 0,
      'Cancelled': 0
    };

    wasteRequests.forEach(req => {
      statusCounts[req.status]++;
    });

    return {
      statusData: {
        labels: Object.keys(statusCounts),
        datasets: [{
          data: Object.values(statusCounts),
          backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0', '#FFCE56']
        }]
      },
      monthlyData: {
        labels: Array.from({ length: 12 }, (_, i) => 
          new Date(0, i).toLocaleString('default', { month: 'short' })
        ),
        datasets: [{
          label: 'Requests',
          data: Array(12).fill(0).map(() => Math.floor(Math.random() * 100)),
          borderColor: '#4BC0C0',
          fill: false
        }]
      }
    };
  }, [wasteRequests]);

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  // Cleanup chart instances on unmount
  useEffect(() => {
    return () => {
      if (ChartJS.instances) {
        Object.values(ChartJS.instances).forEach(instance => {
          if (instance && typeof instance.destroy === 'function') {
            instance.destroy();
          }
        });
      }
    };
  }, []);

  const renderPagination = () => {
    const pages = [];
    const maxPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 border rounded-lg ${
            currentPage === i
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-lg ${
            currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'
          }`}
        >
          <FiChevronLeft />
        </button>
        {startPage > 1 && <span className="px-4 py-2">...</span>}
        {pages}
        {endPage < totalPages && <span className="px-4 py-2">...</span>}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded-lg ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'hover:bg-gray-100'
          }`}
        >
          <FiChevronRight />
        </button>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">WasteWise</h1>
          <p className="text-sm text-gray-500">Admin Panel</p>
        </div>
        <nav className="p-4">
          {[
            { icon: <FiHome />, label: 'Dashboard', path: '/admin/dashboard' },
            { icon: <FiUsers />, label: 'Customers', path: '/admin/customers' },
            { icon: <FiTruck />, label: 'Collectors', path: '/admin/collectors' },
            { icon: <FiMapPin />, label: 'Map View', path: '/admin/map' },
            { icon: <FiSettings />, label: 'Settings', path: '/admin/settings' }
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center p-3 mb-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <button className="flex items-center w-full p-3 mt-4 text-red-600 rounded-lg hover:bg-red-50">
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <header className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard Overview</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                  <FiBell size={20} />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
                <div className="absolute right-0 w-64 mt-2 bg-white rounded-lg shadow-lg">
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      className={`p-3 border-b ${!notif.read ? 'bg-blue-50' : ''}`}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <p className="text-sm">{notif.message}</p>
                      <p className="text-xs text-gray-500">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                  <FiUser />
                </div>
                <span className="ml-2 text-sm font-medium">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Total Requests', value: wasteRequests.length, change: '+12%', trend: 'up' },
            { title: 'Completed', value: wasteRequests.filter(r => r.status === 'Completed').length, change: '+5%', trend: 'up' },
            { title: 'In Progress', value: wasteRequests.filter(r => r.status === 'In Progress').length, change: '+8%', trend: 'up' },
            { title: 'Pending', value: wasteRequests.filter(r => r.status === 'Pending').length, change: '-3%', trend: 'down' }
          ].map((stat, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last month
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="mb-4 text-lg font-medium">Monthly Requests</h3>
            <div className="h-64">
              <ErrorBoundary>
                <Line 
                  data={chartData.monthlyData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                      duration: 0
                    }
                  }}
                />
              </ErrorBoundary>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="mb-4 text-lg font-medium">Request Status</h3>
            <div className="h-64">
              <ErrorBoundary>
                <Pie 
                  data={chartData.statusData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                      duration: 0
                    }
                  }}
                />
              </ErrorBoundary>
            </div>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="p-6">
          <div className="flex flex-col p-6 bg-white rounded-lg shadow">
            <div className="flex flex-col justify-between mb-6 space-y-4 md:flex-row md:items-center md:space-y-0">
              <h3 className="text-lg font-medium">Recent Requests</h3>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search requests..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <select
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={dateRange.start}
                    onChange={(e) => {
                      setDateRange(prev => ({ ...prev, start: e.target.value }));
                      setCurrentPage(1);
                    }}
                    placeholder="Start Date"
                  />
                  <input
                    type="date"
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={dateRange.end}
                    onChange={(e) => {
                      setDateRange(prev => ({ ...prev, end: e.target.value }));
                      setCurrentPage(1);
                    }}
                    placeholder="End Date"
                  />
                </div>
                <button className="flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  <FiFilter className="mr-2" />
                  Apply
                </button>
                <button className="flex items-center justify-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FiDownload className="mr-2" />
                  Export
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Request ID</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{request.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{request.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          request.type === 'Hazardous' ? 'bg-red-100 text-red-800' :
                          request.type === 'Commercial' ? 'bg-blue-100 text-blue-800' :
                          request.type === 'Recycling' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {request.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{request.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          request.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          request.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">${request.amount}</td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                        <button className="ml-4 text-gray-600 hover:text-gray-900">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center justify-between mt-6 space-y-4 sm:flex-row sm:space-y-0">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * 10, filteredRequests.length)}
                </span>{' '}
                of <span className="font-medium">{filteredRequests.length}</span> results
              </div>
              {renderPagination()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;