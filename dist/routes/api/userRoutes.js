"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userHandler_1 = require("../../controllers/userHandler");
const router = (0, express_1.Router)();
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
router.route('/')
    .get(asyncHandler(userHandler_1.getAllUsers))
    .post(asyncHandler(userHandler_1.createUser));
router.route('/:userId')
    .get(asyncHandler(userHandler_1.getSingleUser))
    .put(asyncHandler(userHandler_1.updateUser))
    .delete(asyncHandler(userHandler_1.deleteUser));
router.route('/:userId/friends/:friendId')
    .post(asyncHandler(userHandler_1.addFriend))
    .delete(asyncHandler(userHandler_1.removeFriend));
exports.default = router;
