import mongoose from "mongoose";
import { INote } from "../interfaces/schema";
import { ITEM_ERRORS } from "../constants/errors";

const NoteSchema = new mongoose.Schema<INote>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: [true, ITEM_ERRORS.NO_TITLE] },
  content: { type: String, default: "" },
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

NoteSchema.pre("updateOne", async function () {
  this.set({ editedAt: new Date() });
});

export default mongoose.model<INote>("Note", NoteSchema);
