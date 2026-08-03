export const circulationService = {
  issueBook: async ({ bookId, studentId, dueDate }) => {
    return {
      id: `iss_${Date.now()}`,
      bookId,
      studentId,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate,
      status: 'issued',
    };
  },
  returnBook: async (issueId) => {
    return {
      id: issueId,
      status: 'returned',
      returnDate: new Date().toISOString().split('T')[0],
    };
  },
};
