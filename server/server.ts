import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes";
import topicRouter from "./routes/topicRoutes";
import itemRouter from "./routes/itemRoutes";
import statsRouter from "./routes/statsRoutes";
import { requireAuth } from "./middlewares/auth";
import path from "path";

const port = 5000 || process.env.PORT;
const app = express();

app.use(cors({ origin: "*", credentials: true, optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/user", userRouter);
app.use("/api/topic", requireAuth, topicRouter);
app.use("/api/item", requireAuth, itemRouter);
app.use("/api/stats", statsRouter);

// render frontend
app.use(express.static(path.join(__dirname, "/client/dist")));

// render client from any path
app.use("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error(err);
  });
