import express from "express";
import {
  addItem,
  deleteItem,
  getItems,
  modifyItem,
} from "../controllers/itemController";

const router = express.Router();

router.get("/getItems", getItems);
router.put("/modifyItem", modifyItem);
router.post("/addItem", addItem);
router.delete("/deleteItem", deleteItem);

export default router;
