import { Router, Request, Response, NextFunction } from 'express';
import {
    createReaction,
    createThought,
    deleteReaction,
    deleteThought,  
    getSingleThought,
    getThoughts,  
    updateThought
} from '../../controllers/thoughtHandler';

const router = Router();

// Middleware to handle async errors
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Route: /api/thoughts
router.route('/')
    .get(asyncHandler(getThoughts))
    .post(asyncHandler(createThought));

// Route: /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(asyncHandler(getSingleThought))
    .put(asyncHandler(updateThought))
    .delete(asyncHandler(deleteThought));

// Route: /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(asyncHandler(createReaction))
    .delete(asyncHandler(deleteReaction));

export default router;

