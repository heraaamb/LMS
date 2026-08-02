import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { useAuth } from '../../context/AuthContext';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Clock, XCircle } from 'lucide-react';

export const ReservationsPage = () => {
  const { reservations, updateReservationStatus } = useLibrary();
  const { user } = useAuth();

  const myReservations = reservations.filter(
    (r) => (r.studentId === user?.id || r.studentId === 'std_1084')
  );

  const columns = [
    {
      header: 'Reserved Book',
      key: 'bookTitle',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <img src={item.coverImage} alt={item.bookTitle} className="w-8 h-11 object-cover rounded shadow-xs" />
          <div>
            <span className="font-semibold text-slate-900 block">{item.bookTitle}</span>
            <span className="text-xs text-slate-400">Request Date: {item.requestDate}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Queue Position',
      key: 'queuePosition',
      render: (item) => (
        <span className="font-bold text-slate-900 text-xs px-2 py-1 rounded bg-slate-100 border border-slate-200">
          Position #{item.queuePosition}
        </span>
      ),
    },
    { header: 'Expires At', key: 'expiresAt', sortable: true },
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
      header: 'Action',
      key: 'action',
      render: (item) =>
        item.status === 'pending' || item.status === 'approved' ? (
          <button
            onClick={() => updateReservationStatus(item.id, 'cancelled')}
            className="px-2.5 py-1 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md transition-colors flex items-center gap-1"
          >
            <XCircle className="w-3 h-3" />
            Cancel Hold
          </button>
        ) : null,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Book Hold Reservations</h1>
        <p className="text-xs text-slate-500 mt-1">Track queue status for high-demand literature and cancel active holds.</p>
      </div>

      <DataTable
        columns={columns}
        data={myReservations}
        searchPlaceholder="Search my reservations..."
        searchField="bookTitle"
      />
    </div>
  );
};
