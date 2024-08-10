import { RequestHandler } from "express";

export const getTopics: RequestHandler = (req, res) => {
  res.send("getTopics");
};

export const getTopic: RequestHandler = (req, res) => {
  res.send("getTopic");
};

export const modifyTopic: RequestHandler = (req, res) => {
  res.send("modifyTopic");
};

export const deleteTopic: RequestHandler = (req, res) => {
  res.send("deleteTopic");
};

export const addTopic: RequestHandler = (req, res) => {
  res.send("addTopic");
};
