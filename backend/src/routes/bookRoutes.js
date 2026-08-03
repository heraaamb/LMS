import { Router } from 'express';
import { getBooks, createBook, updateBook, deleteBook } from '../controllers/bookController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getBooks);
router.post('/', authenticate, authorizeRole('admin'), createBook);
router.put('/:id', authenticate, authorizeRole('admin'), updateBook);
router.delete('/:id', authenticate, authorizeRole('admin'), deleteBook);

export default router;
