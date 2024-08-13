import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { JWT_MAX_AGE } from "../constants/constants";

// json web token utils
export const createJwt = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: JWT_MAX_AGE });
};

// otp utils
export const generateOneTimePassword = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
