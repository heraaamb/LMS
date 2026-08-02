import React, { createContext, useContext, useState } from 'react';
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
  const [books, setBooks] = useState(MOCK_BOOKS);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [authors, setAuthors] = useState(MOCK_AUTHORS);
  const [publishers, setPublishers] = useState(MOCK_PUBLISHERS);
  const [issues, setIssues] = useState(MOCK_ISSUES);
  const [reservations, setReservations] = useState(MOCK_RESERVATIONS);
  const [fines, setFines] = useState(MOCK_FINES);
  const [students, setStudents] = useState(MOCK_STUDENTS_LIST);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [activityLogs, setActivityLogs] = useState(MOCK_ACTIVITY_LOGS);
  const [analytics] = useState(MOCK_ANALYTICS);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

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
      publishYear: parseInt(bookData.publishYear || 2024, 10),
      pages: parseInt(bookData.pages || 300, 10),
    };
    setBooks((prev) => [newBook, ...prev]);
    logActivity('Dr. Eleanor Vance', 'admin', 'BOOK_ADDED', newBook.title, `Added ISBN ${newBook.isbn}`);
    showToast(`Book "${newBook.title}" added to inventory successfully!`);
    return newBook;
  };

  const updateBook = (id, updatedFields) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
    logActivity('Dr. Eleanor Vance', 'admin', 'BOOK_UPDATED', id, `Updated fields on book record.`);
    showToast('Book updated successfully!');
  };

  const deleteBook = (id) => {
    const targetBook = books.find((b) => b.id === id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
    if (targetBook) {
      logActivity('Dr. Eleanor Vance', 'admin', 'BOOK_DELETED', targetBook.title, `Removed book from system.`);
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

    if (!targetStudent) {
      showToast('Student record not found.', 'error');
      return false;
    }

    const newIssue = {
      id: `iss_${Date.now()}`,
      bookId: targetBook.id,
      bookTitle: targetBook.title,
      isbn: targetBook.isbn,
      coverImage: targetBook.coverImage,
      studentId: targetStudent.id,
      studentName: targetStudent.name,
      studentEmail: targetStudent.email,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: dueDateStr || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'issued',
      issuedBy: 'Dr. Eleanor Vance',
      fineAmount: 0,
      renewedCount: 0,
    };

    setIssues((prev) => [newIssue, ...prev]);

    // Update book inventory count
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

    // Update student active issues count
    setStudents((prev) =>
      prev.map((s) =>
        s.id === targetStudent.id
          ? { ...s, activeIssuesCount: s.activeIssuesCount + 1 }
          : s
      )
    );

    logActivity('Dr. Eleanor Vance', 'admin', 'BOOK_ISSUED', targetBook.title, `Issued to ${targetStudent.name}`);
    showToast(`Successfully issued "${targetBook.title}" to ${targetStudent.name}.`);
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

    // Restore book count
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

    // Decrement student active issues
    setStudents((prev) =>
      prev.map((s) =>
        s.id === targetIssue.studentId
          ? { ...s, activeIssuesCount: Math.max(0, s.activeIssuesCount - 1) }
          : s
      )
    );

    logActivity('Dr. Eleanor Vance', 'admin', 'BOOK_RETURNED', targetIssue.bookTitle, `Returned by ${targetIssue.studentName}`);
    showToast(`Book "${targetIssue.bookTitle}" successfully returned.`);
  };

  // Reserve Book (Student)
  const reserveBook = (bookId, studentId, studentName, studentEmail) => {
    const targetBook = books.find((b) => b.id === bookId);
    if (!targetBook) return;

    const newRes = {
      id: `res_${Date.now()}`,
      bookId: targetBook.id,
      bookTitle: targetBook.title,
      coverImage: targetBook.coverImage,
      studentId: studentId || 'std_1084',
      studentName: studentName || 'Alexander Wright',
      studentEmail: studentEmail || 'alex.wright@university.edu',
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

    logActivity(studentName || 'Alexander Wright', 'student', 'RESERVATION_CREATED', targetBook.title, 'Placed on queue');
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

  // Notification actions
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
