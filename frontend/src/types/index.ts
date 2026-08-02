export type Role = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  studentId?: string;
  department?: string;
  year?: string;
  phone?: string;
  joinedDate: string;
  maxAllowedBooks?: number;
  activeIssuesCount?: number;
  status: 'active' | 'suspended';
}

export interface Book {
  id: string;
  isbn: string;
  title: string;
  subtitle?: string;
  author: string;
  authorId: string;
  publisher: string;
  publisherId: string;
  category: string;
  categoryId: string;
  edition: string;
  publishYear: number;
  totalCopies: number;
  availableCopies: number;
  borrowedCopies: number;
  reservedCopies: number;
  rackNumber: string;
  shelfNumber: string;
  description: string;
  coverImage: string;
  rating: number;
  tags: string[];
  pages: number;
  language: string;
}

export interface Category {
  id: string;
  name: string;
  code: string;
  description: string;
  bookCount: number;
}

export interface Author {
  id: string;
  name: string;
  biography: string;
  nationality: string;
  bookCount: number;
}

export interface Publisher {
  id: string;
  name: string;
  location: string;
  website: string;
  bookCount: number;
}

export interface IssueRecord {
  id: string;
  bookId: string;
  bookTitle: string;
  isbn: string;
  coverImage: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'issued' | 'overdue' | 'returned';
  issuedBy: string;
  fineAmount: number;
  renewedCount: number;
}

export interface Reservation {
  id: string;
  bookId: string;
  bookTitle: string;
  coverImage: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'fulfilled' | 'cancelled';
  queuePosition: number;
  expiresAt: string;
}

export interface Fine {
  id: string;
  issueId: string;
  studentId: string;
  studentName: string;
  bookTitle: string;
  amount: number;
  reason: 'overdue' | 'damaged' | 'lost';
  status: 'unpaid' | 'paid' | 'waived';
  dueDate: string;
  paidDate?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'due_date' | 'overdue' | 'reservation' | 'fine' | 'system';
  link?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: Role;
  action: string;
  target: string;
  details: string;
}
