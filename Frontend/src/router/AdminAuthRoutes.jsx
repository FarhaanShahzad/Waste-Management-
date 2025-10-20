import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminSignup from '../pages/admin/AdminSignup';

const AdminAuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="signup" element={<AdminSignup />} />
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
};

export default AdminAuthRoutes;