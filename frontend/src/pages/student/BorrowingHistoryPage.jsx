import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { useAuth } from '../../context/AuthContext';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { History, CheckCircle2 } from 'lucide-react';

export const BorrowingHistoryPage = () => {
  const { issues } = useLibrary();
  const { user } = useAuth();

  const history = issues.filter(
    (i) => (i.studentId === user?.id || i.studentId === 'std_1084') && i.status === 'returned'
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
    { header: 'Returned Date', key: 'returnDate', sortable: true },
    {
      header: 'Audit Status',
      key: 'status',
      render: () => (
        <Badge variant="success">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          Returned & Cleared
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Borrowing History</h1>
        <p className="text-xs text-slate-500 mt-1">Complete historical archive of all your returned books and transactions.</p>
      </div>

      <DataTable
        columns={columns}
        data={history}
        searchPlaceholder="Search borrowing history..."
        searchField="bookTitle"
      />
    </div>
  );
};
