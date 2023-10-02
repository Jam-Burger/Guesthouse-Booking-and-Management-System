import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const server = express();

server.get("/", (req, res) => {
  res.send("Management Page");
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("successfully connected mongoDB!");
    server.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
