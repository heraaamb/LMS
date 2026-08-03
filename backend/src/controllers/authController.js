import { authService } from '../services/authService.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, idNumber, department } = req.body;
    const result = await authService.register({ name, email, password, role, idNumber, department });
    return sendSuccess(res, 'User registered successfully', result, 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { identifier, password, role } = req.body;
    const result = await authService.login({ identifier, password, role });
    return sendSuccess(res, 'Login successful', result, 200);
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    return sendSuccess(res, 'User profile fetched', req.user);
  } catch (error) {
    next(error);
  }
};
