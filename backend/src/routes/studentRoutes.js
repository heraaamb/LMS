import { Router } from 'express';
import { getStudents, getStudentById } from '../controllers/studentController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticate, authorizeRole('admin'), getStudents);
router.get('/:id', authenticate, authorizeRole('admin'), getStudentById);

export default router;
