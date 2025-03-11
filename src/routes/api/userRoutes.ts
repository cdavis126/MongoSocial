import { Router } from 'express';
import {
    getSingleUser,
    getAllUsers,
    createUser,
    deleteUser, // 
    addFriend, // 
    removeFriend, //updarted
    updateUser
} from '../../controllers/userHandler';

const router = Router();

// Route: /api/users - GET all users & POST a new user
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// Route: /api/users/:userId 
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// Route: /api/users/:userId/friends/:friendId - Add/Remove a friend
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

export default router;
