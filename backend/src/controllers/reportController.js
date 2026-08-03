import { sendSuccess } from '../utils/responseHandler.js';

export const getAnalytics = async (req, res, next) => {
  try {
    return sendSuccess(res, 'Analytics fetched', {
      monthlyBorrowings: [],
      categoryDistribution: [],
      statsOverview: {
        totalBooks: 0,
        activeLoans: 0,
        pendingHolds: 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getActivityLogs = async (req, res, next) => {
  try {
    return sendSuccess(res, 'Activity logs fetched', []);
  } catch (error) {
    next(error);
  }
};
