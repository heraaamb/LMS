import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLibrary } from '../../context/LibraryContext';
import { StatCard } from '../../components/ui/StatCard';
import { BookCard } from '../../components/books/BookCard';
import { Badge } from '../../components/ui/Badge';
import { Link } from 'react-router-dom';
import {
  BookmarkCheck,
  Clock,
  CreditCard,
  BookOpen,
  Search,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const { books, issues, reservations, fines, notifications } = useLibrary();

  const myIssues = issues.filter(
    (i) => (i.studentId === user?.id || i.studentId === 'std_1084') && i.status !== 'returned'
  );
  const myOverdue = myIssues.filter((i) => i.status === 'overdue');
  const myReservations = reservations.filter(
    (r) => (r.studentId === user?.id || r.studentId === 'std_1084') && r.status === 'pending'
  );
  const myUnpaidFines = fines.filter(
    (f) => (f.studentId === user?.id || f.studentId === 'std_1084') && f.status === 'unpaid'
  );

  const totalFineAmount = myUnpaidFines.reduce((sum, f) => sum + f.amount, 0);

  const recommendedBooks = books.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-600 font-semibold text-xs mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome back to Athena</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Hello, {user?.name || 'Student'} 👋
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {user?.department} • Student ID: <span className="font-mono text-slate-700">{user?.studentId}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/student/books"
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Browse Library Books</span>
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Issued Books"
          value={`${myIssues.length} / ${user?.maxAllowedBooks || 5}`}
          description="Max allowed: 5 books"
          icon={BookmarkCheck}
        />
        <StatCard
          title="Overdue Books"
          value={myOverdue.length}
          change={myOverdue.length > 0 ? 'Requires attention' : 'All up to date'}
          changeType={myOverdue.length > 0 ? 'negative' : 'positive'}
          icon={AlertCircle}
        />
        <StatCard
          title="Active Reservations"
          value={myReservations.length}
          description="Queue positions active"
          icon={Clock}
        />
        <StatCard
          title="Outstanding Fines"
          value={`$${totalFineAmount.toFixed(2)}`}
          change={totalFineAmount > 0 ? 'Unpaid' : 'Cleared'}
          changeType={totalFineAmount > 0 ? 'negative' : 'positive'}
          icon={CreditCard}
        />
      </div>

      {/* Main Grid: Currently Borrowed & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Issued Books List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs p-5">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Currently Issued Books
              </h2>
              <p className="text-xs text-slate-500">Track due dates and renewal eligibility</p>
            </div>
            <Link
              to="/student/issued"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {myIssues.length > 0 ? (
            <div className="space-y-3">
              {myIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={issue.coverImage}
                      alt={issue.bookTitle}
                      className="w-10 h-14 object-cover rounded shadow-xs"
                    />
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{issue.bookTitle}</h3>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">ISBN: {issue.isbn}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[11px] text-slate-500">Issued: {issue.issueDate}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] font-semibold text-slate-700">Due: {issue.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Badge variant={issue.status === 'overdue' ? 'danger' : 'brand'}>
                      {issue.status === 'overdue' ? `Overdue ($${issue.fineAmount})` : 'On Loan'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No books currently borrowed. Browse the catalog to issue a book!
            </div>
          )}
        </div>

        {/* System Announcements & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                to="/student/books"
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-brand-600" />
                  <span>Search Book Catalog</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/student/reservations"
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Check Reservation Holds</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/student/fines"
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>Pay Fine Balances</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-brand-900 text-white rounded-xl p-5 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-300">Announcements</span>
            <h3 className="text-sm font-bold mt-1">Extended Library Hours During Exams</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Central University Library will remain open 24/7 during Final Exam week starting August 10th.
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Books Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Recommended Literature For You
            </h2>
            <p className="text-xs text-slate-500">Based on your major: Computer Science & Software Engineering</p>
          </div>
          <Link
            to="/student/books"
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            Explore Catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {recommendedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};
