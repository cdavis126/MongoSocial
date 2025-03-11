import { Router } from 'express';
import userRoutes from './api/userRoutes';
import thoughtRoutes from './api/thoughtRoutes';

const router = Router();

// Define routes
router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);

export default router;
