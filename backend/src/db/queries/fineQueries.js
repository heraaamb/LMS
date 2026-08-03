export const fineQueries = {
  getAllFines: `
    SELECT f.*, u.name as student_name, b.title as book_title
    FROM fines f
    JOIN users u ON f.student_id = u.id
    JOIN issue_records i ON f.issue_id = i.id
    JOIN books b ON i.book_id = b.id
    ORDER BY f.due_date DESC;
  `,
  payFine: `UPDATE fines SET status = 'paid', paid_date = CURRENT_DATE WHERE id = $1 RETURNING *;`,
  waiveFine: `UPDATE fines SET status = 'waived' WHERE id = $1 RETURNING *;`,
};
