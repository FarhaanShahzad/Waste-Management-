// src/components/layout/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      {/* Add your header/sidebar here */}
      <nav>Admin Navigation</nav>
      <main>
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default AdminLayout;