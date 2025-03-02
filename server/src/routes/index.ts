import { Router } from 'express';
import { validateToken, AuthenticatedRequest } from '../middleware/validateToken';
import { Board } from '../models/Board';
import { Column } from '../models/Column';
import { Card } from '../models/Card';

const router: Router = Router();

// POST board creates new board for authentiacted user
router.post('/board', validateToken, async (req: AuthenticatedRequest, res) => {
  try {
    // Check if a board for the user already exists
    let board = await Board.findOne({ userId: req.user?.userId });
    if (board) {
      // Returs old board instead of creating a new one
      res.status(200).json(board);
      return;
    }
    // Create a new board if none exists
    board = new Board({ userId: req.user?.userId, columns: [] });
    await board.save();
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// GET board retrievs board for autheniacted user
router.get('/board', validateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const board = await Board.findOne({ userId: req.user?.userId })
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
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST column creates new column on board
router.post('/column', validateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { name, boardId } = req.body;
    // Create a new column with the given name and associated board
    const column = new Column({ name, boardId });
    await column.save();
    
    // Update the board by adding the new column's id
    await Board.findByIdAndUpdate(boardId, { $push: { columns: column._id } });
    
    res.status(201).json(column);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// POST card  create a new card in a column
router.post('/card', validateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { title, description, color, columnId } = req.body;
    // Create a new card with given details and associate it with a column
    const card = new Card({ title, description, color, columnId });
    await card.save();
    
    // Update the column by adding the new card's id
    await Column.findByIdAndUpdate(columnId, { $push: { cards: card._id } });
    
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




export default router;
