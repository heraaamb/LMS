import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Link } from 'react-router-dom';
import { Users, Eye } from 'lucide-react';

export const ManageStudentsPage = () => {
  const { students } = useLibrary();

  const columns = [
    {
      header: 'Student Profile',
      key: 'name',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
          <div>
            <Link to={`/admin/students/${item.id}`} className="font-bold text-slate-900 hover:text-brand-600">
              {item.name}
            </Link>
            <span className="text-xs text-slate-400 block font-mono">{item.studentId}</span>
          </div>
        </div>
      ),
    },
    { header: 'Department', key: 'department', sortable: true },
    { header: 'Year', key: 'year' },
    {
      header: 'Active Loans',
      key: 'activeIssuesCount',
      render: (item) => <span className="font-bold text-slate-800">{item.activeIssuesCount} books</span>,
    },
    {
      header: 'Fines Balance',
      key: 'totalFinesAmount',
      render: (item) => (
        <span className={`font-bold ${item.totalFinesAmount > 0 ? 'text-rose-600' : 'text-slate-600'}`}>
          ${item.totalFinesAmount.toFixed(2)}
        </span>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      render: (item) => (
        <Badge variant={item.status === 'active' ? 'success' : 'danger'}>
          {item.status.toUpperCase()}
        </Badge>
      ),
    },
    {
      header: 'Detail View',
      key: 'action',
      render: (item) => (
        <Link
          to={`/admin/students/${item.id}`}
          className="px-2.5 py-1 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-md border border-brand-200 inline-flex items-center gap-1"
        >
          <Eye className="w-3.5 h-3.5" />
          View Profile
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Directory & Accounts</h1>
        <p className="text-xs text-slate-500 mt-1">Manage enrolled student rosters, check loan records, and inspect account statuses.</p>
      </div>

      <DataTable
        columns={columns}
        data={students}
        searchPlaceholder="Search students by name, ID, or department..."
        searchField="name"
      />
    </div>
  );
};
