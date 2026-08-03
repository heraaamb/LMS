import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Strict portal enforcement: Students can NEVER access teacher/admin routes
  if (allowedRole && role !== allowedRole) {
    if (role === 'student' && allowedRole === 'admin') {
      return <Navigate to="/student/dashboard" replace />;
    }
    if (role === 'admin' && allowedRole === 'student') {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return children;
};
