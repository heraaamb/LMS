import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { BookFormModal } from '../../components/books/BookFormModal';
import { Plus, Edit2, Trash2, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ManageBooksPage = () => {
  const { books, deleteBook } = useLibrary();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const columns = [
    {
      header: 'Book Inventory Item',
      key: 'title',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <img src={item.coverImage} alt={item.title} className="w-8 h-11 object-cover rounded shadow-xs" />
          <div>
            <span className="font-bold text-slate-900 block">{item.title}</span>
            <span className="text-xs text-slate-500">{item.author} • ISBN: <span className="font-mono">{item.isbn}</span></span>
          </div>
        </div>
      ),
    },
    { header: 'Category', key: 'category', sortable: true },
    {
      header: 'Rack Location',
      key: 'rackNumber',
      render: (item) => <span className="font-mono text-xs text-slate-700">{item.rackNumber}</span>,
    },
    {
      header: 'Total / Avail',
      key: 'totalCopies',
      render: (item) => (
        <Badge variant={item.availableCopies > 0 ? 'success' : 'danger'}>
          {item.availableCopies} avail / {item.totalCopies} total
        </Badge>
      ),
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(item)}
            className="p-1.5 text-slate-600 hover:text-brand-600 hover:bg-slate-100 rounded-md transition-colors"
            title="Edit record"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteBook(item.id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
            title="Delete book"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Book Inventory Management</h1>
          <p className="text-xs text-slate-500 mt-1">Catalog indexing, copy status tracking, rack location updates.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Book</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={books}
        searchPlaceholder="Search catalog by title, author, or ISBN..."
        searchField="title"
      />

      <BookFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingBook}
      />
    </div>
  );
};
