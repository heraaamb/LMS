import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { useAuth } from '../../context/AuthContext';
import { Bell, CheckCheck, Clock, AlertCircle, Bookmark, Info } from 'lucide-react';

export const StudentNotificationsPage = () => {
  const { notifications, markAllNotificationsRead } = useLibrary();
  const { user } = useAuth();

  const myNotifs = notifications.filter(
    (n) => n.userId === user?.id || n.userId === 'std_1084'
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Notifications Center</h1>
          <p className="text-xs text-slate-500 mt-1">System reminders regarding due dates, fines, and book hold availability.</p>
        </div>
        <button
          onClick={markAllNotificationsRead}
          className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
        >
          <CheckCheck className="w-4 h-4 text-brand-600" />
          <span>Mark All Read</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs divide-y divide-slate-100">
        {myNotifs.length > 0 ? (
          myNotifs.map((n) => (
            <div key={n.id} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-600 mt-0.5">
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{n.title}</h3>
                  <span className="text-xs text-slate-400 font-medium">{n.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-xs text-slate-400">No notifications found.</div>
        )}
      </div>
    </div>
  );
};
