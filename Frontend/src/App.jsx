// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/admin/AdminLogin';
import AdminSignup from './pages/admin/AdminSignup';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import Customers from './pages/admin/Customers';
import Collectors from './pages/admin/Collectors';
import RequestDetails from './pages/admin/RequestDetails';
import MapView from './pages/admin/MapView';

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');

  return (
    <Routes>
      {/* Redirect root to signup if not authenticated, otherwise to dashboard */}
      <Route 
        path="/" 
        element={
          isAuthenticated 
            ? <Navigate to="/admin/dashboard" replace /> 
            : <Navigate to="/signup" replace />
        } 
      />
      
      {/* Public routes */}
      <Route 
        path="/signup" 
        element={
          isAuthenticated 
            ? <Navigate to="/admin/dashboard" replace /> 
            : <AdminSignup />
        } 
      />
      
      <Route 
        path="/login" 
        element={
          isAuthenticated 
            ? <Navigate to="/admin/dashboard" replace /> 
            : <AdminLogin />
        } 
      />
      
      {/* Protected admin routes */}
      <Route 
        path="/admin" 
        element={isAuthenticated ? <AdminLayout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="collectors" element={<Collectors />} />
        <Route path="requests" element={<RequestDetails />} />
        <Route 
          path="map" 
          element={
            <div style={{ height: 'calc(100vh - 64px)' }}>
              <MapView />
            </div>
          } 
        />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
      
      {/* Catch-all route */}
      <Route 
        path="*" 
        element={
          isAuthenticated 
            ? <Navigate to="/admin/dashboard" replace /> 
            : <Navigate to="/signup" replace />
        } 
      />
    </Routes>
  );
}

export default App;