import mongoose, { Document, Schema } from 'mongoose';

interface ICard extends Document {
  title: string;
  description: string;
  color: string;
  columnId: mongoose.Types.ObjectId;
}

const CardSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  color: { type: String, default: '#ffffff' },
  columnId: { type: mongoose.Types.ObjectId, ref: 'Column', required: true },
});

const Card: mongoose.Model<ICard> = mongoose.model<ICard>('Card', CardSchema);

export{Card, ICard}