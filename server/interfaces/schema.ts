import { Types } from "mongoose";

// User Schema Types
export enum LoginMethod {
  EMAIL = "email",
  GOOGLE = "google",
  FACEBOOK = "facebook",
  TWITTER = "twitter",
  LINKEDIN = "linkedin",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  loginMethod: LoginMethod;
  isVerified: boolean;
  isConnected: boolean;
  createdAt: Date;
  updatedAt: Date;
  otp: string;
}

// Topic Schema Types
export interface ITopic {
  title: string;
  color: string;
  userId: Types.ObjectId;
}

// Note Schema Type
export interface INote {
  userId: Types.ObjectId;
  title: string;
  content: string;
  createdAt: Date;
  editedAt: Date;
  isDeleted: boolean;
  isArchived: boolean;
  isFavourite: boolean;
  topicId: Types.ObjectId;
}

// Todo Schema Type
interface BaseContent {
  value: string;
  isCompleted: boolean;
}

interface HeadingContent extends BaseContent {
  subList: {
    value: string;
    isCompleted: boolean;
  }[];
}

export type Content = HeadingContent | BaseContent;

export interface ITodo {
  userId: Types.ObjectId;
  title: string;
  content: Content[];
  createdAt: Date;
  editedAt: Date;
  isDeleted: boolean;
  isArchived: boolean;
  isFavourite: boolean;
  topicId: Types.ObjectId;
}
