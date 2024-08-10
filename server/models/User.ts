import mongoose from "mongoose";
import { IUser } from "../interfaces/schema";

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  loginMethod: { type: mongoose.Schema.Types.Mixed, required: true },
  isVerified: { type: Boolean, default: false },
  isConnected: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  otp: { type: String, default: null },
});

export default mongoose.model<IUser>("User", UserSchema);
