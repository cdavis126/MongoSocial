"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const { isEmail } = validator_1.default;
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => isEmail(email),
            message: 'Please enter a valid email address'
        }
    },
    thoughts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});
userSchema.virtual('friendCount').get(function () {
    return this.friends ? this.friends.length : 0;
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
