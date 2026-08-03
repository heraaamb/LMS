export const bookService = {
  getAllBooks: async () => {
    return [];
  },
  createBook: async (data) => {
    return { id: `bk_${Date.now()}`, ...data };
  },
  updateBook: async (id, data) => {
    return { id, ...data };
  },
  deleteBook: async (id) => {
    return { id, deleted: true };
  },
};
