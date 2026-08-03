import { circulationService } from '../services/circulationService.js';
import { sendSuccess } from '../utils/responseHandler.js';

export const issueBook = async (req, res, next) => {
  try {
    const issue = await circulationService.issueBook(req.body);
    return sendSuccess(res, 'Book issued successfully', issue, 201);
  } catch (error) {
    next(error);
  }
};

export const returnBook = async (req, res, next) => {
  try {
    const returned = await circulationService.returnBook(req.params.id);
    return sendSuccess(res, 'Book returned successfully', returned);
  } catch (error) {
    next(error);
  }
};

export const getIssues = async (req, res, next) => {
  try {
    return sendSuccess(res, 'Issues retrieved successfully', []);
  } catch (error) {
    next(error);
  }
};
