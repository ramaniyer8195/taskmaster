import mongoose from "mongoose";
import { ITopic } from "../interfaces/schema";

const TopicSchema = new mongoose.Schema<ITopic>({
  title: { type: String, required: true },
  color: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<ITopic>("Topic", TopicSchema);
