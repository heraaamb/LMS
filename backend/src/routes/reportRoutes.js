import { Router } from 'express';
import { getAnalytics, getActivityLogs } from '../controllers/reportController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/analytics', authenticate, authorizeRole('admin'), getAnalytics);
router.get('/activity-logs', authenticate, authorizeRole('admin'), getActivityLogs);

export default router;
