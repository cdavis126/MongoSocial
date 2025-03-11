"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFriend = exports.addFriend = exports.deleteUser = exports.updateUser = exports.createUser = exports.getSingleUser = exports.getAllUsers = void 0;
const models_1 = require("../models");
const getAllUsers = async (_req, res) => {
    try {
        const users = await models_1.User.find().populate('friends').populate('thoughts');
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: (err instanceof Error) ? err.message : "Unknown error" });
    }
};
exports.getAllUsers = getAllUsers;
const getSingleUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const singleUser = await models_1.User.findById(userId).populate('friends').populate('thoughts');
        if (!singleUser) {
            res.status(404).json({ message: 'No user with that ID' });
            return;
        }
        res.json(singleUser);
    }
    catch (err) {
        res.status(500).json({ error: (err instanceof Error) ? err.message : "Unknown error" });
    }
};
exports.getSingleUser = getSingleUser;
const createUser = async (req, res) => {
    try {
        const newUser = await models_1.User.create(req.body);
        res.json(newUser);
    }
    catch (err) {
        res.status(500).json({ error: (err instanceof Error) ? err.message : "Unknown error" });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedUser = await models_1.User.findByIdAndUpdate(userId, { $set: req.body }, { new: true, runValidators: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'No user with that ID' });
            return;
        }
        res.json(updatedUser);
    }
    catch (err) {
        res.status(500).json({ error: (err instanceof Error) ? err.message : "Unknown error" });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await models_1.User.findByIdAndDelete(userId);
        if (!deletedUser) {
            res.status(404).json({ message: 'No user with that ID' });
            return;
        }
        res.json({ message: 'User successfully deleted' });
    }
    catch (err) {
        res.status(500).json({ error: (err instanceof Error) ? err.message : "Unknown error" });
    }
};
exports.deleteUser = deleteUser;
const addFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const updatedUser = await models_1.User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'No user with that ID' });
            return;
        }
        res.json(updatedUser);
    }
    catch (err) {
        res.status(500).json({ error: (err instanceof Error) ? err.message : "Unknown error" });
    }
};
exports.addFriend = addFriend;
const removeFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const updatedUser = await models_1.User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'No user with that ID' });
            return;
        }
        res.json(updatedUser);
    }
    catch (err) {
        res.status(500).json({ error: (err instanceof Error) ? err.message : "Unknown error" });
    }
};
exports.removeFriend = removeFriend;
