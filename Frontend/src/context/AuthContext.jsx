// src/context/AuthContext.jsx
import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('wasteUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = { 
          id: '1', 
          email,
          name: email.split('@')[0] || 'User',
          role: 'admin'
        };
        setUser(user);
        localStorage.setItem('wasteUser', JSON.stringify(user));
        resolve({ success: true });
      }, 500);
    });
  };

  const signup = async (email, password) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = { 
          id: '1', 
          email,
          name: email.split('@')[0] || 'User',
          role: 'admin'
        };
        setUser(user);
        localStorage.setItem('wasteUser', JSON.stringify(user));
        resolve({ success: true });
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wasteUser');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};