import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes";
import topicRouter from "./routes/topicRoutes";
import itemRouter from "./routes/itemRoutes";
import statsRouter from "./routes/statsRoutes";

const port = 5000 || process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/user", userRouter);
app.use("/api/topic", topicRouter);
app.use("/api/item", itemRouter);
app.use("/api/stats", statsRouter);

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
