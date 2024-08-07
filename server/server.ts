import express from "express";
import mongoose from "mongoose";

const port = 5000 || process.env.PORT;
const app = express();

app.use(express.json());

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
