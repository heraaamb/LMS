import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { DataTable } from '../../components/ui/DataTable';
import { Modal } from '../../components/ui/Modal';
import { Plus, ExternalLink } from 'lucide-react';

export const PublishersPage = () => {
  const { publishers } = useLibrary();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { header: 'Publisher Name', key: 'name', sortable: true },
    { header: 'Headquarters', key: 'location' },
    {
      header: 'Website',
      key: 'website',
      render: (i) => (
        <a href={i.website} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline flex items-center gap-1">
          <span>{i.name.toLowerCase().replace(/\s+/g, '')}.com</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      ),
    },
    { header: 'Titles in Catalog', key: 'bookCount', render: (i) => <span className="font-bold text-slate-900">{i.bookCount}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Publishers Registry</h1>
          <p className="text-xs text-slate-500 mt-1">Manage publishing houses, distribution partners, and catalog counts.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Publisher</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={publishers}
        searchPlaceholder="Search publishers..."
        searchField="name"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Publisher Record"
      >
        <div className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Publisher Name *</label>
            <input
              type="text"
              placeholder="e.g. MIT Press"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Headquarters Location</label>
            <input
              type="text"
              placeholder="Cambridge, MA"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
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
              Save Publisher
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
