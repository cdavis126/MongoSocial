import { Router } from 'express';
import userRoutes from './userRoutes';
import thoughtRoutes from './thoughtRoutes';

const router = Router();

// Use the user and thought routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;
