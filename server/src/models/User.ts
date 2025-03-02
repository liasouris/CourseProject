import mongoose, { Document, Schema } from "mongoose"

interface IUser extends Document {
  username: string;
  password: string;
  boards: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  boards: [{ type: mongoose.Types.ObjectId, ref: "Board" }]
});

const User: mongoose.Model<IUser> = mongoose.model<IUser>("User", UserSchema)
export {User, IUser};