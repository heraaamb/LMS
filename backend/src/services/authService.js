import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';

export const authService = {
  register: async (userData) => {
    const hashedPassword = await hashPassword(userData.password);
    const userId = `usr_${Date.now()}`;

    const newUser = {
      id: userId,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      studentId: userData.role === 'student' ? userData.idNumber : null,
      teacherId: userData.role === 'admin' ? userData.idNumber : null,
      department: userData.department,
      status: 'active',
    };

    const token = generateToken({ id: newUser.id, role: newUser.role, email: newUser.email });

    return { user: newUser, token };
  },

  login: async ({ identifier, password, role }) => {
    // Simulated credential verification (ready for DB query execution)
    const token = generateToken({ id: 'usr_demo', role, email: identifier });
    
    return {
      user: {
        id: 'usr_demo',
        name: role === 'admin' ? 'Librarian Admin' : 'Student User',
        email: identifier.includes('@') ? identifier : `${identifier.toLowerCase()}@university.edu`,
        role,
        ...(role === 'student' ? { studentId: identifier } : { teacherId: identifier }),
      },
      token,
    };
  },
};
