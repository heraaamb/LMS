import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRole && role !== allowedRole) {
    // If student tries to access admin route, redirect to student dashboard
    if (role === 'student' && allowedRole === 'admin') {
      return <Navigate to="/student/dashboard" replace />;
    }
    // If admin tries to access student route, redirect to admin dashboard
    if (role === 'admin' && allowedRole === 'student') {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return children;
};
