import mongoose from "mongoose";
import { ITopic } from "../interfaces/schema";
import { TOPIC_ERRORS } from "../constants/errors";

const TopicSchema = new mongoose.Schema<ITopic>({
  title: { type: String, required: [true, TOPIC_ERRORS.NO_TITLE] },
  color: { type: String, required: [true, TOPIC_ERRORS.NO_COLOR] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<ITopic>("Topic", TopicSchema);
