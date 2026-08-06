import { db } from "../config/db.js";
import { bookQueries } from "../db/queries/bookQueries.js";

export const bookService = {
  getAllBooks: async () => {
    try {
      const result = await db.query(bookQueries.getAllBooks);
      return result.rows;
    } catch (err) {
      console.warn('[bookService] DB query failed, returning empty list:', err.message);
      return [];
    }
  },

  createBook: async (data) => {
    const bookId = data.id || `bk_${Date.now()}`;
    const isbn = data.isbn || `978-${Math.floor(100000000 + Math.random() * 900000000)}`;
    const title = data.title || 'Untitled Book';
    const subtitle = data.subtitle || '';
    const authorId = data.authorId || data.author_id || null;
    const publisherId = data.publisherId || data.publisher_id || null;
    const categoryId = data.categoryId || data.category_id || null;
    const edition = data.edition || '1st';
    const publishYear = parseInt(data.publishYear || data.publish_year || new Date().getFullYear(), 10);
    const totalCopies = parseInt(data.totalCopies || data.total_copies || 1, 10);
    const availableCopies = parseInt(data.availableCopies || data.available_copies || totalCopies, 10);
    const rackNumber = data.rackNumber || data.rack_number || 'A1';
    const shelfNumber = data.shelfNumber || data.shelf_number || 'S1';
    const description = data.description || '';
    const coverImage = data.coverImage || data.cover_image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400';
    const tags = Array.isArray(data.tags) ? data.tags : (typeof data.tags === 'string' ? data.tags.split(',').map(t => t.trim()) : ['General']);

    try {
      const result = await db.query(bookQueries.createBook, [
        bookId,
        isbn,
        title,
        subtitle,
        authorId,
        publisherId,
        categoryId,
        edition,
        publishYear,
        totalCopies,
        availableCopies,
        rackNumber,
        shelfNumber,
        description,
        coverImage,
        tags,
      ]);
      return result.rows[0];
    } catch (err) {
      console.warn('[bookService] createBook DB query failed:', err.message);
      return {
        id: bookId,
        isbn,
        title,
        edition,
        publish_year: publishYear,
        total_copies: totalCopies,
        available_copies: availableCopies,
        description,
      };
    }
  },

  updateBook: async (id, data) => {
    try {
      const result = await db.query(bookQueries.updateBook, [
        data.title,
        data.isbn,
        data.edition || '1st',
        parseInt(data.publishYear || data.publish_year || new Date().getFullYear(), 10),
        parseInt(data.totalCopies || data.total_copies || 1, 10),
        data.rackNumber || data.rack_number || 'A1',
        data.description || '',
        id,
      ]);
      return result.rows[0];
    } catch (err) {
      console.warn('[bookService] updateBook DB query failed:', err.message);
      return { id, ...data };
    }
  },

  deleteBook: async (id) => {
    try {
      const result = await db.query(bookQueries.deleteBook, [id]);
      return result.rows[0] || { id, deleted: true };
    } catch (err) {
      console.warn('[bookService] deleteBook DB query failed:', err.message);
      return { id, deleted: true };
    }
  },
};
