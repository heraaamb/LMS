import { Router } from 'express';
import authRoutes from './authRoutes.js';
import bookRoutes from './bookRoutes.js';
import circulationRoutes from './circulationRoutes.js';
import reservationRoutes from './reservationRoutes.js';
import fineRoutes from './fineRoutes.js';
import studentRoutes from './studentRoutes.js';
import reportRoutes from './reportRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/books', bookRoutes);
router.use('/issues', circulationRoutes);
router.use('/reservations', reservationRoutes);
router.use('/fines', fineRoutes);
router.use('/students', studentRoutes);
router.use('/reports', reportRoutes);

export default router;
