import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { BookUp, Search, UserCheck, Calendar, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const IssueBookPage = () => {
  const { books, students, issueBookToStudent } = useLibrary();
  const navigate = useNavigate();

  const [selectedBookId, setSelectedBookId] = useState(books[0]?.id || '');
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [dueDate, setDueDate] = useState('2026-08-16');

  const selectedBook = books.find((b) => b.id === selectedBookId);
  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = issueBookToStudent(selectedBookId, selectedStudentId, dueDate);
    if (success) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Circulation Desk: Issue Book</h1>
        <p className="text-xs text-slate-500 mt-1">Assign an available catalog copy to an active student account.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
        {/* Book Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Select Book Title *</label>
          <select
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
            className="w-full px-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          >
            {books.map((b) => (
              <option key={b.id} value={b.id} disabled={b.availableCopies < 1}>
                {b.title} ({b.availableCopies} available) • ISBN: {b.isbn}
              </option>
            ))}
          </select>

          {selectedBook && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <img src={selectedBook.coverImage} alt={selectedBook.title} className="w-10 h-14 object-cover rounded shadow-xs" />
              <div className="text-xs">
                <p className="font-bold text-slate-900">{selectedBook.title}</p>
                <p className="text-slate-500">Rack Location: <span className="font-mono text-slate-700">{selectedBook.rackNumber}</span></p>
                <p className="text-emerald-600 font-semibold">{selectedBook.availableCopies} copies currently available</p>
              </div>
            </div>
          )}
        </div>

        {/* Student Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Select Student Account *</label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="w-full px-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.studentId}) • {s.department}
              </option>
            ))}
          </select>

          {selectedStudent && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="text-xs">
                <p className="font-bold text-slate-900">{selectedStudent.name}</p>
                <p className="text-slate-500">{selectedStudent.email} • {selectedStudent.year}</p>
                <p className="text-brand-600 font-semibold">{selectedStudent.activeIssuesCount} active loans on record</p>
              </div>
            </div>
          )}
        </div>

        {/* Due Date Picker */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Set Loan Return Due Date *</label>
          <input
            type="date"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-2"
          >
            <BookUp className="w-4 h-4" />
            <span>Confirm & Issue Book</span>
          </button>
        </div>
      </form>
    </div>
  );
};
