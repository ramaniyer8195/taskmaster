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

const router = express.Router();

router.get("/getUser", getUser);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/generateOtp", generateOtp);
router.post("/verifyOtp", verifyOtp);
router.put("/changeDetails", changeDetails);
router.post("/changePassword", changePassword);

export default router;
