import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with base URL and default headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  // Admin login
  login: async (email, password) => {
    try {
      const response = await api.post('/admin/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed. Please try again.' };
    }
  },

  // Admin signup (for super admin only)
  signup: async (adminData) => {
    try {
      const response = await api.post('/admin/register', adminData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed. Please try again.' };
    }
  },

  // Get current admin profile
  getProfile: async () => {
    try {
      const response = await api.get('/admin/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile.' };
    }
  },
};

// Waste pickup requests services
export const requestService = {
  // Get all pickup requests with filters and pagination
  getAllRequests: async (filters = {}, page = 1, limit = 10) => {
    try {
      const params = { ...filters, page, limit };
      const response = await api.get('/admin/requests', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch requests.' };
    }
  },

  // Get single request by ID
  getRequestById: async (id) => {
    try {
      const response = await api.get(`/admin/requests/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch request details.' };
    }
  },

  // Update request status
  updateRequestStatus: async (id, status, notes = '') => {
    try {
      const response = await api.patch(`/admin/requests/${id}/status`, { status, notes });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update request status.' };
    }
  },

  // Assign request to collector
  assignCollector: async (requestId, collectorId) => {
    try {
      const response = await api.post(`/admin/requests/${requestId}/assign`, { collectorId });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to assign collector.' };
    }
  },
};

// Statistics services
export const statsService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await api.get('/admin/stats/dashboard');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch dashboard statistics.' };
    }
  },

  // Get request statistics (for charts)
  getRequestStats: async (period = 'week') => {
    try {
      const response = await api.get('/admin/stats/requests', { params: { period } });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch request statistics.' };
    }
  },
};

// Collector management services
export const collectorService = {
  // Get all collectors
  getAllCollectors: async () => {
    try {
      const response = await api.get('/admin/collectors');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch collectors.' };
    }
  },

  // Create new collector
  createCollector: async (collectorData) => {
    try {
      const response = await api.post('/admin/collectors', collectorData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create collector.' };
    }
  },

  // Update collector
  updateCollector: async (id, collectorData) => {
    try {
      const response = await api.put(`/admin/collectors/${id}`, collectorData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update collector.' };
    }
  },
};

export default {
  auth: authService,
  requests: requestService,
  stats: statsService,
  collectors: collectorService,
  // Export axios instance for custom requests
  api,
};