import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User as UserIcon, Settings, LogOut, ArrowRightLeft, ShieldCheck, GraduationCap } from 'lucide-react';

export const ProfileDropdown = () => {
  const { user, role, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleToggle = () => {
    const targetRole = role === 'admin' ? 'student' : 'admin';
    switchRole(targetRole);
    setIsOpen(false);
    navigate(targetRole === 'admin' ? '/admin/dashboard' : '/student/dashboard');
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
      >
        <img
          src={user?.avatar}
          alt={user?.name}
          className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-xs"
        />
        <div className="hidden md:block text-left">
          <p className="text-xs font-semibold text-slate-800 leading-tight">{user?.name}</p>
          <p className="text-[11px] text-slate-500 capitalize">{role === 'admin' ? 'Librarian' : 'Student'}</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-dropdown border border-slate-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="p-3.5 border-b border-slate-100 bg-slate-50/50">
            <p className="text-xs font-semibold text-slate-900">{user?.name}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-50 text-brand-700 border border-brand-200 capitalize">
                <ShieldCheck className="w-3 h-3" />
                {role === 'admin' ? 'Librarian / Admin' : 'Student Account'}
              </span>
            </div>
          </div>

          {/* Quick Role Switcher Button */}
          <div className="p-2 border-b border-slate-100 bg-slate-50/30">
            <button
              onClick={handleRoleToggle}
              className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-medium text-brand-700 bg-brand-50 hover:bg-brand-100/70 border border-brand-200 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Switch to {role === 'admin' ? 'Student' : 'Librarian'} View</span>
              </div>
            </button>
          </div>

          {/* Menu Items */}
          <div className="p-1 space-y-0.5">
            <Link
              to={role === 'admin' ? '/admin/profile' : '/student/profile'}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
            >
              <UserIcon className="w-4 h-4 text-slate-400" />
              My Account Profile
            </Link>

            <Link
              to={role === 'admin' ? '/admin/settings' : '/student/settings'}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              Settings & Preferences
            </Link>
          </div>

          {/* Footer */}
          <div className="p-1 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4 text-rose-500" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
