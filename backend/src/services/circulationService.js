import { db } from '../config/db.js';
import { circulationQueries } from '../db/queries/circulationQueries.js';

export const circulationService = {
  getAllIssues: async () => {
    try {
      const result = await db.query(circulationQueries.getAllIssues);
      return result.rows;
    } catch (err) {
      console.warn('[circulationService] getAllIssues DB query failed:', err.message);
      return [];
    }
  },

  issueBook: async ({ bookId, studentId, dueDate, issuedBy }) => {
    const issueId = `iss_${Date.now()}`;
    const issueDate = new Date().toISOString().split('T')[0];
    const due = dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    try {
      const result = await db.query(circulationQueries.createIssue, [
        issueId,
        bookId,
        studentId,
        issueDate,
        due,
        issuedBy || 'Librarian Admin',
      ]);
      return result.rows[0];
    } catch (err) {
      console.warn('[circulationService] issueBook DB query failed:', err.message);
      return {
        id: issueId,
        bookId,
        studentId,
        issueDate,
        dueDate: due,
        status: 'issued',
      };
    }
  },

  returnBook: async (issueId) => {
    try {
      const result = await db.query(circulationQueries.processReturn, [issueId]);
      return result.rows[0] || { id: issueId, status: 'returned', returnDate: new Date().toISOString().split('T')[0] };
    } catch (err) {
      console.warn('[circulationService] returnBook DB query failed:', err.message);
      return { id: issueId, status: 'returned', returnDate: new Date().toISOString().split('T')[0] };
    }
  },
};
