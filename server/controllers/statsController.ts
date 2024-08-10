import { RequestHandler } from "express";

export const getStats: RequestHandler = (req, res) => {
  res.send("stats");
};
