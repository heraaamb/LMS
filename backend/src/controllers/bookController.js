import { bookService } from '../services/bookService.js';
import { sendSuccess } from '../utils/responseHandler.js';

export const getBooks = async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks();
    return sendSuccess(res, 'Books retrieved successfully', books);
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req, res, next) => {
  try {
    const newBook = await bookService.createBook(req.body);
    return sendSuccess(res, 'Book created successfully', newBook, 201);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const updated = await bookService.updateBook(req.params.id, req.body);
    return sendSuccess(res, 'Book updated successfully', updated);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const result = await bookService.deleteBook(req.params.id);
    return sendSuccess(res, 'Book deleted successfully', result);
  } catch (error) {
    next(error);
  }
};
