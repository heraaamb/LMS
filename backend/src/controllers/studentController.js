import { db } from '../config/db.js';
import { userQueries } from '../db/queries/userQueries.js';
import { sendSuccess } from '../utils/responseHandler.js';

export const getStudents = async (req, res, next) => {
  try {
    const result = await db.query(userQueries.getAllStudents);
    return sendSuccess(res, 'Students fetched successfully', result.rows);
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (req, res, next) => {
  try {
    const result = await db.query(userQueries.findUserById, [req.params.id]);
    return sendSuccess(res, 'Student profile fetched', result.rows[0] || { id: req.params.id });
  } catch (error) {
    next(error);
  }
};
