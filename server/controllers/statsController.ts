import { RequestHandler } from "express";
import { GetStatsRes } from "../interfaces/controllers";
import User from "../models/User";
import Note from "../models/Note";
import Todo from "../models/Todo";

export const getStats: RequestHandler<{}, GetStatsRes> = async (req, res) => {
  const userCount = (await User.countDocuments({})) || 0;
  const notesCount = (await Note.countDocuments({})) || 0;
  const todosCount = (await Todo.countDocuments({})) || 0;

  res.status(200).json({
    data: { users: userCount, notes: notesCount, todos: todosCount },
  });
};
