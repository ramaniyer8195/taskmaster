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
  createdAt: string;
  editedAt: string;
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
  contentId: string;
}

export interface HeadingContent extends BaseContent {
  subList: BaseContent[];
}

export type Content = HeadingContent | BaseContent;

export interface Todo {
  _id: string;
  title: string;
  content: Content[];
  createdAt: string;
  editedAt: string;
  isDeleted: boolean;
  isArchived: boolean;
  isFavourite: boolean;
  topic: string;
  color: string;
  type: string;
}

export interface ApiError<T> {
  response: {
    data: {
      error: T;
    };
  };
}

export interface SignupErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  loginMethod?: string;
}

export interface OtpErrors {
  otp?: string;
}

export interface SignInErrors {
  email?: string;
  password?: string;
}

export interface AccountUpdateErrors {
  name?: string;
  update?: string;
}

export interface PasswordErrors {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
