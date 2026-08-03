import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { DataTable } from '../../components/ui/DataTable';
import { Modal } from '../../components/ui/Modal';
import { Plus, UserCheck } from 'lucide-react';

export const AuthorsPage = () => {
  const { authors } = useLibrary();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { header: 'Author Name', key: 'name', sortable: true },
    { header: 'Nationality', key: 'nationality' },
    { header: 'Biography', key: 'biography' },
    { header: 'Books in Library', key: 'bookCount', render: (i) => <span className="font-bold text-slate-900">{i.bookCount}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Authors Directory</h1>
          <p className="text-xs text-slate-500 mt-1">Manage author records, biographical metadata, and publication counts.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Author</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={authors}
        searchPlaceholder="Search authors..."
        searchField="name"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Author Record"
      >
        <div className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Author Name *</label>
            <input
              type="text"
              placeholder="e.g. Donald E. Knuth"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Biography</label>
            <textarea
              rows="3"
              placeholder="Biographical notes..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
            ></textarea>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 rounded-lg shadow-xs"
            >
              Save Author
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
