import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { DollarSign, CheckCircle2, ShieldOff } from 'lucide-react';

export const AdminFinesPage = () => {
  const { fines, payFine, waiveFine } = useLibrary();

  const totalCollected = fines.filter((f) => f.status === 'paid').reduce((s, f) => s + f.amount, 0);
  const totalUnpaid = fines.filter((f) => f.status === 'unpaid').reduce((s, f) => s + f.amount, 0);

  const columns = [
    { header: 'Student Name', key: 'studentName', sortable: true },
    { header: 'Book Item', key: 'bookTitle' },
    {
      header: 'Penalty Fee',
      key: 'amount',
      render: (i) => <span className="font-bold text-slate-900">${i.amount.toFixed(2)}</span>,
    },
    { header: 'Reason', key: 'reason', render: (i) => <span className="capitalize">{i.reason}</span> },
    {
      header: 'Status',
      key: 'status',
      render: (i) => (
        <Badge variant={i.status === 'unpaid' ? 'danger' : i.status === 'paid' ? 'success' : 'default'}>
          {i.status.toUpperCase()}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (i) =>
        i.status === 'unpaid' ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => payFine(i.id)}
              className="px-2.5 py-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-xs"
            >
              Mark Paid
            </button>
            <button
              onClick={() => waiveFine(i.id)}
              className="px-2.5 py-1 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md border border-slate-200"
            >
              Waive
            </button>
          </div>
        ) : (
          <span className="text-xs text-slate-400 font-medium">Cleared</span>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Fine Collection Management</h1>
          <p className="text-xs text-slate-500 mt-1">Audit accrued overdue fees, record payments, and process waivers.</p>
        </div>

        <div className="flex gap-3">
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Collected</span>
            <span className="text-lg font-bold text-emerald-600">${totalCollected.toFixed(2)}</span>
          </div>
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Outstanding Unpaid</span>
            <span className="text-lg font-bold text-rose-600">${totalUnpaid.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={fines}
        searchPlaceholder="Search fine records by student or book title..."
        searchField="studentName"
      />
    </div>
  );
};
