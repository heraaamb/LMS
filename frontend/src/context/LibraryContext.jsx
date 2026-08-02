import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const [analytics] = useState(MOCK_ANALYTICS);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Sync to localStorage
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
  const addBook = (bookData) => {
    const newBook = {
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
    setBooks((prev) => [newBook, ...prev]);
    logActivity('Librarian Admin', 'admin', 'BOOK_ADDED', newBook.title, `Added ISBN ${newBook.isbn}`);
    showToast(`Book "${newBook.title}" added to inventory successfully!`);
    return newBook;
  };

  const updateBook = (id, updatedFields) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
    logActivity('Librarian Admin', 'admin', 'BOOK_UPDATED', id, `Updated fields on book record.`);
    showToast('Book updated successfully!');
  };

  const deleteBook = (id) => {
    const targetBook = books.find((b) => b.id === id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
    if (targetBook) {
      logActivity('Librarian Admin', 'admin', 'BOOK_DELETED', targetBook.title, `Removed book from system.`);
      showToast(`Book "${targetBook.title}" removed.`, 'warning');
    }
  };

  // Category Actions
  const addCategory = (cat) => {
    const newCat = {
      id: `cat_${Date.now()}`,
      bookCount: 0,
      ...cat,
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Category "${cat.name}" added.`);
  };

  // Issue Book
  const issueBookToStudent = (bookId, studentId, dueDateStr) => {
    const targetBook = books.find((b) => b.id === bookId);
    const targetStudent = students.find((s) => s.id === studentId || s.studentId === studentId);

    if (!targetBook || targetBook.availableCopies < 1) {
      showToast('Book is not available for issue.', 'error');
      return false;
    }

    const studentName = targetStudent?.name || 'Student User';
    const studentEmail = targetStudent?.email || 'student@university.edu';
    const sId = targetStudent?.id || studentId;

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
      dueDate: dueDateStr || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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
  const processReturn = (issueId) => {
    const targetIssue = issues.find((i) => i.id === issueId);
    if (!targetIssue) return;

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
  const reserveBook = (bookId, studentId, studentName, studentEmail) => {
    const targetBook = books.find((b) => b.id === bookId);
    if (!targetBook) return;

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

  const updateReservationStatus = (id, newStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    showToast(`Reservation marked as ${newStatus}.`);
  };

  // Fine Management
  const payFine = (fineId) => {
    setFines((prev) =>
      prev.map((f) =>
        f.id === fineId
          ? { ...f, status: 'paid', paidDate: new Date().toISOString().split('T')[0] }
          : f
      )
    );
    showToast('Fine payment processed successfully!');
  };

  const waiveFine = (fineId) => {
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
