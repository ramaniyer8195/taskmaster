import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { isEmpty } from "lodash";
import Note from "../models/Note";
import Todo from "../models/Todo";
import {
  AddItemReq,
  AddItemRes,
  DeleteItemReq,
  DeleteItemRes,
  GetItemsQuery,
  GetItemsRes,
  ModifyItemReq,
  ModifyItemReqData,
  ModifyItemRes,
} from "../interfaces/controllers";
import Topic from "../models/Topic";
import {
  Note as NoteSchema,
  Todo as TodoSchema,
} from "../interfaces/frontendSchema";
import { ITEM_ERRORS } from "../constants/errors";
import { ValidationErrors } from "../interfaces/schema";
import {
  handleAddItemErrors,
  handleDeleteNoteErrors,
  handleDeleteTodoErrors,
  handleModifyItemErrors,
} from "../utils/errorHandlers";

export const getItems: RequestHandler<
  {},
  GetItemsRes,
  {},
  GetItemsQuery
> = async (req, res) => {
  const { search = ".", ...queries } = req.query;
  const token = req.cookies.jwt;

  const decodedToken = jwt.decode(token, { complete: true });
  const _id = (decodedToken?.payload as jwt.JwtPayload)?.id;

  try {
    const notes = await Note.find({
      title: { $regex: search, $options: "i" },
      userId: _id,
      ...queries,
    });
    const updatedNotes: NoteSchema[] = [];
    for (const note of notes) {
      const topicId = note.topicId;
      const topic = await Topic.findById(topicId);
      const topicTitle = topic?.title || "";

      updatedNotes.push({
        _id: note._id,
        title: note.title,
        content: note.content,
        createdAt: note.createdAt,
        editedAt: note.editedAt,
        isDeleted: note.isDeleted,
        isArchived: note.isArchived,
        isFavourite: note.isFavourite,
        topic: topicTitle,
        type: "note",
      });
    }
    const todos = await Todo.find({
      title: { $regex: search, $options: "i" },
      userId: _id,
      ...queries,
    });
    const updatedTodos: TodoSchema[] = [];
    for (const todo of todos) {
      const topicId = todo.topicId;
      const topic = await Topic.findById(topicId);
      const topicTitle = topic?.title || "";

      updatedTodos.push({
        _id: todo._id,
        title: todo.title,
        content: todo.content,
        createdAt: todo.createdAt,
        editedAt: todo.editedAt,
        isDeleted: todo.isDeleted,
        isArchived: todo.isArchived,
        isFavourite: todo.isFavourite,
        topic: topicTitle,
        type: "todo",
      });
    }

    res.status(200).json({ data: [...updatedNotes, ...updatedTodos] });
  } catch (err) {
    res.status(400).json({ data: [] });
  }
};

export const modifyItem: RequestHandler<
  {},
  ModifyItemRes,
  ModifyItemReq
> = async (req, res) => {
  const { data, type, itemId } = req.body;
  const token = req.cookies.jwt;

  const decodedToken = jwt.decode(token, { complete: true });
  const _id = (decodedToken?.payload as jwt.JwtPayload)?.id;

  try {
    if (type === "note") {
      const modifyRes = await modifyNote(data, itemId, _id);

      if (modifyRes.error) {
        res.status(400).json(modifyRes);
      } else {
        res.status(200).json(modifyRes);
      }
    } else {
      const modifyRes = await modifyTodo(data, itemId, _id);

      if (modifyRes.error) {
        res.status(400).json(modifyRes);
      } else {
        res.status(200).json(modifyRes);
      }
    }
  } catch (err) {
    res.status(400).json({ message: "", error: {} });
  }
};

const modifyNote = async (
  data: ModifyItemReqData,
  itemId: string,
  userId: string
) => {
  try {
    if (isEmpty(data)) {
      throw {
        message: "Note validation failed",
        errors: {
          update: {
            properties: {
              message: ITEM_ERRORS.NOTHING_TO_UPDATE,
              path: "update",
            },
          },
        },
      } as ValidationErrors;
    }

    if (data.title && data.title === "") {
      throw {
        message: "Note validation failed",
        errors: {
          title: {
            properties: {
              message: ITEM_ERRORS.NO_TITLE,
              path: "title",
            },
          },
        },
      } as ValidationErrors;
    }

    await Note.updateOne({ _id: itemId, userId }, { $set: data });

    return { message: "Note updated successfully", error: {} };
  } catch (err) {
    const errors = handleModifyItemErrors(err as ValidationErrors, "note");
    return { message: "", error: errors };
  }
};

const modifyTodo = async (
  data: ModifyItemReqData,
  itemId: string,
  userId: string
) => {
  try {
    if (isEmpty(data)) {
      throw {
        message: "Todo validation failed",
        errors: {
          update: {
            properties: {
              message: ITEM_ERRORS.NOTHING_TO_UPDATE,
              path: "update",
            },
          },
        },
      } as ValidationErrors;
    }

    if (data.title === "") {
      throw {
        message: "Todo validation failed",
        errors: {
          title: {
            properties: {
              message: ITEM_ERRORS.NO_TITLE,
              path: "title",
            },
          },
        },
      } as ValidationErrors;
    }

    await Todo.updateOne({ _id: itemId, userId }, { $set: data });

    return { message: "Todo updated successfully", error: {} };
  } catch (err) {
    const errors = handleModifyItemErrors(err as ValidationErrors, "todo");
    return { message: "", error: errors };
  }
};

