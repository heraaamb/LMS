import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/ui/Badge';
import { Mail, ShieldCheck, Building2, Calendar } from 'lucide-react';

export const AdminProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Librarian Account Profile</h1>
        <p className="text-xs text-slate-500 mt-1">Administrator privileges, central library ops role, and credentials.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-slate-200 shadow-xs"
          />
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
              <Badge variant="brand">Super Administrator</Badge>
            </div>
            <p className="text-xs font-medium text-slate-500">{user?.department}</p>
            <p className="text-xs text-slate-600">Chief Officer • Operations Unit 01</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">Contact & Account</span>
            <div className="flex items-center gap-2 text-slate-700">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Full System Admin Permissions</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">Operations Service</span>
            <div className="flex items-center gap-2 text-slate-700">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>University Central Library HQ</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Joined: March 2018</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
