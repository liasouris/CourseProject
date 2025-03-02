"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
//POST register user registration endpoint
router.post("/register", [
    (0, express_validator_1.body)('username').trim().isLength({ min: 3 }).escape(),
    (0, express_validator_1.body)('password').isLength({ min: 5 }),
], async (req, res) => {
    //Checks for errors in validation
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        //Checks if username is already in use
        const existingUser = await User_1.User.findOne({ username: req.body.username });
        console.log(existingUser);
        if (existingUser) {
            res.status(403).json({ username: 'username already in use' });
            return;
        }
        //hashes password for security
        const salt = bcrypt_1.default.genSaltSync(10);
        const hash = bcrypt_1.default.hashSync(req.body.password, salt);
        //creates the new user
        await User_1.User.create({
            username: req.body.username,
            password: hash,
        });
        res.status(200).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error(`Error during registration: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//Post login user login endpoint
router.post("/login", [
    (0, express_validator_1.body)('username').trim().escape(),
    (0, express_validator_1.body)('password').escape(),
], async (req, res) => {
    try {
        //Finds the user by the username
        const user = await User_1.User.findOne({ username: req.body.username });
        if (!user) {
            res.status(401).json({ message: 'Login failed' });
            return;
        }
        // Compares the provided password with the stored hash
        if (bcrypt_1.default.compareSync(req.body.password, user.password)) {
            const jwtPayload = {
                id: user._id,
                username: user.username,
            };
            //generates jwt token
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });
            res.status(200).json({ success: true, token });
        }
        else {
            res.status(401).json({ message: 'Login failed' });
        }
    }
    catch (error) {
        console.error(`Error during user login: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = router;
