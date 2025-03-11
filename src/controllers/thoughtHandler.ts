import { Request, Response } from 'express';
import { Thought } from '../models';

// Get all thoughts
export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single thought by ID
export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const { thoughtId } = req.params;
        const singleThought = await Thought.findById(thoughtId);

        if (!singleThought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }

        res.json(singleThought);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new thought
export const createThought = async (req: Request, res: Response) => {
    try {
        const newThought = await Thought.create(req.body);
        res.json(newThought);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a thought by ID
export const updateThought = async (req: Request, res: Response) => {
    try {
        const { thoughtId } = req.params;
        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $set: req.body },
            { new: true, runValidators: true } // Ensures validation runs
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }

        res.json(updatedThought);
    } catch (err) {
        res.status(500).json({ error: err.message });
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

        res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
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

        res.json(thought);
    } catch (err) {
        res.status(500).json({ error: err.message });
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

        res.json(thought);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
