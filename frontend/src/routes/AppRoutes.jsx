import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { StudentLayout } from '../layouts/StudentLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Public Pages
import { LandingPage } from '../pages/public/LandingPage';
import { LoginPage } from '../pages/public/LoginPage';
import { ForgotPasswordPage } from '../pages/public/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/public/ResetPasswordPage';
import { NotFoundPage } from '../pages/public/NotFoundPage';

// Student Pages
import { StudentDashboard } from '../pages/student/StudentDashboard';
import { StudentBooksPage } from '../pages/student/StudentBooksPage';
import { BookDetailPage } from '../pages/student/BookDetailPage';
import { IssuedBooksPage } from '../pages/student/IssuedBooksPage';
import { BorrowingHistoryPage } from '../pages/student/BorrowingHistoryPage';
import { ReservationsPage } from '../pages/student/ReservationsPage';
import { StudentFinesPage } from '../pages/student/StudentFinesPage';
import { StudentNotificationsPage } from '../pages/student/StudentNotificationsPage';
import { StudentProfilePage } from '../pages/student/StudentProfilePage';
import { StudentSettingsPage } from '../pages/student/StudentSettingsPage';

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { ManageBooksPage } from '../pages/admin/ManageBooksPage';
import { AddEditBookPage } from '../pages/admin/AddEditBookPage';
import { CategoriesPage } from '../pages/admin/CategoriesPage';
import { AuthorsPage } from '../pages/admin/AuthorsPage';
import { PublishersPage } from '../pages/admin/PublishersPage';
import { IssueBookPage } from '../pages/admin/IssueBookPage';
import { ReturnBookPage } from '../pages/admin/ReturnBookPage';
import { AdminReservationsPage } from '../pages/admin/AdminReservationsPage';
import { ManageStudentsPage } from '../pages/admin/ManageStudentsPage';
import { StudentDetailPage } from '../pages/admin/StudentDetailPage';
import { AdminFinesPage } from '../pages/admin/AdminFinesPage';
import { ReportsPage } from '../pages/admin/ReportsPage';
import { ActivityLogsPage } from '../pages/admin/ActivityLogsPage';
import { AdminProfilePage } from '../pages/admin/AdminProfilePage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* STUDENT PROTECTED ROUTES */}
      <Route
        element={
          <ProtectedRoute allowedRole="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/books" element={<StudentBooksPage />} />
        <Route path="/student/books/:id" element={<BookDetailPage />} />
        <Route path="/student/issued" element={<IssuedBooksPage />} />
        <Route path="/student/history" element={<BorrowingHistoryPage />} />
        <Route path="/student/reservations" element={<ReservationsPage />} />
        <Route path="/student/fines" element={<StudentFinesPage />} />
        <Route path="/student/notifications" element={<StudentNotificationsPage />} />
        <Route path="/student/profile" element={<StudentProfilePage />} />
        <Route path="/student/settings" element={<StudentSettingsPage />} />
      </Route>

      {/* LIBRARIAN / ADMIN PROTECTED ROUTES */}
      <Route
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/books" element={<ManageBooksPage />} />
        <Route path="/admin/books/new" element={<AddEditBookPage />} />
        <Route path="/admin/books/:id/edit" element={<AddEditBookPage />} />
        <Route path="/admin/categories" element={<CategoriesPage />} />
        <Route path="/admin/authors" element={<AuthorsPage />} />
        <Route path="/admin/publishers" element={<PublishersPage />} />
        <Route path="/admin/issue" element={<IssueBookPage />} />
        <Route path="/admin/returns" element={<ReturnBookPage />} />
        <Route path="/admin/reservations" element={<AdminReservationsPage />} />
        <Route path="/admin/students" element={<ManageStudentsPage />} />
        <Route path="/admin/students/:id" element={<StudentDetailPage />} />
        <Route path="/admin/fines" element={<AdminFinesPage />} />
        <Route path="/admin/reports" element={<ReportsPage />} />
        <Route path="/admin/activity" element={<ActivityLogsPage />} />
        <Route path="/admin/profile" element={<AdminProfilePage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
      </Route>

      {/* 404 NOT FOUND */}
      <Route element={<PublicLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
