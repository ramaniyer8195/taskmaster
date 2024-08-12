import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { ValidationErrors } from "../interfaces/schema";
import {
  handleAddTopicErrors,
  handleDeleteTopicErrors,
  handleGetTopicErrors,
  handleModifyTopicErrors,
} from "../utils/errorHandlers";
import Topic from "../models/Topic";
import {
  GetTopicParams,
  GetTopicsRes,
  GetTopicRes,
  ModifyTopicRes,
  ModifyTopicReq,
  DeleteTopicRes,
  DeleteTopicReq,
  AddTopicRes,
  AddTopicReq,
} from "../interfaces/controllers";
import { TOPIC_ERRORS } from "../constants/errors";

export const getTopics: RequestHandler<{}, GetTopicsRes> = async (req, res) => {
  const token = req.cookies.jwt;

  const decodedToken = jwt.decode(token, { complete: true });
  const _id = (decodedToken?.payload as jwt.JwtPayload)?.id;

  try {
    const topics = await Topic.find({ userId: _id });

    if (!topics) {
      res.status(200).json({ data: null, error: {} });
    }

    res.status(200).json({ data: topics, error: {} });
  } catch (err) {
    res.status(400).json({ data: null, error: err });
  }
};

export const getTopic: RequestHandler<GetTopicParams, GetTopicRes> = async (
  req,
  res
) => {
  const { topicId } = req.params;
  const token = req.cookies.jwt;

  const decodedToken = jwt.decode(token, { complete: true });
  const _id = (decodedToken?.payload as jwt.JwtPayload)?.id;

  try {
    const topic = await Topic.findOne({ _id: topicId, userId: _id });

    if (!topic) {
      throw {
        message: "Topic validation failed",
        errors: {
          topic: {
            properties: {
              message: TOPIC_ERRORS.DOESNT_EXIST,
              path: "topic",
            },
          },
        },
      } as ValidationErrors;
    }

    res.status(200).json({ data: topic, error: {} });
  } catch (err) {
    const errors = handleGetTopicErrors(err as ValidationErrors);
    res.status(400).json({ data: null, error: errors });
  }
};

export const modifyTopic: RequestHandler<
  {},
  ModifyTopicRes,
  ModifyTopicReq
> = async (req, res) => {
  const { title, color, topicId } = req.body;
  const token = req.cookies.jwt;

  const decodedToken = jwt.decode(token, { complete: true });
  const _id = (decodedToken?.payload as jwt.JwtPayload)?.id;

  try {
    if (!title && !color) {
      throw {
        message: "Topic validation failed",
        errors: {
          update: {
            properties: {
              message: TOPIC_ERRORS.NOTHING_TO_UPDATE,
              path: "update",
            },
          },
        },
      } as ValidationErrors;
    }

    const topic = await Topic.findOne({ _id: topicId, userId: _id });

    if (!topic) {
      throw {
        message: "Topic validation failed",
        errors: {
          topic: {
            properties: {
              message: TOPIC_ERRORS.DOESNT_EXIST,
              path: "topic",
            },
          },
        },
      } as ValidationErrors;
    }

    await Topic.updateOne(
      { _id: topicId, userId: _id },
      {
        $set: {
          ...(title ? { title } : {}),
          ...(color ? { color } : {}),
        },
      }
    );

    res.status(200).json({ message: "Topic updated", error: {} });
  } catch (err) {
    const errors = handleModifyTopicErrors(err as ValidationErrors);
    res.status(400).json({ message: "", error: errors });
  }
};

export const deleteTopic: RequestHandler<
  {},
  DeleteTopicRes,
  DeleteTopicReq
> = async (req, res) => {
  const { topicId } = req.body;
  const token = req.cookies.jwt;

  const decodedToken = jwt.decode(token, { complete: true });
  const _id = (decodedToken?.payload as jwt.JwtPayload)?.id;

  try {
    const topic = await Topic.findOne({ _id: topicId, userId: _id });

    if (!topic) {
      throw {
        message: "Topic validation failed",
        errors: {
          topic: {
            properties: {
              message: TOPIC_ERRORS.DOESNT_EXIST,
              path: "topic",
            },
          },
        },
      } as ValidationErrors;
    }

    await Topic.deleteOne({ _id: topicId, userId: _id });

    res.status(200).json({ message: "Topic deleted", data: topic, error: {} });
  } catch (err) {
    const errors = handleDeleteTopicErrors(err as ValidationErrors);
    res.status(400).json({ message: "", data: null, error: errors });
  }
};

export const addTopic: RequestHandler<{}, AddTopicRes, AddTopicReq> = async (
  req,
  res
) => {
  const { title, color } = req.body;
  const token = req.cookies.jwt;

  const decodedToken = jwt.decode(token, { complete: true });
  const _id = (decodedToken?.payload as jwt.JwtPayload)?.id;

  try {
    const newTopic = await Topic.create({ title, color, userId: _id });

    res.status(201).json({ data: newTopic._id, error: {} });
  } catch (err) {
    const errors = handleAddTopicErrors(err as ValidationErrors);
    res.status(400).json({ data: null, error: errors });
  }
};
