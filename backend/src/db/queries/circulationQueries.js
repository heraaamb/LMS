export const circulationQueries = {
  createIssue: `
    INSERT INTO issue_records (id, book_id, student_id, issue_date, due_date, status, issued_by)
    VALUES ($1, $2, $3, $4, $5, 'issued', $6)
    RETURNING *;
  `,
  processReturn: `
    UPDATE issue_records
    SET status = 'returned', return_date = CURRENT_DATE
    WHERE id = $1
    RETURNING *;
  `,
  getActiveIssuesByStudent: `
    SELECT i.*, b.title as book_title, b.isbn, b.cover_image
    FROM issue_records i
    JOIN books b ON i.book_id = b.id
    WHERE i.student_id = $1 AND i.status != 'returned';
  `,
  getAllIssues: `
    SELECT i.*, b.title as book_title, b.isbn, u.name as student_name, u.email as student_email
    FROM issue_records i
    JOIN books b ON i.book_id = b.id
    JOIN users u ON i.student_id = u.id
    ORDER BY i.issue_date DESC;
  `,
};
