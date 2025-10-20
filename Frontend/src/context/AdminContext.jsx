// src/context/AdminContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'today',
    search: '',
  });

  // Mock data - replace with actual API calls
  const fetchRequests = async (params = {}) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data
      const mockRequests = Array.from({ length: 10 }, (_, i) => ({
        id: `REQ-${1000 + i}`,
        type: ['Household', 'Commercial', 'Industrial', 'Hazardous'][i % 4],
        status: ['pending', 'in-progress', 'completed', 'cancelled'][i % 4],
        priority: ['low', 'medium', 'high'][i % 3],
        location: `${i + 100} Main St, City ${String.fromCharCode(65 + (i % 4))}`,
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      }));

      setRequests(mockRequests);
      return mockRequests;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch requests');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock stats
      const mockStats = {
        totalRequests: 128,
        pendingRequests: 24,
        inProgressRequests: 18,
        completedRequests: 86,
        requestTrend: 12,
        pendingTrend: 5,
        inProgressTrend: -8,
        completedTrend: 15,
      };

      setStats(mockStats);
      return mockStats;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch statistics');
      throw err;
    }
  };

  const updateRequestStatus = async (requestId, status, notes = '') => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRequests(prevRequests => 
        prevRequests.map(req => 
          req.id === requestId 
            ? { ...req, status, updatedAt: new Date().toISOString() }
            : req
        )
      );

      toast.success('Status updated successfully');
      return true;
    } catch (err) {
      toast.error('Failed to update status');
      throw err;
    }
  };

  const assignCollector = async (requestId, collectorId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRequests(prevRequests => 
        prevRequests.map(req => 
          req.id === requestId 
            ? { ...req, assignedTo: collectorId, updatedAt: new Date().toISOString() }
            : req
        )
      );

      toast.success('Collector assigned successfully');
      return true;
    } catch (err) {
      toast.error('Failed to assign collector');
      throw err;
    }
  };

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchRequests(), fetchStats()]);
      } catch (err) {
        console.error('Error loading initial data:', err);
      }
    };

    loadData();
  }, []);

  // Filter requests based on current filters
  const filteredRequests = React.useMemo(() => {
    return requests.filter(request => {
      const matchesStatus = filters.status === 'all' || request.status === filters.status;
      const matchesSearch = request.id.toLowerCase().includes(filters.search.toLowerCase()) || 
                          request.location.toLowerCase().includes(filters.search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [requests, filters]);

  const value = {
    requests: filteredRequests,
    stats,
    loading,
    error,
    filters,
    setFilters,
    fetchRequests,
    fetchStats,
    updateRequestStatus,
    assignCollector,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;