"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routesIndex_1 = __importDefault(require("./routes/routesIndex"));
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3001;
(0, dbConnect_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((req, _res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});
app.use('/api', routesIndex_1.default);
app.listen(PORT, () => {
    console.log(`🚀 API server running on port ${PORT}!`);
});
