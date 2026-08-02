import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  BookmarkCheck,
  History,
  Clock,
  CreditCard,
  Bell,
  User,
  Settings,
  FolderTree,
  UserCheck,
  Building2,
  BookUp,
  BookDown,
  Users,
  BarChart3,
  Activity,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Library,
} from 'lucide-react';

export const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const { role } = useAuth();

  const studentNavItems = [
    { label: 'Overview', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Browse Catalog', path: '/student/books', icon: BookOpen },
    { label: 'Currently Issued', path: '/student/issued', icon: BookmarkCheck },
    { label: 'Borrowing History', path: '/student/history', icon: History },
    { label: 'My Reservations', path: '/student/reservations', icon: Clock },
    { label: 'Fines & Payments', path: '/student/fines', icon: CreditCard },
    { label: 'Notifications', path: '/student/notifications', icon: Bell },
    { label: 'Profile', path: '/student/profile', icon: User },
    { label: 'Settings', path: '/student/settings', icon: Settings },
  ];

  const adminNavItems = [
    { section: 'MANAGEMENT' },
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Manage Books', path: '/admin/books', icon: BookOpen },
    { label: 'Categories', path: '/admin/categories', icon: FolderTree },
    { label: 'Authors', path: '/admin/authors', icon: UserCheck },
    { label: 'Publishers', path: '/admin/publishers', icon: Building2 },
    { section: 'CIRCULATION' },
    { label: 'Issue Book', path: '/admin/issue', icon: BookUp },
    { label: 'Return Book', path: '/admin/returns', icon: BookDown },
    { label: 'Reservations', path: '/admin/reservations', icon: Clock },
    { label: 'Manage Students', path: '/admin/students', icon: Users },
    { label: 'Fine Management', path: '/admin/fines', icon: CreditCard },
    { section: 'REPORTS & LOGS' },
    { label: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3 },
    { label: 'Activity Logs', path: '/admin/activity', icon: Activity },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const navItems = role === 'admin' ? adminNavItems : studentNavItems;

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-40 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col transition-all duration-200 ${
        isCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Brand Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-slate-800">
        <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="p-1.5 rounded-lg bg-brand-600 text-white flex-shrink-0">
            <Library className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div>
              <span className="font-bold text-sm tracking-wide text-white font-sans">ATHENA</span>
              <span className="text-[10px] text-slate-400 block tracking-widest font-medium uppercase">
                Library OS
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={onToggleCollapse}
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden lg:block"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Role Badge */}
      {!isCollapsed && (
        <div className="px-4 py-2 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Current Role</span>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              role === 'admin'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
            }`}
          >
            {role === 'admin' ? 'Librarian' : 'Student'}
          </span>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {navItems.map((item, idx) => {
          if (item.section) {
            if (isCollapsed) return null;
            return (
              <div key={idx} className="px-3 pt-3 pb-1 text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                {item.section}
              </div>
            );
          }

          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`
              }
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Info */}
      {!isCollapsed && (
        <div className="p-3 border-t border-slate-800 text-[11px] text-slate-500 text-center">
          Athena LMS v2.4 • Production
        </div>
      )}
    </aside>
  );
};
