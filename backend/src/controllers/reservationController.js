import { db } from '../config/db.js';
import { sendSuccess } from '../utils/responseHandler.js';

export const getReservations = async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT r.*, b.title as book_title, u.name as student_name, u.email as student_email
      FROM reservations r
      LEFT JOIN books b ON r.book_id = b.id
      LEFT JOIN users u ON r.student_id = u.id
      ORDER BY r.request_date DESC;
    `);
    return sendSuccess(res, 'Reservations fetched', result.rows);
  } catch (error) {
    return sendSuccess(res, 'Reservations fetched', []);
  }
};

export const createReservation = async (req, res, next) => {
  try {
    const { bookId, studentId } = req.body;
    const resId = `res_${Date.now()}`;
    const reqDate = new Date().toISOString().split('T')[0];
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const result = await db.query(
      `INSERT INTO reservations (id, book_id, student_id, request_date, status, queue_position, expires_at)
       VALUES ($1, $2, $3, $4, 'pending', 1, $5)
       RETURNING *;`,
      [resId, bookId, studentId, reqDate, expires]
    );

    return sendSuccess(res, 'Reservation created', result.rows[0] || { id: resId, bookId, studentId, status: 'pending' }, 201);
  } catch (error) {
    next(error);
  }
};

export const updateReservationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await db.query(
      `UPDATE reservations SET status = $1 WHERE id = $2 RETURNING *;`,
      [status, id]
    );
    return sendSuccess(res, 'Reservation status updated', result.rows[0] || { id, status });
  } catch (error) {
    next(error);
  }
};
