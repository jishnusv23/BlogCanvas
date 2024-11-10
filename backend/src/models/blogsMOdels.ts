
import mongoose, { Document, Schema, model } from "mongoose";

interface IArticle extends Document {
  id: any;
  title: string;
  content: string;
  date: Date;
  description: string;
  image: File | null;
  tags: string[];
  category: string;
  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
  blocks: mongoose.Types.ObjectId[];
}

const articleSchema: Schema<IArticle> = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,

    default: function () {
      return new Date().setHours(0, 0, 0, 0);
    },
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  tags: {
    type: [String],
  },
  category: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  blocks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Article = model<IArticle>("Article", articleSchema);

export default Article;
