"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateToken_1 = require("../middleware/validateToken");
const Board_1 = require("../models/Board");
const Column_1 = require("../models/Column");
const Card_1 = require("../models/Card");
const router = (0, express_1.Router)();
// POST board creates new board for authentiacted user
router.post('/board', validateToken_1.validateToken, async (req, res) => {
    try {
        // Check if a board for the user already exists
        let board = await Board_1.Board.findOne({ userId: req.user?.userId });
        if (board) {
            // Returs old board instead of creating a new one
            res.status(200).json(board);
            return;
        }
        // Create a new board if none exists
        board = new Board_1.Board({ userId: req.user?.userId, columns: [] });
        await board.save();
        res.status(201).json(board);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// GET board retrievs board for autheniacted user
router.get('/board', validateToken_1.validateToken, async (req, res) => {
    try {
        const board = await Board_1.Board.findOne({ userId: req.user?.userId })
            .populate({
            path: 'columns',
            populate: { path: 'cards' }, // Populates cards within each column
        })
            .exec();
        if (!board) {
            res.status(404).json({ message: 'Board not found' });
            return;
        }
        res.status(200).json(board);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// POST column creates new column on board
router.post('/column', validateToken_1.validateToken, async (req, res) => {
    try {
        const { name, boardId } = req.body;
        // Create a new column with the given name and associated board
        const column = new Column_1.Column({ name, boardId });
        await column.save();
        // Update the board by adding the new column's id
        await Board_1.Board.findByIdAndUpdate(boardId, { $push: { columns: column._id } });
        res.status(201).json(column);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// POST card  create a new card in a column
router.post('/card', validateToken_1.validateToken, async (req, res) => {
    try {
        const { title, description, color, columnId } = req.body;
        // Create a new card with given details and associate it with a column
        const card = new Card_1.Card({ title, description, color, columnId });
        await card.save();
        // Update the column by adding the new card's id
        await Column_1.Column.findByIdAndUpdate(columnId, { $push: { cards: card._id } });
        res.status(201).json(card);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.default = router;
