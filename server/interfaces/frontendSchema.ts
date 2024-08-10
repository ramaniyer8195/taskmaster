import { Content, LoginMethod } from "./schema";

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  loginMethod: LoginMethod;
  isVerified: boolean;
  isConnected: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Topic {
  _id: string;
  title: string;
  color: string;
}

export interface Note {
  _id: string;
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
  _id: string;
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
