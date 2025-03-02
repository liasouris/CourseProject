import mongoose, { Document, Schema } from 'mongoose';

interface IColumn extends Document {
  name: string;
  boardId: mongoose.Types.ObjectId;
  cards: mongoose.Types.ObjectId[];
}

const ColumnSchema: Schema = new Schema({
  name: { type: String, required: true },
  boardId: { type: mongoose.Types.ObjectId, ref: 'Board', required: true },
  cards: [{ type: mongoose.Types.ObjectId, ref: 'Card' }],
});

const Column: mongoose.Model<IColumn> = mongoose.model<IColumn>('Column', ColumnSchema)

export {Column, IColumn}