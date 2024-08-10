import { RequestHandler } from "express";

export const getItems: RequestHandler = (req, res) => {
  res.send("getItems");
};

export const modifyItem: RequestHandler = (req, res) => {
  res.send("modifyItem");
};

export const deleteItem: RequestHandler = (req, res) => {
  res.send("deleteItem");
};

export const addItem: RequestHandler = (req, res) => {
  res.send("addItem");
};
