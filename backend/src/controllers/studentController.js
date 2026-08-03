import { sendSuccess } from '../utils/responseHandler.js';

export const getStudents = async (req, res, next) => {
  try {
    return sendSuccess(res, 'Students fetched', []);
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (req, res, next) => {
  try {
    return sendSuccess(res, 'Student profile fetched', { id: req.params.id });
  } catch (error) {
    next(error);
  }
};
