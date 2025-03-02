import mongoose, { Document, Schema } from 'mongoose';

interface IBoard extends Document {
  userId: mongoose.Types.ObjectId;
  columns: mongoose.Types.ObjectId[];
}

const BoardSchema: Schema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  columns: [{ type: mongoose.Types.ObjectId, ref: 'Column'}],
});

const Board: mongoose.Model<IBoard> = mongoose.model<IBoard>('Board', BoardSchema);
export {Board, IBoard}