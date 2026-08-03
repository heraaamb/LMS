export const fineService = {
  payFine: async (fineId) => {
    return { id: fineId, status: 'paid', paidDate: new Date().toISOString().split('T')[0] };
  },
  waiveFine: async (fineId) => {
    return { id: fineId, status: 'waived' };
  },
};
