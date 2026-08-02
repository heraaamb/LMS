import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_STUDENT, MOCK_ADMIN } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    return localStorage.getItem('lms_role') || 'student';
  });

  const [user, setUser] = useState(() => {
    return role === 'admin' ? MOCK_ADMIN : MOCK_STUDENT;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    localStorage.setItem('lms_role', role);
    setUser(role === 'admin' ? MOCK_ADMIN : MOCK_STUDENT);
  }, [role]);

  const login = (selectedRole, credentials) => {
    setRole(selectedRole);
    setIsAuthenticated(true);
    setUser(selectedRole === 'admin' ? MOCK_ADMIN : MOCK_STUDENT);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const switchRole = (newRole) => {
    setRole(newRole);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
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
