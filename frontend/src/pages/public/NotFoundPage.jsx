import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 text-center">
      <div className="max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-dropdown space-y-4">
        <div className="p-4 bg-slate-100 text-slate-500 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
          <FileQuestion className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">404 - Page Not Found</h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The library route or resource you are looking for does not exist or has been relocated to another section.
        </p>
        <div className="pt-4 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Return to Landing</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
