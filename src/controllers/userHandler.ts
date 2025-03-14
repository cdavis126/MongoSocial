import { Request, Response } from 'express';
import { User } from '../models';

// Get all users
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().populate('friends').populate('thoughts');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: (err instanceof Error) ? err.message : "Unknown error" });
    }
};

// Get a single user by ID
export const getSingleUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const singleUser = await User.findById(userId).populate('friends').populate('thoughts');

        if (!singleUser) {
            res.status(404).json({ message: 'No user with that ID' });
            return;
        }

        res.json(singleUser);
    } catch (err) {
        res.status(500).json({ error: (err instanceof Error) ? err.message : "Unknown error" });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(500).json({ error: (err instanceof Error) ? err.message : "Unknown error" });
    }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            res.status(404).json({ message: 'No user with that ID' });
            return;
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: (err instanceof Error) ? err.message : "Unknown error" });
    }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            res.status(404).json({ message: 'No user with that ID' });
            return;
        }

        res.json({ message: 'User successfully deleted' });
    } catch (err) {
        res.status(500).json({ error: (err instanceof Error) ? err.message : "Unknown error" });
    }
};

// Add a friend to a user's friend list
export const addFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, friendId } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } }, // Ensures no duplicates
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ message: 'No user with that ID' });
            return;
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: (err instanceof Error) ? err.message : "Unknown error" });
    }
};

// Remove a friend from a user's friend list
export const removeFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, friendId } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } }, // Removes friend from array
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ message: 'No user with that ID' });
            return;
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: (err instanceof Error) ? err.message : "Unknown error" });
    }
};
