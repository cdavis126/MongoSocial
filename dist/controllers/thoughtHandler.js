"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReaction = exports.createReaction = exports.deleteThought = exports.updateThought = exports.createThought = exports.getSingleThought = exports.getThoughts = void 0;
const models_1 = require("../models");
const formatTimestamp_1 = __importDefault(require("../utils/formatTimestamp"));
const getThoughts = async (_req, res) => {
    try {
        const thoughts = await models_1.Thought.find();
        return res.json(thoughts);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};
exports.getThoughts = getThoughts;
const getSingleThought = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const thought = await models_1.Thought.findById(thoughtId).populate('reactions');
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        return res.json({
            ...thought.toObject(),
            createdAtFormatted: (0, formatTimestamp_1.default)(thought.createdAt)
        });
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};
exports.getSingleThought = getSingleThought;
const createThought = async (req, res) => {
    try {
        const newThought = await models_1.Thought.create(req.body);
        return res.json(newThought);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};
exports.createThought = createThought;
const updateThought = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const updatedThought = await models_1.Thought.findByIdAndUpdate(thoughtId, { $set: req.body }, { new: true, runValidators: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }
        return res.json(updatedThought);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};
exports.updateThought = updateThought;
const deleteThought = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const deletedThought = await models_1.Thought.findByIdAndDelete(thoughtId);
        if (!deletedThought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }
        return res.json({ message: 'Thought successfully deleted' });
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};
exports.deleteThought = deleteThought;
const createReaction = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const thought = await models_1.Thought.findById(thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }
        thought.reactions.push(req.body);
        await thought.save();
        return res.json(thought);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};
exports.createReaction = createReaction;
const deleteReaction = async (req, res) => {
    try {
        const { thoughtId, reactionId } = req.params;
        const thought = await models_1.Thought.findById(thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }
        thought.reactions.pull({ _id: reactionId });
        await thought.save();
        return res.json(thought);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};
exports.deleteReaction = deleteReaction;
