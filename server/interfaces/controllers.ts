import { Types } from "mongoose";
import { Topic, User } from "../interfaces/frontendSchema";

export interface ControllerErrors {
  [key: string]: string;
}

// User Routes Types
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

// Topic Routes Types
export interface GetTopicsRes {
  data: Topic[] | null;
  error: any;
}

export interface GetTopicParams {
  topicId: string;
}

export interface GetTopicRes {
  data: Topic | null;
  error: ControllerErrors;
}

export interface ModifyTopicReq {
  topicId: string;
  title?: string;
  color?: string;
}

export interface ModifyTopicRes {
  message: string;
  error: ControllerErrors;
}

export interface DeleteTopicReq {
  topicId: string;
}

export interface DeleteTopicRes {
  message: string;
  data: Topic | null;
  error: ControllerErrors;
}

export interface AddTopicReq {
  title: string;
  color: string;
}

export interface AddTopicRes {
  data: Types.ObjectId | null;
  error: ControllerErrors;
}
