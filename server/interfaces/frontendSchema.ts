import { Types } from "mongoose";
import { Content } from "./schema";

export interface User {
  _id: Types.ObjectId;
  name: string;
  email: string;
  avatar: string;
  loginMethod: "email" | "google" | "facebook" | "twitter" | "linkedin";
  isVerified: boolean;
  isConnected: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Topic {
  _id: Types.ObjectId;
  title: string;
  color: string;
}

export interface Note {
  _id: Types.ObjectId;
  title: string;
  content: string;
  createdAt: Date;
  editedAt: Date;
  isDeleted: boolean;
  isArchived: boolean;
  isFavourite: boolean;
  topic: string;
  type: string;
}

export interface Todo {
  _id: Types.ObjectId;
  title: string;
  content: Content[];
  createdAt: Date;
  editedAt: Date;
  isDeleted: boolean;
  isArchived: boolean;
  isFavourite: boolean;
  topic: string;
  type: string;
}
