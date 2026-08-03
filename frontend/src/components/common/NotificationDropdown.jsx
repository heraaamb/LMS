import React, { useState, useRef, useEffect } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { useAuth } from '../../context/AuthContext';
import { Bell, CheckCheck, AlertCircle, Clock, Bookmark, Info, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotificationDropdown = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useLibrary();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userNotifications = notifications.filter(
    (n) => n.userId === user?.id || (user?.role === 'admin' && n.userId === 'adm_0012')
  );
  const unreadCount = userNotifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'overdue':
        return <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />;
      case 'due_date':
        return <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />;
      case 'reservation':
        return <Bookmark className="w-4 h-4 text-brand-600 flex-shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-slate-500 flex-shrink-0" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-dropdown border border-slate-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-800">Notifications</h4>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-50 text-brand-700 rounded-full border border-brand-200">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-[11px] font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {userNotifications.length > 0 ? (
              userNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`p-3.5 hover:bg-slate-50/80 transition-colors cursor-pointer flex gap-3 ${
                    !notif.read ? 'bg-brand-50/20' : ''
                  }`}
                >
                  <div className="mt-0.5">{getIcon(notif.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-900">{notif.title}</p>
                      <span className="text-[10px] text-slate-400 font-medium">{notif.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-snug">{notif.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">No notifications available.</div>
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
            <Link
              to={user?.role === 'admin' ? '/admin/activity' : '/student/notifications'}
              onClick={() => setIsOpen(false)}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1 py-1"
            >
              View all notification history
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
