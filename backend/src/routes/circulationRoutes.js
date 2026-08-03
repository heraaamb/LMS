import { Router } from 'express';
import { issueBook, returnBook, getIssues } from '../controllers/circulationController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticate, getIssues);
router.post('/issue', authenticate, authorizeRole('admin'), issueBook);
router.post('/:id/return', authenticate, authorizeRole('admin'), returnBook);

export default router;
