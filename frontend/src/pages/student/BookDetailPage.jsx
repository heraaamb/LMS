import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLibrary } from '../../context/LibraryContext';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/ui/Badge';
import { BookCard } from '../../components/books/BookCard';
import { Star, MapPin, BookOpen, Bookmark, ArrowLeft, Building2, Calendar, Hash, CheckCircle2 } from 'lucide-react';

export const BookDetailPage = () => {
  const { id } = useParams();
  const { books, reserveBook } = useLibrary();
  const { user } = useAuth();

  const book = books.find((b) => b.id === id) || books[0];
  const relatedBooks = books.filter((b) => b.id !== book.id && b.category === book.category).slice(0, 4);

  const isAvailable = book.availableCopies > 0;

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link
          to="/student/books"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Book Catalog
        </Link>
      </div>

      {/* Main Details Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cover Image & Quick Action */}
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
            <img src={book.coverImage} alt={book.title} className="w-full h-80 object-cover" />
          </div>

          <div className="space-y-2">
            {isAvailable ? (
              <button
                onClick={() => reserveBook(book.id, user?.id, user?.name, user?.email)}
                className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Bookmark className="w-4 h-4" />
                <span>Reserve / Hold This Book</span>
              </button>
            ) : (
              <button
                onClick={() => reserveBook(book.id, user?.id, user?.name, user?.email)}
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Bookmark className="w-4 h-4" />
                <span>Place on Waitlist Queue</span>
              </button>
            )}
          </div>
        </div>

        {/* Info Column */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="brand">{book.category}</Badge>
              <Badge variant={isAvailable ? 'success' : 'danger'}>
                {isAvailable ? `${book.availableCopies} Copies Available` : 'All Copies Borrowed'}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{book.title}</h1>
            {book.subtitle && <p className="text-sm text-slate-500 mt-1 italic">{book.subtitle}</p>}
            <p className="text-sm font-semibold text-slate-700 mt-2">By {book.author}</p>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block font-semibold uppercase text-[10px]">ISBN-13</span>
              <span className="font-mono font-bold text-slate-900 mt-0.5 block">{book.isbn}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold uppercase text-[10px]">Rack Location</span>
              <span className="font-mono font-bold text-slate-900 mt-0.5 block">{book.rackNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold uppercase text-[10px]">Publisher</span>
              <span className="font-bold text-slate-900 mt-0.5 block">{book.publisher}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold uppercase text-[10px]">Publish Year</span>
              <span className="font-bold text-slate-900 mt-0.5 block">{book.publishYear}</span>
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Synopsis & Summary</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{book.description}</p>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Topics & Tags</h3>
            <div className="flex flex-wrap gap-1.5">
              {book.tags.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium border border-slate-200">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">More Books in {book.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedBooks.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
