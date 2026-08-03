import { Router } from 'express';
import { register, login, getCurrentUser } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { validatePayload } from '../middlewares/validationMiddleware.js';

const router = Router();

router.post('/register', validatePayload(['name', 'email', 'password', 'role', 'idNumber']), register);
router.post('/login', validatePayload(['identifier', 'password', 'role']), login);
router.get('/me', authenticate, getCurrentUser);

export default router;
