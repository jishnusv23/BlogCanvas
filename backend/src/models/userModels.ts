import mongoose, { Document, Schema, model } from "mongoose";

interface IUser extends Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  password: string;
  preferences: string[];
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  phone: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  preferences: {
    type: [String],
    required: true,
  },
});

const User = model<IUser>("User", userSchema);

export default User;
