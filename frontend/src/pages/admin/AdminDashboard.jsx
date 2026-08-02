import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/ui/StatCard';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  BookmarkCheck,
  AlertTriangle,
  CreditCard,
  Plus,
  BookUp,
  BookDown,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const AdminDashboard = () => {
  const { books, issues, reservations, fines, analytics, activityLogs } = useLibrary();
  const { user } = useAuth();

  const totalBooksCount = books.reduce((acc, b) => acc + b.totalCopies, 0);
  const activeIssues = issues.filter((i) => i.status === 'issued');
  const overdueIssues = issues.filter((i) => i.status === 'overdue');
  const pendingHoldCount = reservations.filter((r) => r.status === 'pending').length;

  const recentActivity = activityLogs.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header & Quick Actions */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-600 font-semibold text-xs mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Librarian Administration Console</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Central Library Command Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">Real-time inventory overview, circulation metrics, and operational audit trail.</p>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <Link
            to="/admin/books/new"
            className="px-3.5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Book</span>
          </Link>
          <Link
            to="/admin/issue"
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <BookUp className="w-4 h-4" />
            <span>Issue Book</span>
          </Link>
          <Link
            to="/admin/returns"
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5"
          >
            <BookDown className="w-4 h-4" />
            <span>Process Return</span>
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Catalog Copies"
          value={totalBooksCount.toLocaleString()}
          change="+140 this month"
          changeType="positive"
          icon={BookOpen}
        />
        <StatCard
          title="Active Loans"
          value={activeIssues.length}
          change="84% utilization"
          changeType="positive"
          icon={BookmarkCheck}
        />
        <StatCard
          title="Overdue Items"
          value={overdueIssues.length}
          change={overdueIssues.length > 0 ? 'Urgent notice' : 'None'}
          changeType={overdueIssues.length > 0 ? 'negative' : 'positive'}
          icon={AlertTriangle}
        />
        <StatCard
          title="Pending Reservations"
          value={pendingHoldCount}
          description="Clearance queue"
          icon={CreditCard}
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Borrowing Trends Recharts Area Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Monthly Circulation Velocity
              </h2>
              <p className="text-xs text-slate-500">Comparison of book borrowings vs returns across current year</p>
            </div>
            <span className="text-xs font-semibold text-brand-600 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +14.2% YoY
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.monthlyBorrowings} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBorrow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0c8de9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0c8de9" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorReturn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="borrowings" stroke="#0c8de9" strokeWidth={2} fillOpacity={1} fill="url(#colorBorrow)" name="Borrowings" />
                <Area type="monotone" dataKey="returns" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorReturn)" name="Returns" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Pie Chart */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="mb-4 pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Category Distribution
            </h2>
            <p className="text-xs text-slate-500">Catalog share by major faculty discipline</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {analytics.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 text-xs mt-2">
            {analytics.categoryDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Audit Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              System Operations Audit Trail
            </h2>
            <p className="text-xs text-slate-500">Real-time log of book issues, returns, and administrative transactions</p>
          </div>
          <Link
            to="/admin/activity"
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            Full Audit Logs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {recentActivity.map((log) => (
            <div key={log.id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <Badge variant={log.actorRole === 'admin' ? 'brand' : 'default'}>
                  {log.action}
                </Badge>
                <div>
                  <p className="font-semibold text-slate-900">{log.target}</p>
                  <p className="text-slate-500 text-[11px]">{log.details}</p>
                </div>
              </div>
              <div className="text-right text-slate-400 font-mono text-[11px]">
                {log.timestamp} • By {log.actor}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
