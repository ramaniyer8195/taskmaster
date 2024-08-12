import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

export const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET!, (err: any) => {
      if (err) {
        res.status(401).json({ message: "Token Invalid" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Token Invalid" });
  }
};
