export interface User {
  _id: string;
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
  color: string;
  type: string;
}

export interface BaseContent {
  value: string;
  isCompleted: boolean;
  id: string;
}

export interface HeadingContent extends BaseContent {
  subList: BaseContent[];
}

export type Content = HeadingContent | BaseContent;

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
  color: string;
  type: string;
}
