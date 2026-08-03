// Default initial user roles for authentication
export const MOCK_STUDENT = {
  id: 'std_001',
  name: 'Student User',
  email: 'student@university.edu',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  studentId: 'STD-2024-001',
  department: 'General Studies',
  year: '1st Year',
  phone: '+1 (555) 000-0000',
  joinedDate: new Date().toISOString().split('T')[0],
  maxAllowedBooks: 5,
  activeIssuesCount: 0,
  status: 'active',
};

export const MOCK_ADMIN = {
  id: 'adm_001',
  name: 'Librarian Admin',
  email: 'admin@university.edu',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  department: 'Library Operations',
  joinedDate: new Date().toISOString().split('T')[0],
  status: 'active',
};

// Initial Empty Datasets
export const MOCK_CATEGORIES = [];
export const MOCK_AUTHORS = [];
export const MOCK_PUBLISHERS = [];
export const MOCK_BOOKS = [];
export const MOCK_ISSUES = [];
export const MOCK_RESERVATIONS = [];
export const MOCK_FINES = [];
export const MOCK_STUDENTS_LIST = [];
export const MOCK_NOTIFICATIONS = [];
export const MOCK_ACTIVITY_LOGS = [];

export const MOCK_ANALYTICS = {
  monthlyBorrowings: [],
  categoryDistribution: [],
  statsOverview: {
    totalBooks: 0,
    totalTitles: 0,
    activeStudents: 0,
    currentlyIssued: 0,
    overdueBooks: 0,
    pendingReservations: 0,
    totalFinesCollectedThisMonth: 0,
    unpaidFinesTotal: 0,
  }
};
