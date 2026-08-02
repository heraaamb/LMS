import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { useAuth } from '../../context/AuthContext';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { BookmarkCheck, Clock, RefreshCw } from 'lucide-react';

export const IssuedBooksPage = () => {
  const { issues, showToast } = useLibrary();
  const { user } = useAuth();

  const myIssued = issues.filter(
    (i) => (i.studentId === user?.id || i.studentId === 'std_1084') && i.status !== 'returned'
  );

  const columns = [
    {
      header: 'Book Details',
      key: 'bookTitle',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <img src={item.coverImage} alt={item.bookTitle} className="w-8 h-11 object-cover rounded shadow-xs" />
          <div>
            <span className="font-semibold text-slate-900 block">{item.bookTitle}</span>
            <span className="text-xs text-slate-400 font-mono">ISBN: {item.isbn}</span>
          </div>
        </div>
      ),
    },
    { header: 'Issue Date', key: 'issueDate', sortable: true },
    { header: 'Due Date', key: 'dueDate', sortable: true },
    {
      header: 'Loan Status',
      key: 'status',
      render: (item) => (
        <Badge variant={item.status === 'overdue' ? 'danger' : 'brand'}>
          {item.status === 'overdue' ? 'Overdue' : 'On Loan'}
        </Badge>
      ),
    },
    {
      header: 'Accrued Fine',
      key: 'fineAmount',
      render: (item) => (
        <span className={`font-semibold ${item.fineAmount > 0 ? 'text-rose-600' : 'text-slate-600'}`}>
          ${item.fineAmount.toFixed(2)}
        </span>
      ),
    },
    {
      header: 'Renewal Request',
      key: 'renew',
      render: (item) => (
        <button
          onClick={() => showToast(`Renewal request for "${item.bookTitle}" sent to librarian approval queue.`)}
          className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md transition-colors flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" />
          Request Renewal
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Currently Issued Books</h1>
        <p className="text-xs text-slate-500 mt-1">Track active loans, return deadlines, and request loan renewals.</p>
      </div>

      <DataTable
        columns={columns}
        data={myIssued}
        searchPlaceholder="Search issued books..."
        searchField="bookTitle"
      />
    </div>
  );
};
