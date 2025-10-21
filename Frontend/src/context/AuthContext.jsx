// src/context/AuthContext.jsx
import React from 'react'
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check auth status on mount and when location changes
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedUser = localStorage.getItem('wasteUser');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Here you would typically validate the token with your backend
          setUser(parsedUser);
          
          // Redirect to dashboard if on login/signup page
          if (['/login', '/signup'].includes(location.pathname)) {
            navigate('/dashboard');
          }
        }
      } catch (err) {
        console.error('Error parsing user data:', err);
        localStorage.removeItem('wasteUser');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [navigate, location]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Input validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Simulate API call
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email && password) {
            resolve({ 
              id: Date.now().toString(),
              email,
              name: email.split('@')[0] || 'User',
              role: 'user', // Default role
              token: `dummy-jwt-token-${Date.now()}`
            });
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 500);
      });

      setUser(response);
      localStorage.setItem('wasteUser', JSON.stringify(response));
      navigate('/dashboard');
      return { success: true };
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const signup = useCallback(async (email, password, userData = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: Date.now().toString(),
            email,
            name: userData.name || email.split('@')[0] || 'User',
            role: 'user',
            ...userData,
            token: `dummy-jwt-token-${Date.now()}`
          });
        }, 500);
      });

      setUser(response);
      localStorage.setItem('wasteUser', JSON.stringify(response));
      navigate('/dashboard');
      return { success: true, user: response };
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('wasteUser');
    navigate('/login');
  }, [navigate]);

  // Check if user has specific role
  const hasRole = useCallback((role) => {
    return user?.role === role;
  }, [user]);

  // Check if user is authenticated
  const isAuthenticated = useCallback(() => {
    return !!user;
  }, [user]);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        signup, 
        logout, 
        loading, 
        error,
        hasRole,
        isAuthenticated,
        setError
      }}
    >
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};