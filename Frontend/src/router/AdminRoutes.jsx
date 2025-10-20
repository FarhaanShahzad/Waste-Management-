import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NotificationProvider } from '../context/NotificationContext';
import AdminLayout from '../components/layout/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Customers from '../pages/admin/Customers';
import Collectors from '../pages/admin/Collectors';
import Settings from '../pages/admin/Settings';
import RequestDetails from '../pages/admin/RequestDetails';
import MapView from '../pages/admin/MapView';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminSignup from '../pages/admin/AdminSignup';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/admin/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return !currentUser ? children : <Navigate to="/admin/dashboard" replace />;
};

const AdminRoutes = () => {
  return (
    <NotificationProvider>
      <Routes>
        {/* Public Routes */}
        <Route
          path="login"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route
          path="signup"
          element={
            <PublicRoute>
              <AdminSignup />
            </PublicRoute>
          }
        />
        
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Outlet />
              </AdminLayout>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="collectors" element={<Collectors />} />
          <Route path="settings" element={<Settings />} />
          <Route path="requests/:id" element={<RequestDetails />} />
          <Route path="map" element={<MapView />} />
        </Route>
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </NotificationProvider>
  );
};

export default AdminRoutes;