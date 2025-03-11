"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const thoughtHandler_1 = require("../../controllers/thoughtHandler");
const router = (0, express_1.Router)();
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
router.route('/')
    .get(asyncHandler(thoughtHandler_1.getThoughts))
    .post(asyncHandler(thoughtHandler_1.createThought));
router.route('/:thoughtId')
    .get(asyncHandler(thoughtHandler_1.getSingleThought))
    .put(asyncHandler(thoughtHandler_1.updateThought))
    .delete(asyncHandler(thoughtHandler_1.deleteThought));
router.route('/:thoughtId/reactions')
    .post(asyncHandler(thoughtHandler_1.createReaction))
    .delete(asyncHandler(thoughtHandler_1.deleteReaction));
exports.default = router;
