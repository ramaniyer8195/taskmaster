import mongoose from "mongoose";
import { INote } from "../interfaces/schema";

const NoteSchema = new mongoose.Schema<INote>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
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

export default mongoose.model<INote>("Note", NoteSchema);
