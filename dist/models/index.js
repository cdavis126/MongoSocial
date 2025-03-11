"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thought = exports.User = void 0;
const userModel_1 = __importDefault(require("./userModel"));
exports.User = userModel_1.default;
const thoughtModel_1 = __importDefault(require("./thoughtModel"));
exports.Thought = thoughtModel_1.default;
