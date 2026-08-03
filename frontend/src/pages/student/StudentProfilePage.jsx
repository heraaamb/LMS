import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/ui/Badge';
import { User, Mail, Phone, GraduationCap, Calendar, ShieldCheck, BookmarkCheck } from 'lucide-react';

export const StudentProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Account Profile</h1>
        <p className="text-xs text-slate-500 mt-1">Personal information, institutional identification, and library borrowing privileges.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-slate-200 shadow-xs"
          />
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
              <Badge variant="success">Active Account</Badge>
            </div>
            <p className="text-xs font-medium text-slate-500">{user?.department}</p>
            <p className="text-xs font-mono text-slate-600">Student Roll No: {user?.studentId}</p>
          </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">Contact Details</h3>
            <div className="flex items-center gap-2.5 text-slate-700">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{user?.phone || '+1 (555) 349-2041'}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">Academic Status</h3>
            <div className="flex items-center gap-2.5 text-slate-700">
              <GraduationCap className="w-4 h-4 text-slate-400" />
              <span>{user?.year || '3rd Year (Senior)'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Enrolled: {user?.joinedDate || 'September 2023'}</span>
            </div>
          </div>
        </div>

        {/* Library Limits */}
        <div className="p-4 rounded-xl bg-brand-50/60 border border-brand-100 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <BookmarkCheck className="w-5 h-5 text-brand-600" />
            <div>
              <p className="font-bold text-slate-900">Borrowing Capacity Limit</p>
              <p className="text-xs text-slate-500">Maximum concurrent active loans permitted by Library Board.</p>
            </div>
          </div>
          <span className="font-bold text-brand-700 text-base">{user?.maxAllowedBooks || 5} Books</span>
        </div>
      </div>
    </div>
  );
};
