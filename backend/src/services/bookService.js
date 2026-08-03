import { db } from "../config/db.js";
import { bookQueries } from "../db/queries/bookQueries.js";

export const bookService = {
  getAllBooks: async () => {
    const result = await db.query(bookQueries.getAllBooks);
    return result.rows;
  },
  createBook: async (data) => {
    const result = await db.query(bookQueries.createBook, [
      data.id,
      data.isbn,
      data.title,
      data.author_id,
      data.publisher_id,
      data.category_id,
      data.edition,
      data.publish_year,
      data.total_copies,
      data.available_copies,
      data.rack_number,
      data.shelf_number,
      data.description,
      data.cover_image,
      data.rating,
      data.tags,
      data.pages,
      data.language,
    ]);
    return result.rows[0];
  },
  updateBook: async (id, data) => {
    const result = await db.query(bookQueries.updateBook, [
      data.title,
      data.isbn,
      data.edition,
      data.publish_year,
      data.total_copies,
      data.rack_number,
      data.description,
      id,
    ]);
    return result.rows[0];
  },
  deleteBook: async (id) => {
    const result = await db.query(bookQueries.deleteBook, [id]);
    return result.rows[0];
  },
};
