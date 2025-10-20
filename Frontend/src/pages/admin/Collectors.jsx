import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiPhone, FiMail, FiMapPin, FiFilter, FiDownload } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Collectors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [collectors, setCollectors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Mock data - replace with API call
  useEffect(() => {
    const mockCollectors = Array.from({ length: 12 }, (_, i) => ({
      id: `COL${1000 + i}`,
      name: `Collector ${i + 1}`,
      email: `collector${i + 1}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      address: `${i + 100} Waste Collection St, City, Country`,
      joinDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
      completedPickups: Math.floor(Math.random() * 200),
      rating: (Math.random() * 1 + 4).toFixed(1),
      status: ['Active', 'Inactive', 'On Leave'][Math.floor(Math.random() * 3)],
      vehicleType: ['Truck', 'Van', 'Bike'][Math.floor(Math.random() * 3)],
      lastActive: new Date(Date.now() - Math.floor(Math.random() * 100000000)).toISOString()
    }));
    
    setCollectors(mockCollectors);
    setIsLoading(false);
  }, []);

  const filteredCollectors = collectors.filter(collector => {
    const matchesSearch = 
      collector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collector.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collector.phone.includes(searchTerm) ||
      collector.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || collector.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusBadge = (status) => {
    const statusClasses = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'On Leave': 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Waste Collectors</h1>
            <p className="text-gray-600">Manage your waste collection team</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link 
              to="/collectors/add"
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              <FiPlus className="mr-2" />
              Add New Collector
            </Link>
            <div className="flex border rounded-lg overflow-hidden">
              <button 
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-white'}`}
                title="Grid View"
              >
                ☰
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-white'}`}
                title="List View"
              >
                ≡
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-96">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search collectors..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <select
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
              <button className="flex items-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
                <FiFilter className="mr-2" />
                More Filters
              </button>
              <button className="flex items-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
                <FiDownload className="mr-2" />
                Export
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCollectors.map((collector) => (
                <div key={collector.id} className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                    <div className="flex items-center">
                      <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                        {collector.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">{collector.name}</h3>
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1 text-gray-700">{collector.rating}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          {statusBadge(collector.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <FiMail className="mr-3 text-blue-500" />
                        <span>{collector.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FiPhone className="mr-3 text-green-500" />
                        <span>{collector.phone}</span>
                      </div>
                      <div className="flex items-start text-gray-600">
                        <FiMapPin className="mr-3 mt-1 text-red-500 flex-shrink-0" />
                        <span className="truncate">{collector.address}</span>
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Completed Pickups</span>
                          <span className="font-medium text-gray-900">{collector.completedPickups}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>Vehicle Type</span>
                          <span className="font-medium text-gray-900">{collector.vehicleType}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Member since {new Date(collector.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </span>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
                          Message
                        </button>
                        <button className="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collector</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCollectors.map((collector) => (
                    <tr key={collector.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                            {collector.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{collector.name}</div>
                            <div className="text-sm text-gray-500">{collector.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{collector.email}</div>
                        <div className="text-sm text-gray-500">{collector.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{collector.vehicleType}</div>
                        <div className="text-xs text-gray-500">{collector.completedPickups} pickups</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{collector.completedPickups}</div>
                        <div className="text-xs text-gray-500">
                          Last: {new Date(collector.lastActive).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {statusBadge(collector.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {filteredCollectors.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">
                <FiSearch className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No collectors found</h3>
              <p className="mt-1 text-gray-500">
                {searchTerm || statusFilter !== 'All' 
                  ? 'Try adjusting your search or filter to find what you\'re looking for.'
                  : 'No collectors have been added yet.'}
              </p>
              {!searchTerm && statusFilter === 'All' && (
                <div className="mt-6">
                  <Link
                    to="/collectors/add"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                    Add New Collector
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {filteredCollectors.length > 0 && (
            <div className="mt-6 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Previous
                </button>
                <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                    <span className="font-medium">{filteredCollectors.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button aria-current="page" className="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">1</button>
                    <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</button>
                    <button className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</button>
                    <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collectors;
