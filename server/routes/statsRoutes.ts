import express from "express";
import { getStats } from "../controllers/statsController";

const router = express.Router();

router.get("/getStats", getStats);

export default router;
