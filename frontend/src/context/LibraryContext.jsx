import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';
import {
  MOCK_BOOKS,
  MOCK_CATEGORIES,
  MOCK_AUTHORS,
  MOCK_PUBLISHERS,
  MOCK_ISSUES,
  MOCK_RESERVATIONS,
  MOCK_FINES,
  MOCK_STUDENTS_LIST,
  MOCK_NOTIFICATIONS,
  MOCK_ACTIVITY_LOGS,
  MOCK_ANALYTICS,
} from '../data/mockData';

const LibraryContext = createContext(null);

export const LibraryProvider = ({ children }) => {
  // Helper to initialize from localStorage or fallback
  const loadInitial = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`lms_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [books, setBooks] = useState(() => loadInitial('books', MOCK_BOOKS));
  const [categories, setCategories] = useState(() => loadInitial('categories', MOCK_CATEGORIES));
  const [authors, setAuthors] = useState(() => loadInitial('authors', MOCK_AUTHORS));
  const [publishers, setPublishers] = useState(() => loadInitial('publishers', MOCK_PUBLISHERS));
  const [issues, setIssues] = useState(() => loadInitial('issues', MOCK_ISSUES));
  const [reservations, setReservations] = useState(() => loadInitial('reservations', MOCK_RESERVATIONS));
  const [fines, setFines] = useState(() => loadInitial('fines', MOCK_FINES));
  const [students, setStudents] = useState(() => loadInitial('students', MOCK_STUDENTS_LIST));
  const [notifications, setNotifications] = useState(() => loadInitial('notifications', MOCK_NOTIFICATIONS));
  const [activityLogs, setActivityLogs] = useState(() => loadInitial('activityLogs', MOCK_ACTIVITY_LOGS));
  const [analytics, setAnalytics] = useState(MOCK_ANALYTICS);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Sync state to backend APIs on mount
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const booksRes = await apiService.getBooks();
        if (booksRes?.data && Array.isArray(booksRes.data) && booksRes.data.length > 0) {
          setBooks(booksRes.data);
        }
      } catch (err) {
        console.warn('[LibraryContext] Failed to fetch books from backend:', err.message);
      }

      try {
        const issuesRes = await apiService.getIssues();
        if (issuesRes?.data && Array.isArray(issuesRes.data) && issuesRes.data.length > 0) {
          setIssues(issuesRes.data);
        }
      } catch (err) {
        console.warn('[LibraryContext] Failed to fetch issues from backend:', err.message);
      }

      try {
        const resRes = await apiService.getReservations();
        if (resRes?.data && Array.isArray(resRes.data) && resRes.data.length > 0) {
          setReservations(resRes.data);
        }
      } catch (err) {
        console.warn('[LibraryContext] Failed to fetch reservations from backend:', err.message);
      }

      try {
        const finesRes = await apiService.getFines();
        if (finesRes?.data && Array.isArray(finesRes.data) && finesRes.data.length > 0) {
          setFines(finesRes.data);
        }
      } catch (err) {
        console.warn('[LibraryContext] Failed to fetch fines from backend:', err.message);
      }

      try {
        const studentsRes = await apiService.getStudents();
        if (studentsRes?.data && Array.isArray(studentsRes.data) && studentsRes.data.length > 0) {
          setStudents(studentsRes.data);
        }
      } catch (err) {
        console.warn('[LibraryContext] Failed to fetch students from backend:', err.message);
      }
    };

    fetchBackendData();
  }, []);

  // Sync to localStorage as client side fallback cache
  useEffect(() => { localStorage.setItem('lms_books', JSON.stringify(books)); }, [books]);
  useEffect(() => { localStorage.setItem('lms_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('lms_authors', JSON.stringify(authors)); }, [authors]);
  useEffect(() => { localStorage.setItem('lms_publishers', JSON.stringify(publishers)); }, [publishers]);
  useEffect(() => { localStorage.setItem('lms_issues', JSON.stringify(issues)); }, [issues]);
  useEffect(() => { localStorage.setItem('lms_reservations', JSON.stringify(reservations)); }, [reservations]);
  useEffect(() => { localStorage.setItem('lms_fines', JSON.stringify(fines)); }, [fines]);
  useEffect(() => { localStorage.setItem('lms_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('lms_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('lms_activityLogs', JSON.stringify(activityLogs)); }, [activityLogs]);

  // Activity Logger helper
  const logActivity = (actor, actorRole, action, target, details) => {
    const newLog = {
      id: `act_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor,
      actorRole,
      action,
      target,
      details,
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  // Toast notification helper state
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Books CRUD
  const addBook = async (bookData) => {
    const payload = {
      id: `bk_${Date.now()}`,
      availableCopies: parseInt(bookData.totalCopies || 1, 10),
      borrowedCopies: 0,
      reservedCopies: 0,
      rating: 5.0,
      tags: bookData.tags ? bookData.tags.split(',').map((t) => t.trim()) : ['General'],
      coverImage: bookData.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
      ...bookData,
      totalCopies: parseInt(bookData.totalCopies || 1, 10),
      publishYear: parseInt(bookData.publishYear || new Date().getFullYear(), 10),
      pages: parseInt(bookData.pages || 300, 10),
    };

    try {
      const res = await apiService.createBook(payload);
      if (res?.data) {
        setBooks((prev) => [res.data, ...prev]);
        logActivity('Librarian Admin', 'admin', 'BOOK_ADDED', res.data.title || payload.title, `Added ISBN ${payload.isbn}`);
        showToast(`Book "${payload.title}" added successfully!`);
        return res.data;
      }
    } catch (err) {
      console.warn('[LibraryContext] createBook API call failed or offline:', err.message);
    }

    setBooks((prev) => [payload, ...prev]);
    logActivity('Librarian Admin', 'admin', 'BOOK_ADDED', payload.title, `Added ISBN ${payload.isbn}`);
    showToast(`Book "${payload.title}" added successfully!`);
    return payload;
  };

  const updateBook = async (id, updatedFields) => {
    try {
      await apiService.updateBook(id, updatedFields);
    } catch (err) {
      console.warn('[LibraryContext] updateBook API call failed:', err.message);
    }
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
    logActivity('Librarian Admin', 'admin', 'BOOK_UPDATED', id, `Updated fields on book record.`);
    showToast('Book updated successfully!');
  };

  const deleteBook = async (id) => {
    const targetBook = books.find((b) => b.id === id);
    try {
      await apiService.deleteBook(id);
    } catch (err) {
      console.warn('[LibraryContext] deleteBook API call failed:', err.message);
    }
    setBooks((prev) => prev.filter((b) => b.id !== id));
    if (targetBook) {
      logActivity('Librarian Admin', 'admin', 'BOOK_DELETED', targetBook.title, `Removed book from system.`);
      showToast(`Book "${targetBook.title}" removed.`, 'warning');
    }
  };

  // Category Actions
  const addCategory = async (cat) => {
    const payload = {
      id: `cat_${Date.now()}`,
      bookCount: 0,
      ...cat,
    };
    try {
      await apiService.createCategory(payload);
    } catch (err) {
      console.warn('[LibraryContext] createCategory API call failed:', err.message);
    }
    setCategories((prev) => [...prev, payload]);
    showToast(`Category "${cat.name}" added.`);
  };

  // Issue Book
  const issueBookToStudent = async (bookId, studentId, dueDateStr) => {
    const targetBook = books.find((b) => b.id === bookId);
    const targetStudent = students.find((s) => s.id === studentId || s.studentId === studentId);

    if (!targetBook || targetBook.availableCopies < 1) {
      showToast('Book is not available for issue.', 'error');
      return false;
    }

    const studentName = targetStudent?.name || 'Student User';
    const studentEmail = targetStudent?.email || 'student@university.edu';
    const sId = targetStudent?.id || studentId;
    const dueDate = dueDateStr || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newIssuePayload = {
      bookId: targetBook.id,
      studentId: sId,
      dueDate,
    };

    try {
      await apiService.issueBook(newIssuePayload);
    } catch (err) {
      console.warn('[LibraryContext] issueBook API call failed:', err.message);
    }

    const newIssue = {
      id: `iss_${Date.now()}`,
      bookId: targetBook.id,
      bookTitle: targetBook.title,
      isbn: targetBook.isbn,
      coverImage: targetBook.coverImage,
      studentId: sId,
      studentName,
      studentEmail,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate,
      status: 'issued',
      issuedBy: 'Librarian Admin',
      fineAmount: 0,
      renewedCount: 0,
    };

    setIssues((prev) => [newIssue, ...prev]);

    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? {
              ...b,
              availableCopies: Math.max(0, b.availableCopies - 1),
              borrowedCopies: b.borrowedCopies + 1,
            }
          : b
      )
    );

    if (targetStudent) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === targetStudent.id
            ? { ...s, activeIssuesCount: s.activeIssuesCount + 1 }
            : s
        )
      );
    }

    logActivity('Librarian Admin', 'admin', 'BOOK_ISSUED', targetBook.title, `Issued to ${studentName}`);
    showToast(`Successfully issued "${targetBook.title}" to ${studentName}.`);
    return true;
  };

  // Return Book
  const processReturn = async (issueId) => {
    const targetIssue = issues.find((i) => i.id === issueId);
    if (!targetIssue) return;

    try {
      await apiService.returnBook(issueId);
    } catch (err) {
      console.warn('[LibraryContext] returnBook API call failed:', err.message);
    }

    setIssues((prev) =>
      prev.map((i) =>
        i.id === issueId
          ? {
              ...i,
              status: 'returned',
              returnDate: new Date().toISOString().split('T')[0],
            }
          : i
      )
    );

    setBooks((prev) =>
      prev.map((b) =>
        b.id === targetIssue.bookId
          ? {
              ...b,
              availableCopies: b.availableCopies + 1,
              borrowedCopies: Math.max(0, b.borrowedCopies - 1),
            }
          : b
      )
    );

    setStudents((prev) =>
      prev.map((s) =>
        s.id === targetIssue.studentId
          ? { ...s, activeIssuesCount: Math.max(0, s.activeIssuesCount - 1) }
          : s
      )
    );

    logActivity('Librarian Admin', 'admin', 'BOOK_RETURNED', targetIssue.bookTitle, `Returned by ${targetIssue.studentName}`);
    showToast(`Book "${targetIssue.bookTitle}" successfully returned.`);
  };

  // Reserve Book
  const reserveBook = async (bookId, studentId, studentName, studentEmail) => {
    const targetBook = books.find((b) => b.id === bookId);
    if (!targetBook) return;

    const payload = {
      bookId: targetBook.id,
      studentId: studentId || 'std_001',
    };

    try {
      await apiService.createReservation(payload);
    } catch (err) {
      console.warn('[LibraryContext] createReservation API call failed:', err.message);
    }

    const newRes = {
      id: `res_${Date.now()}`,
      bookId: targetBook.id,
      bookTitle: targetBook.title,
      coverImage: targetBook.coverImage,
      studentId: studentId || 'std_001',
      studentName: studentName || 'Student User',
      studentEmail: studentEmail || 'student@university.edu',
      requestDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      queuePosition: reservations.filter((r) => r.bookId === bookId && r.status === 'pending').length + 1,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };

    setReservations((prev) => [newRes, ...prev]);

    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId ? { ...b, reservedCopies: b.reservedCopies + 1 } : b
      )
    );

    logActivity(studentName || 'Student User', 'student', 'RESERVATION_CREATED', targetBook.title, 'Placed on queue');
    showToast(`Reservation request for "${targetBook.title}" submitted.`);
  };

  const updateReservationStatus = async (id, newStatus) => {
    try {
      await apiService.updateReservationStatus(id, newStatus);
    } catch (err) {
      console.warn('[LibraryContext] updateReservationStatus API call failed:', err.message);
    }
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    showToast(`Reservation marked as ${newStatus}.`);
  };

  // Fine Management
  const payFine = async (fineId) => {
    try {
      await apiService.payFine(fineId);
    } catch (err) {
      console.warn('[LibraryContext] payFine API call failed:', err.message);
    }
    setFines((prev) =>
      prev.map((f) =>
        f.id === fineId
          ? { ...f, status: 'paid', paidDate: new Date().toISOString().split('T')[0] }
          : f
      )
    );
    showToast('Fine payment processed successfully!');
  };

  const waiveFine = async (fineId) => {
    try {
      await apiService.waiveFine(fineId);
    } catch (err) {
      console.warn('[LibraryContext] waiveFine API call failed:', err.message);
    }
    setFines((prev) =>
      prev.map((f) => (f.id === fineId ? { ...f, status: 'waived' } : f))
    );
    showToast('Fine waived by librarian.');
  };

  // Notifications
  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  return (
    <LibraryContext.Provider
      value={{
        books,
        categories,
        authors,
        publishers,
        issues,
        reservations,
        fines,
        students,
        notifications,
        activityLogs,
        analytics,
        toastMessage,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        addBook,
        updateBook,
        deleteBook,
        addCategory,
        issueBookToStudent,
        processReturn,
        reserveBook,
        updateReservationStatus,
        payFine,
        waiveFine,
        markNotificationRead,
        markAllNotificationsRead,
        showToast,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
