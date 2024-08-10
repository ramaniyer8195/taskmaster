import express from "express";
import {
  addTopic,
  deleteTopic,
  getTopic,
  getTopics,
  modifyTopic,
} from "../controllers/topicController";

const router = express.Router();

router.get("/getTopics", getTopics);
router.get("/getTopic", getTopic);
router.put("/modifyTopic", modifyTopic);
router.delete("/deleteTopic", deleteTopic);
router.post("/addTopic", addTopic);

export default router;