export const deleteItem: RequestHandler<
  {},
  DeleteItemRes,
  DeleteItemReq
> = async (req, res) => {
  const { itemId, type } = req.body;
  const token = req.cookies.jwt;

  const decodedToken = jwt.decode(token, { complete: true });
  const _id = (decodedToken?.payload as jwt.JwtPayload)?.id;

  try {
    if (type === "note") {
      const deleteRes = await deleteNote(itemId, _id);

      if (isEmpty(deleteRes.error)) {
        res.status(200).json(deleteRes);
      } else {
        res.status(400).json(deleteRes);
      }
    } else {
      const deleteRes = await deleteTodo(itemId, _id);

      if (isEmpty(deleteRes.error)) {
        res.status(200).json(deleteRes);
      } else {
        res.status(400).json(deleteRes);
      }
    }
  } catch (err) {
    res.status(400).json({ message: "", data: null, error: {} });
  }
};

const deleteNote = async (
  itemId: string,
  userId: string
): Promise<DeleteItemRes> => {
  try {
    const note = await Note.findOne({ _id: itemId, userId });

    if (!note) {
      throw {
        message: "Note validation failed",
        errors: {
          note: {
            properties: {
              message: ITEM_ERRORS.DOESNT_EXIST,
              path: "note",
            },
          },
        },
      } as ValidationErrors;
    }

    const topicId = note.topicId;
    const topic = await Topic.findById(topicId);
    const topicTitle = topic?.title || "";
    const updatedNote = {
      _id: note._id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      editedAt: note.editedAt,
      isDeleted: note.isDeleted,
      isArchived: note.isArchived,
      isFavourite: note.isFavourite,
      topic: topicTitle,
      type: "note",
    };

    await Note.deleteOne({ _id: itemId, userId });

    return { message: "Item deleted", data: updatedNote, error: {} };
  } catch (err) {
    const errors = handleDeleteNoteErrors(err as ValidationErrors);
    return { message: "", data: null, error: errors };
  }
};

const deleteTodo = async (
  itemId: string,
  userId: string
): Promise<DeleteItemRes> => {
  try {
    const todo = await Todo.findOne({ _id: itemId, userId });

    if (!todo) {
      throw {
        message: "Todo validation failed",
        errors: {
          todo: {
            properties: {
              message: ITEM_ERRORS.DOESNT_EXIST,
              path: "todo",
            },
          },
        },
      } as ValidationErrors;
    }

    const topicId = todo.topicId;
    const topic = await Topic.findById(topicId);
    const topicTitle = topic?.title || "";
    const updatedNote = {
      _id: todo._id,
      title: todo.title,
      content: todo.content,
      createdAt: todo.createdAt,
      editedAt: todo.editedAt,
      isDeleted: todo.isDeleted,
      isArchived: todo.isArchived,
      isFavourite: todo.isFavourite,
      topic: topicTitle,
      type: "todo",
    };

    await Todo.deleteOne({ _id: itemId, userId });

    return { message: "Item deleted", data: updatedNote, error: {} };
  } catch (err) {
    const errors = handleDeleteTodoErrors(err as ValidationErrors);
    return { message: "", data: null, error: errors };
  }
};

export const addItem: RequestHandler<{}, AddItemRes, AddItemReq> = async (
  req,
  res
) => {
  const { title, topicId, type } = req.body;
  const token = req.cookies.jwt;

  const decodedToken = jwt.decode(token, { complete: true });
  const _id = (decodedToken?.payload as jwt.JwtPayload)?.id;

  try {
    if (type === "note") {
      const noteRes = await addNote(title, _id, topicId || null);

      if (isEmpty(noteRes.error)) {
        res.status(200).json(noteRes);
      } else {
        res.status(400).json(noteRes);
      }
    } else {
      const todoRes = await addTodo(title, _id, topicId || null);

      if (isEmpty(todoRes.error)) {
        res.status(200).json(todoRes);
      } else {
        res.status(400).json(todoRes);
      }
    }
  } catch (err) {
    res.status(400).json({ data: null, error: {} });
  }
};

const addNote = async (
  title: string,
  userId: string,
  topicId: string | null
): Promise<AddItemRes> => {
  try {
    const note = await Note.create({ title, userId, topicId });

    return { data: note._id, error: {} };
  } catch (err) {
    const errors = handleAddItemErrors(err as ValidationErrors, "note");
    return { data: null, error: errors };
  }
};

const addTodo = async (
  title: string,
  userId: string,
  topicId: string | null
): Promise<AddItemRes> => {
  try {
    const todo = await Todo.create({ title, userId, topicId });

    return { data: todo._id, error: {} };
  } catch (err) {
    const errors = handleAddItemErrors(err as ValidationErrors, "todo");
    return { data: null, error: errors };
  }
};
