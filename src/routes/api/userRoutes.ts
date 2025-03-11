import { Router, RequestHandler } from 'express';
import {
    getSingleUser,
    getAllUsers,
    createUser,
    deleteUser,
    addFriend,
    removeFriend,
    updateUser
} from '../../controllers/userHandler';

const router = Router();

// Type-safe wrappers for Express route handlers
const asyncHandler = (fn: RequestHandler): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

// Route: /api/users - GET all users & POST a new user
router.route('/')
    .get(asyncHandler(getAllUsers))
    .post(asyncHandler(createUser));

// Route: /api/users/:userId 
router.route('/:userId')
    .get(asyncHandler(getSingleUser))
    .put(asyncHandler(updateUser))
    .delete(asyncHandler(deleteUser));

// Route: /api/users/:userId/friends/:friendId - Add/Remove a friend
router.route('/:userId/friends/:friendId')
    .post(asyncHandler(addFriend))
    .delete(asyncHandler(removeFriend));

export default router;
