import { Router } from 'express';
import { getReservations, createReservation, updateReservationStatus } from '../controllers/reservationController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticate, getReservations);
router.post('/', authenticate, createReservation);
router.patch('/:id/status', authenticate, authorizeRole('admin'), updateReservationStatus);

export default router;
