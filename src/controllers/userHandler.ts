import { Request, Response } from 'express';
import { User } from '../models';

// Get all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find().populate('friends').populate('thoughts');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single user by ID
export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const singleUser = await User.findById(userId).populate('friends').populate('thoughts');

        if (!singleUser) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        res.json(singleUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        res.json({ message: 'User successfully deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a friend to a user's friend list
export const addFriend = async (req: Request, res: Response) => {
    try {
        const { userId, friendId } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } }, // Ensures no duplicates
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Remove a friend from a user's friend list
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const { userId, friendId } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } }, // Removes friend from array
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
