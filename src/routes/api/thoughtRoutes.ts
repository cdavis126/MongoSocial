import { Router } from 'express';
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

// Route: /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);

// Route: /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// Route: /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction);

export default router;
