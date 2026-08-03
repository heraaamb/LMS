import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { useAuth } from '../../context/AuthContext';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { CreditCard, CheckCircle2, DollarSign, ShieldAlert } from 'lucide-react';

export const StudentFinesPage = () => {
  const { fines, payFine } = useLibrary();
  const { user } = useAuth();
  const [selectedFine, setSelectedFine] = useState(null);

  const myFines = fines.filter(
    (f) => f.studentId === user?.id || f.studentId === 'std_1084'
  );

  const totalUnpaid = myFines
    .filter((f) => f.status === 'unpaid')
    .reduce((sum, f) => sum + f.amount, 0);

  const handlePayClick = (fine) => {
    setSelectedFine(fine);
  };

  const handleConfirmPayment = () => {
    if (selectedFine) {
      payFine(selectedFine.id);
      setSelectedFine(null);
    }
  };

  const columns = [
    { header: 'Book Title', key: 'bookTitle', sortable: true },
    { header: 'Reason', key: 'reason', render: (item) => <span className="capitalize">{item.reason} fee</span> },
    {
      header: 'Amount',
      key: 'amount',
      render: (item) => <span className="font-bold text-slate-900">${item.amount.toFixed(2)}</span>,
    },
    { header: 'Accrual Date', key: 'dueDate', sortable: true },
    {
      header: 'Status',
      key: 'status',
      render: (item) => (
        <Badge variant={item.status === 'unpaid' ? 'danger' : item.status === 'paid' ? 'success' : 'default'}>
          {item.status.toUpperCase()}
        </Badge>
      ),
    },
    {
      header: 'Action',
      key: 'action',
      render: (item) =>
        item.status === 'unpaid' ? (
          <button
            onClick={() => handlePayClick(item)}
            className="px-3 py-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-xs transition-colors"
          >
            Pay Now
          </button>
        ) : (
          <span className="text-xs text-slate-400 font-medium">Cleared</span>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Fine History & Payments</h1>
          <p className="text-xs text-slate-500 mt-1">Itemized record of overdue penalties and library fee clearances.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 px-5 py-3 rounded-xl text-right">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Unpaid Fine</span>
          <span className="text-2xl font-extrabold text-rose-600">${totalUnpaid.toFixed(2)}</span>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={myFines}
        searchPlaceholder="Search fines..."
        searchField="bookTitle"
      />

      {/* Payment Confirmation Modal */}
      <Modal
        isOpen={!!selectedFine}
        onClose={() => setSelectedFine(null)}
        title="Simulated Online Payment"
      >
        {selectedFine && (
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Book Item:</span>
                <span className="font-semibold text-slate-900">{selectedFine.bookTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Penalty Fee:</span>
                <span className="font-bold text-rose-600">${selectedFine.amount.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              This will charge your student campus wallet card balance and immediately mark the library fine as cleared.
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedFine(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs flex items-center gap-1.5"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Confirm Payment</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
