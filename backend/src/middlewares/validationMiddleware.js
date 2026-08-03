import { sendError } from '../utils/responseHandler.js';

export const validatePayload = (requiredFields) => {
  return (req, res, next) => {
    const missing = requiredFields.filter((field) => !req.body || req.body[field] === undefined || req.body[field] === '');
    if (missing.length > 0) {
      return sendError(res, `Missing required fields: ${missing.join(', ')}`, 400);
    }
    next();
  };
};
