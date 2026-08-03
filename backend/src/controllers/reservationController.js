import { sendSuccess } from '../utils/responseHandler.js';

export const getReservations = async (req, res, next) => {
  try {
    return sendSuccess(res, 'Reservations fetched', []);
  } catch (error) {
    next(error);
  }
};

export const createReservation = async (req, res, next) => {
  try {
    const reservation = { id: `res_${Date.now()}`, ...req.body, status: 'pending' };
    return sendSuccess(res, 'Reservation created', reservation, 201);
  } catch (error) {
    next(error);
  }
};

export const updateReservationStatus = async (req, res, next) => {
  try {
    const updated = { id: req.params.id, status: req.body.status };
    return sendSuccess(res, 'Reservation status updated', updated);
  } catch (error) {
    next(error);
  }
};
