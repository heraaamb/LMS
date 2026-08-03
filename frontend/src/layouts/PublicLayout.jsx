import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Library, ArrowRight, UserPlus } from 'lucide-react';
import { Toast } from '../components/ui/Toast';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-brand-600 text-white shadow-xs">
              <Library className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-slate-900">ATHENA</span>
              <span className="text-[10px] text-slate-400 block tracking-wider font-semibold uppercase -mt-0.5">
                Library OS
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Body */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Toast Notifications */}
      <Toast />

      {/* Public Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-base mb-3">
              <Library className="w-5 h-5 text-brand-500" />
              <span>ATHENA LIBRARY</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Enterprise Library Management System designed for modern higher education institutions and research universities.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">Catalog Discovery</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Circulation Desk</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Inter-library Reservations</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Analytics Engine</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">System Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API References</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security & Compliance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Release Notes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Contact Support</h4>
            <p className="text-xs text-slate-400 mb-2">Central Campus Library Suite 402</p>
            <p className="text-xs text-slate-400 mb-2">support@athenalms.edu</p>
            <p className="text-xs font-mono text-slate-500">System Status: Operational</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500">
          <p>© {new Date().getFullYear()} Athena LMS Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
