import { fineService } from '../services/fineService.js';
import { sendSuccess } from '../utils/responseHandler.js';

export const getFines = async (req, res, next) => {
  try {
    const fines = await fineService.getAllFines();
    return sendSuccess(res, 'Fines fetched', fines);
  } catch (error) {
    next(error);
  }
};

export const payFine = async (req, res, next) => {
  try {
    const paid = await fineService.payFine(req.params.id);
    return sendSuccess(res, 'Fine paid successfully', paid);
  } catch (error) {
    next(error);
  }
};

export const waiveFine = async (req, res, next) => {
  try {
    const waived = await fineService.waiveFine(req.params.id);
    return sendSuccess(res, 'Fine waived successfully', waived);
  } catch (error) {
    next(error);
  }
};
