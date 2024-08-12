import express from "express";
import {
  changeDetails,
  changePassword,
  generateOtp,
  getUser,
  signin,
  signout,
  signup,
  verifyOtp,
} from "../controllers/userController";
import { requireAuth } from "../middlewares/auth";

const router = express.Router();

router.get("/getUser", requireAuth, getUser);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.get("/generateOtp", requireAuth, generateOtp);
router.post("/verifyOtp", requireAuth, verifyOtp);
router.put("/changeDetails", requireAuth, changeDetails);
router.put("/changePassword", requireAuth, changePassword);

export default router;
