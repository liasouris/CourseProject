"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateToken = (req, res, next) => {
    const token = req.header('authorization')?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Access denied, missing token' });
        return; // Exit the function after sending the response
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        req.user = { userId: verified.userId }; // Attach userId to req.user
        next(); // Pass control to the next middleware or route handler
    }
    catch (error) {
        res.status(400).json({ message: 'Access denied, invalid token' });
    }
};
exports.validateToken = validateToken;
