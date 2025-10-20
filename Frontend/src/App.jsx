// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Auth Components
import AdminLogin from './pages/admin/AdminLogin';
import AdminSignup from './pages/admin/AdminSignup';

// Layouts
import AdminLayout from './components/layout/AdminLayout';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import Customers from './pages/admin/Customers';
import Collectors from './pages/admin/Collectors';
import RequestDetails from './pages/admin/RequestDetails';

function App() {
  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Auth routes */}
      <Route path="/login" element={
        <PublicRoute>
          <AdminLogin />
        </PublicRoute>
      } />
      
      <Route path="/signup" element={
        <PublicRoute>
          <AdminSignup />
        </PublicRoute>
      } />
      
      {/* Protected admin routes */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="customers" element={<Customers />} />
                <Route path="collectors" element={<Collectors />} />
                <Route path="requests" element={<RequestDetails/>} />
                <Route path="settings" element={<div>Settings Page</div>} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

// Component to protect routes that require authentication
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    // Redirect to login, but save the current location to return to after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Component for public routes (login/signup) that shouldn't be accessible when logged in
function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (user) {
    // If user is already logged in, redirect to dashboard
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}

export default App;