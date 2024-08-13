import mongoose from "mongoose";
import { IUser } from "../interfaces/schema";
import { isEmail } from "validator";
import { USER_ERRORS } from "../constants/errors";
import bcrpyt from "bcrypt";

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: [true, USER_ERRORS.NO_NAME] },
  email: {
    type: String,
    required: [true, USER_ERRORS.NO_EMAIL],
    unique: true,
    validate: [isEmail, USER_ERRORS.INVALID_EMAIL],
  },
  password: {
    type: String,
    required: [true, USER_ERRORS.NO_PASSWORD],
    minlength: [8, USER_ERRORS.PASSWORD_LENGTH],
  },
  avatar: { type: String, default: null },
  loginMethod: {
    type: String,
    required: [true, USER_ERRORS.NO_LOGIN_METHOD],
  },
  isVerified: { type: Boolean, default: false },
  isConnected: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  otp: { type: String, default: null },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrpyt.genSalt();
  this.password = await bcrpyt.hash(this.password, salt);

  next();
});

UserSchema.pre("updateOne", async function () {
  this.set({ updatedAt: new Date() });
});

export default mongoose.model<IUser>("User", UserSchema);
