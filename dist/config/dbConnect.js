"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = async () => {
    try {
        await mongoose_1.default.connect('mongodb://127.0.0.1:27017/MongoSocial');
        console.log('✅ Connected to MongoSocial database.');
        return mongoose_1.default.connection;
    }
    catch (error) {
        console.error('❌ Database connection error:', error);
        throw new Error('Database connection failed.');
    }
};
exports.default = dbConnect;
