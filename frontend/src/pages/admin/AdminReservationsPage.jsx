import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Check, X, Clock } from 'lucide-react';

export const AdminReservationsPage = () => {
  const { reservations, updateReservationStatus } = useLibrary();

  const columns = [
    {
      header: 'Requested Book Title',
      key: 'bookTitle',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <img src={item.coverImage} alt={item.bookTitle} className="w-8 h-11 object-cover rounded shadow-xs" />
          <div>
            <span className="font-bold text-slate-900 block">{item.bookTitle}</span>
            <span className="text-xs text-slate-400">Request Date: {item.requestDate}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Student Name',
      key: 'studentName',
      sortable: true,
      render: (item) => (
        <div>
          <span className="font-semibold text-slate-900 block">{item.studentName}</span>
          <span className="text-xs text-slate-500">{item.studentEmail}</span>
        </div>
      ),
    },
    {
      header: 'Queue Position',
      key: 'queuePosition',
      render: (item) => <span className="font-mono text-xs font-bold text-slate-800">#{item.queuePosition}</span>,
    },
    {
      header: 'Status',
      key: 'status',
      render: (item) => {
        const variants = {
          pending: 'warning',
          approved: 'success',
          rejected: 'danger',
          cancelled: 'default',
        };
        return <Badge variant={variants[item.status] || 'default'}>{item.status.toUpperCase()}</Badge>;
      },
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (item) =>
        item.status === 'pending' ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateReservationStatus(item.id, 'approved')}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-md shadow-xs flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              Approve
            </button>
            <button
              onClick={() => updateReservationStatus(item.id, 'rejected')}
              className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-xs rounded-md border border-rose-200 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Reject
            </button>
          </div>
        ) : (
          <span className="text-xs text-slate-400 font-medium">Processed</span>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reservation Hold Requests</h1>
        <p className="text-xs text-slate-500 mt-1">Review student hold requests, check queue priorities, and approve holds.</p>
      </div>

      <DataTable
        columns={columns}
        data={reservations}
        searchPlaceholder="Search reservation requests..."
        searchField="bookTitle"
      />
    </div>
  );
};
