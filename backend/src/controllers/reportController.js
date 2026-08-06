import { db } from '../config/db.js';
import { sendSuccess } from '../utils/responseHandler.js';

export const getAnalytics = async (req, res, next) => {
  try {
    const totalBooks = await db.query('SELECT COUNT(*) FROM books;').catch(() => ({ rows: [{ count: 0 }] }));
    const activeLoans = await db.query("SELECT COUNT(*) FROM issue_records WHERE status = 'issued';").catch(() => ({ rows: [{ count: 0 }] }));
    const pendingHolds = await db.query("SELECT COUNT(*) FROM reservations WHERE status = 'pending';").catch(() => ({ rows: [{ count: 0 }] }));

    return sendSuccess(res, 'Analytics fetched', {
      statsOverview: {
        totalBooks: parseInt(totalBooks.rows[0]?.count || 0, 10),
        activeLoans: parseInt(activeLoans.rows[0]?.count || 0, 10),
        pendingHolds: parseInt(pendingHolds.rows[0]?.count || 0, 10),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getActivityLogs = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM activity_logs ORDER BY timestamp DESC LIMIT 50;').catch(() => ({ rows: [] }));
    return sendSuccess(res, 'Activity logs fetched', result.rows);
  } catch (error) {
    next(error);
  }
};
