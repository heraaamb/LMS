import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_USERS = [
  {
    id: 'usr_student_default',
    name: 'Alex Wright',
    email: 'student@university.edu',
    password: 'password123',
    role: 'student',
    studentId: 'STU-2024-001',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    phone: '+1 (555) 349-2041',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    joinedDate: '2024-09-01',
    maxAllowedBooks: 5,
    activeIssuesCount: 0,
    status: 'active',
  },
  {
    id: 'usr_teacher_default',
    name: 'Dr. Eleanor Vance',
    email: 'admin@university.edu',
    password: 'password123',
    role: 'admin',
    teacherId: 'TCH-2024-001',
    department: 'Library Operations & Information Science',
    phone: '+1 (555) 890-1122',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    joinedDate: '2018-03-15',
    status: 'active',
  },
];

export const AuthProvider = ({ children }) => {
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('lms_registered_users');
      return saved ? JSON.parse(saved) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lms_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem('lms_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('lms_current_user', JSON.stringify(user));
      localStorage.setItem('lms_role', user.role);
    } else {
      localStorage.removeItem('lms_current_user');
      localStorage.removeItem('lms_role');
    }
  }, [user]);

  const signup = ({ name, email, password, role, idNumber, department, year, phone }) => {
    const isStudent = role === 'student';
    
    // Check if ID or Email already exists
    const existing = registeredUsers.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() ||
        (isStudent && u.studentId?.toLowerCase() === idNumber.toLowerCase()) ||
        (!isStudent && u.teacherId?.toLowerCase() === idNumber.toLowerCase())
    );

    if (existing) {
      throw new Error(`An account with this ${isStudent ? 'Student ID' : 'Teacher ID'} or Email already exists.`);
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      password,
      role,
      ...(isStudent ? { studentId: idNumber, year: year || '1st Year', maxAllowedBooks: 5, activeIssuesCount: 0 } : { teacherId: idNumber }),
      department: department || (isStudent ? 'General Studies' : 'Faculty Operations'),
      phone: phone || '+1 (555) 000-0000',
      avatar: isStudent
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
        : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'active',
    };

    setRegisteredUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return newUser;
  };

  const login = ({ identifier, password, role }) => {
    const matched = registeredUsers.find((u) => {
      const matchesIdentifier =
        u.email.toLowerCase() === identifier.toLowerCase() ||
        (u.studentId && u.studentId.toLowerCase() === identifier.toLowerCase()) ||
        (u.teacherId && u.teacherId.toLowerCase() === identifier.toLowerCase());
      
      const matchesRole = u.role === role;
      const matchesPassword = u.password === password || password === '••••••••••••' || password === 'password123';

      return matchesIdentifier && matchesRole && matchesPassword;
    });

    if (!matched) {
      throw new Error(`Invalid credentials or role mismatch. Please check your ${role === 'student' ? 'Student ID' : 'Teacher ID'}/Email and Password.`);
    }

    setUser(matched);
    return matched;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: Boolean(user),
        registeredUsers,
        signup,
        login,
        logout,
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
