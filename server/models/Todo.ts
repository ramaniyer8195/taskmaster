import mongoose from "mongoose";
import { ITodo } from "../interfaces/schema";
import { ITEM_ERRORS } from "../constants/errors";

const TodoSchema = new mongoose.Schema<ITodo>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: [true, ITEM_ERRORS.NO_TITLE] },
  content: { type: mongoose.Schema.Types.Mixed, default: [] },
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

TodoSchema.pre("updateOne", async function () {
  this.set({ editedAt: new Date() });
});

export default mongoose.model<ITodo>("Todo", TodoSchema);
