import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { BookDown, CheckCircle2 } from 'lucide-react';

export const ReturnBookPage = () => {
  const { issues, processReturn } = useLibrary();

  const activeIssues = issues.filter((i) => i.status !== 'returned');

  const columns = [
    {
      header: 'Issued Book',
      key: 'bookTitle',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <img src={item.coverImage} alt={item.bookTitle} className="w-8 h-11 object-cover rounded shadow-xs" />
          <div>
            <span className="font-bold text-slate-900 block">{item.bookTitle}</span>
            <span className="text-xs text-slate-400 font-mono">ISBN: {item.isbn}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Student',
      key: 'studentName',
      sortable: true,
      render: (item) => (
        <div>
          <span className="font-semibold text-slate-900 block">{item.studentName}</span>
          <span className="text-xs text-slate-500">{item.studentEmail}</span>
        </div>
      ),
    },
    { header: 'Issue Date', key: 'issueDate', sortable: true },
    { header: 'Due Date', key: 'dueDate', sortable: true },
    {
      header: 'Status',
      key: 'status',
      render: (item) => (
        <Badge variant={item.status === 'overdue' ? 'danger' : 'brand'}>
          {item.status === 'overdue' ? 'Overdue' : 'On Loan'}
        </Badge>
      ),
    },
    {
      header: 'Process Action',
      key: 'action',
      render: (item) => (
        <button
          onClick={() => processReturn(item.id)}
          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-1"
        >
          <BookDown className="w-3.5 h-3.5" />
          <span>Mark Returned</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Circulation Desk: Process Book Return</h1>
        <p className="text-xs text-slate-500 mt-1">Accept returned copies, restore available inventory, and clear student loan limits.</p>
      </div>

      <DataTable
        columns={columns}
        data={activeIssues}
        searchPlaceholder="Search active loans by book title or student name..."
        searchField="bookTitle"
      />
    </div>
  );
};
