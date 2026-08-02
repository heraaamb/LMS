import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { useLibrary } from '../../context/LibraryContext';

export const BookFormModal = ({ isOpen, onClose, initialData = null }) => {
  const { addBook, updateBook, categories, authors, publishers } = useLibrary();

  const [formData, setFormData] = useState({
    title: '',
    isbn: '',
    author: '',
    publisher: '',
    category: '',
    totalCopies: 1,
    rackNumber: 'RACK-A-01',
    shelfNumber: 'SHELF-01',
    publishYear: new Date().getFullYear(),
    edition: '1st Edition',
    description: '',
    coverImage: '',
    tags: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        isbn: initialData.isbn || '',
        author: initialData.author || '',
        publisher: initialData.publisher || '',
        category: initialData.category || '',
        totalCopies: initialData.totalCopies || 1,
        rackNumber: initialData.rackNumber || 'RACK-A-01',
        shelfNumber: initialData.shelfNumber || 'SHELF-01',
        publishYear: initialData.publishYear || new Date().getFullYear(),
        edition: initialData.edition || '1st Edition',
        description: initialData.description || '',
        coverImage: initialData.coverImage || '',
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : '',
      });
    } else {
      setFormData({
        title: '',
        isbn: '',
        author: authors[0]?.name || '',
        publisher: publishers[0]?.name || '',
        category: categories[0]?.name || '',
        totalCopies: 1,
        rackNumber: 'RACK-A-01',
        shelfNumber: 'SHELF-01',
        publishYear: new Date().getFullYear(),
        edition: '1st Edition',
        description: '',
        coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
        tags: 'General',
      });
    }
  }, [initialData, isOpen, categories, authors, publishers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      updateBook(initialData.id, formData);
    } else {
      addBook(formData);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Book Record' : 'Add New Book to Inventory'}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Book Title *</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Clean Code"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none text-slate-900"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">ISBN Number *</label>
            <input
              type="text"
              name="isbn"
              required
              value={formData.isbn}
              onChange={handleChange}
              placeholder="978-0132350884"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none font-mono text-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Category *</label>
            {categories.length > 0 ? (
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white text-slate-900"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                placeholder="Category name"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none text-slate-900"
              />
            )}
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Author *</label>
            {authors.length > 0 ? (
              <select
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white text-slate-900"
              >
                <option value="">Select Author</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name="author"
                required
                value={formData.author}
                onChange={handleChange}
                placeholder="Author name"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none text-slate-900"
              />
            )}
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Publisher *</label>
            {publishers.length > 0 ? (
              <select
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white text-slate-900"
              >
                <option value="">Select Publisher</option>
                {publishers.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name="publisher"
                required
                value={formData.publisher}
                onChange={handleChange}
                placeholder="Publisher name"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none text-slate-900"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Total Copies</label>
            <input
              type="number"
              name="totalCopies"
              min="1"
              value={formData.totalCopies}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none text-slate-900"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Rack Location</label>
            <input
              type="text"
              name="rackNumber"
              value={formData.rackNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none text-slate-900"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Publish Year</label>
            <input
              type="number"
              name="publishYear"
              value={formData.publishYear}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none text-slate-900"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Edition</label>
            <input
              type="text"
              name="edition"
              value={formData.edition}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Cover Image URL</label>
          <input
            type="url"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none text-slate-900"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Synopsis / Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed book description..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none text-slate-900"
          ></textarea>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors shadow-xs"
          >
            {initialData ? 'Save Changes' : 'Create Book Record'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
