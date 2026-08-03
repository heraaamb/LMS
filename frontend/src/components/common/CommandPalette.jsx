import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '../../context/LibraryContext';
import { useAuth } from '../../context/AuthContext';
import { Search, BookOpen, Users, ArrowRight, X, LayoutDashboard, Bookmark, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CommandPalette = () => {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, books, students } = useLibrary();
  const { role } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredBooks = query
    ? books.filter(
        (b) =>
          b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.author.toLowerCase().includes(query.toLowerCase()) ||
          b.isbn.includes(query)
      ).slice(0, 4)
    : books.slice(0, 3);

  const filteredStudents = role === 'admin' && query
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.studentId.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  const handleSelectRoute = (path) => {
    setIsCommandPaletteOpen(false);
    setQuery('');
    navigate(path);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCommandPaletteOpen(false)}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-xl bg-white rounded-xl shadow-dropdown border border-slate-200 z-10 overflow-hidden"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3 border-b border-slate-100">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <input
              type="text"
              autoFocus
              placeholder="Search books, authors, ISBNs, students, or jump to page..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-sm bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400"
            />
            <button
              onClick={() => setIsCommandPaletteOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Results */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-3">
            {/* Quick Links */}
            <div>
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Quick Navigation
              </div>
              <div className="space-y-1 mt-1">
                <button
                  onClick={() => handleSelectRoute(role === 'admin' ? '/admin/dashboard' : '/student/dashboard')}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4 text-brand-600" />
                    <span>Dashboard</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => handleSelectRoute(role === 'admin' ? '/admin/books' : '/student/books')}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-brand-600" />
                    <span>Browse Books Catalog</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                {role === 'student' && (
                  <button
                    onClick={() => handleSelectRoute('/student/issued')}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Bookmark className="w-4 h-4 text-brand-600" />
                      <span>My Issued Books</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Books Match */}
            {filteredBooks.length > 0 && (
              <div>
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Books
                </div>
                <div className="space-y-1 mt-1">
                  {filteredBooks.map((book) => (
                    <button
                      key={book.id}
                      onClick={() =>
                        handleSelectRoute(role === 'admin' ? `/admin/books` : `/student/books/${book.id}`)
                      }
                      className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-7 h-9 object-cover rounded shadow-xs"
                        />
                        <div>
                          <p className="font-semibold text-slate-900 line-clamp-1">{book.title}</p>
                          <p className="text-slate-400 text-[11px]">{book.author} • ISBN: {book.isbn}</p>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">{book.category}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Students Match (Admin only) */}
            {filteredStudents.length > 0 && (
              <div>
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Students
                </div>
                <div className="space-y-1 mt-1">
                  {filteredStudents.map((std) => (
                    <button
                      key={std.id}
                      onClick={() => handleSelectRoute(`/admin/students/${std.id}`)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <img src={std.avatar} alt={std.name} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-slate-900">{std.name}</p>
                          <p className="text-slate-400 text-[11px]">{std.studentId} • {std.department}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer keyboard guidance */}
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono text-[10px]">ESC</kbd> to close</span>
            <span>Navigate with arrows & ENTER</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
