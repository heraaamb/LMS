/**
 * API Service Layer for Library Management System
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('lms_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`[API] ${options.method || 'GET'} ${endpoint} failed:`, error.message);
    throw error;
  }
}

export const apiService = {
  // Auth
  register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getCurrentUser: () => request('/auth/me'),

  // Books Catalog
  getBooks: () => request('/books'),
  getBookById: (id) => request(`/books/${id}`),
  createBook: (bookData) => request('/books', { method: 'POST', body: JSON.stringify(bookData) }),
  updateBook: (id, bookData) => request(`/books/${id}`, { method: 'PUT', body: JSON.stringify(bookData) }),
  deleteBook: (id) => request(`/books/${id}`, { method: 'DELETE' }),

  // Categories
  getCategories: () => request('/categories'),
  createCategory: (data) => request('/categories', { method: 'POST', body: JSON.stringify(data) }),

  // Authors & Publishers
  getAuthors: () => request('/authors'),
  createAuthor: (data) => request('/authors', { method: 'POST', body: JSON.stringify(data) }),
  getPublishers: () => request('/publishers'),
  createPublisher: (data) => request('/publishers', { method: 'POST', body: JSON.stringify(data) }),

  // Circulation Desk
  getIssues: () => request('/issues'),
  issueBook: (data) => request('/issues/issue', { method: 'POST', body: JSON.stringify(data) }),
  returnBook: (issueId) => request(`/issues/${issueId}/return`, { method: 'POST' }),
  renewBook: (issueId) => request(`/issues/${issueId}/renew`, { method: 'POST' }),

  // Hold Reservations
  getReservations: () => request('/reservations'),
  createReservation: (data) => request('/reservations', { method: 'POST', body: JSON.stringify(data) }),
  updateReservationStatus: (id, status) => request(`/reservations/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  // Fines Management
  getFines: () => request('/fines'),
  payFine: (id) => request(`/fines/${id}/pay`, { method: 'POST' }),
  waiveFine: (id) => request(`/fines/${id}/waive`, { method: 'POST' }),

  // Student Directory
  getStudents: () => request('/students'),
  getStudentById: (id) => request(`/students/${id}`),

  // Analytics & Audit Logs
  getAnalytics: () => request('/reports/analytics'),
  getActivityLogs: () => request('/reports/activity-logs'),
};
