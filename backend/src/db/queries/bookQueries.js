export const bookQueries = {
  getAllBooks: `
    SELECT b.*, c.name as category_name, a.name as author_name, p.name as publisher_name 
    FROM books b
    LEFT JOIN categories c ON b.category_id = c.id
    LEFT JOIN authors a ON b.author_id = a.id
    LEFT JOIN publishers p ON b.publisher_id = p.id
    ORDER BY b.created_at DESC;
  `,
  getBookById: `SELECT * FROM books WHERE id = $1;`,
  createBook: `
    INSERT INTO books (id, isbn, title, subtitle, author_id, publisher_id, category_id, edition, publish_year, total_copies, available_copies, rack_number, shelf_number, description, cover_image, tags)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $10, $11, $12, $13, $14, $15)
    RETURNING *;
  `,
  updateBook: `
    UPDATE books 
    SET title = $1, isbn = $2, edition = $3, publish_year = $4, total_copies = $5, rack_number = $6, description = $7
    WHERE id = $8
    RETURNING *;
  `,
  deleteBook: `DELETE FROM books WHERE id = $1;`,
};
