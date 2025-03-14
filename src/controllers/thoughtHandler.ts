import { Request, Response } from 'express';
import { Thought } from '../models';
import formatTimestamp from '../utils/formatTimestamp';

// Get all thoughts
export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        return res.json(thoughts);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};

// Get a single thought by ID
export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const { thoughtId } = req.params;
        const thought = await Thought.findById(thoughtId).populate('reactions');

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        return res.json({
            ...thought.toObject(),
            createdAtFormatted: formatTimestamp(thought.createdAt)
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};

// Create a new thought
export const createThought = async (req: Request, res: Response) => {
    try {
        const newThought = await Thought.create(req.body);
        return res.json(newThought);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};

// Update a thought by ID
export const updateThought = async (req: Request, res: Response) => {
    try {
        const { thoughtId } = req.params;
        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }

        return res.json(updatedThought);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};

// Delete a thought by ID
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const { thoughtId } = req.params;
        const deletedThought = await Thought.findByIdAndDelete(thoughtId);

        if (!deletedThought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }

        return res.json({ message: 'Thought successfully deleted' });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};

// Add a reaction to a thought
export const createReaction = async (req: Request, res: Response) => {
    try {
        const { thoughtId } = req.params;
        const thought = await Thought.findById(thoughtId);

        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }

        thought.reactions.push(req.body);
        await thought.save();

        return res.json(thought);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};

// Remove a reaction from a thought
export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const { thoughtId, reactionId } = req.params;
        const thought = await Thought.findById(thoughtId);

        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }

        thought.reactions.pull({ _id: reactionId });
        await thought.save();

        return res.json(thought);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};

