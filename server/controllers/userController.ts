import { RequestHandler } from "express";

export const getUser: RequestHandler = (req, res) => {
  res.send("getUser");
};

export const signup: RequestHandler = (req, res) => {
  res.send("signup");
};

export const signin: RequestHandler = (req, res) => {
  res.send("signin");
};

export const signout: RequestHandler = (req, res) => {
  res.send("signout");
};

export const generateOtp: RequestHandler = (req, res) => {
  res.send("generateOtp");
};

export const verifyOtp: RequestHandler = (req, res) => {
  res.send("verifyOtp");
};

export const changeDetails: RequestHandler = (req, res) => {
  res.send("changeDetails");
};

export const changePassword: RequestHandler = (req, res) => {
  res.send("changePassword");
};
