import mongoose from "mongoose";
import { ITodo } from "../interfaces/schema";

const TodoSchema = new mongoose.Schema<ITodo>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
  editedAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  isFavourite: { type: Boolean, default: false },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    default: null,
  },
});

export default mongoose.model<ITodo>("Todo", TodoSchema);
