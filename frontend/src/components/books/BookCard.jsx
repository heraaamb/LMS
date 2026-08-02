import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { Star, BookOpen, Bookmark, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLibrary } from '../../context/LibraryContext';

export const BookCard = ({ book }) => {
  const { role } = useAuth();
  const { reserveBook, issueBookToStudent } = useLibrary();

  const isAvailable = book.availableCopies > 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-card hover:border-slate-300 transition-all flex flex-col overflow-hidden group">
      {/* Cover Image */}
      <div className="relative h-52 bg-slate-100 overflow-hidden">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={isAvailable ? 'success' : 'danger'}>
            {isAvailable ? `${book.availableCopies} available` : 'All Borrowed'}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span>{book.rating}</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-1">
            {book.category}
          </div>
          <Link
            to={role === 'admin' ? `/admin/books` : `/student/books/${book.id}`}
            className="font-semibold text-slate-900 hover:text-brand-600 line-clamp-2 text-sm leading-snug transition-colors"
          >
            {book.title}
          </Link>
          <p className="text-xs text-slate-500 mt-1">{book.author}</p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono text-[11px]">{book.rackNumber}</span>

          {role === 'student' ? (
            isAvailable ? (
              <Link
                to={`/student/books/${book.id}`}
                className="px-2.5 py-1 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-md border border-brand-200 transition-colors"
              >
                View Details
              </Link>
            ) : (
              <button
                onClick={() => reserveBook(book.id)}
                className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md border border-slate-200 transition-colors flex items-center gap-1"
              >
                <Bookmark className="w-3 h-3" />
                Reserve
              </button>
            )
          ) : (
            <Link
              to={`/admin/books/${book.id}/edit`}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Edit Book
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
