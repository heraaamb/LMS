import { Router } from 'express';
import { getFines, payFine, waiveFine } from '../controllers/fineController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticate, getFines);
router.post('/:id/pay', authenticate, payFine);
router.post('/:id/waive', authenticate, authorizeRole('admin'), waiveFine);

export default router;
