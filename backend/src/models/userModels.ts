import mongoose, { Document, Schema, model } from "mongoose";

interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  preferences: string[];
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    type: [String],
    default: ["Tech"],
    required: true,
  },
});

const User = model<IUser>("User", userSchema);

export default User;
