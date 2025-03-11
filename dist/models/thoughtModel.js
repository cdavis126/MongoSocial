"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reactionSchema_1 = __importDefault(require("./reactionSchema"));
const thoughtSchema = new mongoose_1.Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        ref: 'User',
        required: true
    },
    reactions: {
        type: [reactionSchema_1.default],
        default: []
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    id: false
});
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions ? this.reactions.length : 0;
});
const Thought = (0, mongoose_1.model)('Thought', thoughtSchema);
exports.default = Thought;
