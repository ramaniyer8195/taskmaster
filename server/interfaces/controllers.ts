import { Types } from "mongoose";
import { User } from "../interfaces/frontendSchema";

// User Routes Types
export interface ControllerErrors {
  [key: string]: string;
}

export interface SignupReq {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  loginMethod: "email" | "google" | "facebook" | "twitter" | "linkedin";
}

export interface SignupRes {
  data: Types.ObjectId | null;
  error: ControllerErrors;
}

export interface SigninReq {
  email: string;
  password: string;
}

export interface SigninRes {
  data: Types.ObjectId | null;
  error: ControllerErrors;
}

export interface GetUserRes {
  data: User | null;
  error: ControllerErrors;
}

export interface VerifyOtpReq {
  otp: string;
}

export interface VerifyOtpRes {
  message: string;
  error: ControllerErrors;
}

export interface updateDetailsReq {
  name?: string;
  avatar?: string;
}

export interface updateDetailsRes {
  message: string;
  error: ControllerErrors;
}

export interface changePasswordReq {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface changePasswordRes {
  message: string;
  error: ControllerErrors;
}
