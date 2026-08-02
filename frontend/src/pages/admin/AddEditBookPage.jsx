import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLibrary } from '../../context/LibraryContext';
import { ArrowLeft, Save } from 'lucide-react';

export const AddEditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, addBook, updateBook, categories, authors, publishers } = useLibrary();

  const isEdit = Boolean(id);
  const existingBook = isEdit ? books.find((b) => b.id === id) : null;

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
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
    tags: 'General',
  });

  useEffect(() => {
    if (existingBook) {
      setFormData({
        title: existingBook.title || '',
        isbn: existingBook.isbn || '',
        author: existingBook.author || '',
        publisher: existingBook.publisher || '',
        category: existingBook.category || '',
        totalCopies: existingBook.totalCopies || 1,
        rackNumber: existingBook.rackNumber || 'RACK-A-01',
        shelfNumber: existingBook.shelfNumber || 'SHELF-01',
        publishYear: existingBook.publishYear || new Date().getFullYear(),
        edition: existingBook.edition || '1st Edition',
        description: existingBook.description || '',
        coverImage: existingBook.coverImage || '',
        tags: Array.isArray(existingBook.tags) ? existingBook.tags.join(', ') : '',
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        category: prev.category || categories[0]?.name || '',
        author: prev.author || authors[0]?.name || '',
        publisher: prev.publisher || publishers[0]?.name || '',
      }));
    }
  }, [existingBook, categories, authors, publishers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit && id) {
      updateBook(id, formData);
    } else {
      addBook(formData);
    }
    navigate('/admin/books');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <Link
          to="/admin/books"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Book Inventory
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {isEdit ? `Edit Book: ${formData.title}` : 'Add New Book Record'}
        </h1>
        <p className="text-xs text-slate-500 mt-1">Fill out full catalog specifications and rack placement details.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Book Title *</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Clean Code"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">ISBN Identifier *</label>
            <input
              type="text"
              name="isbn"
              required
              value={formData.isbn}
              onChange={handleChange}
              placeholder="978-0132350884"
              className="w-full px-3 py-2 text-xs sm:text-sm font-mono border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
            {categories.length > 0 ? (
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
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
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Author *</label>
            {authors.length > 0 ? (
              <select
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
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
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Publisher *</label>
            {publishers.length > 0 ? (
              <select
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
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
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Total Copies</label>
            <input
              type="number"
              name="totalCopies"
              min="1"
              value={formData.totalCopies}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Rack Location</label>
            <input
              type="text"
              name="rackNumber"
              value={formData.rackNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Publish Year</label>
            <input
              type="number"
              name="publishYear"
              value={formData.publishYear}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Edition</label>
            <input
              type="text"
              name="edition"
              value={formData.edition}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Cover Image URL</label>
          <input
            type="url"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Synopsis & Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed book description..."
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
          ></textarea>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate('/admin/books')}
            className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>{isEdit ? 'Update Record' : 'Save New Book'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
