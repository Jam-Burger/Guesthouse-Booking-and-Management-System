import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const server = express();

server.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

server.use(express.json());
server.get("/", (req, res) => {
  switch (mongoose.connection.readyState) {
    case 0:
      res.send("Disconnected with database");
    case 1:
      res.send("Connected with database");
    case 2:
      res.send("Connecting to database");
    case 3:
      res.send("Disconnecting to database");
    case 99:
      res.send("Unititialized database");
    default:
      res.send("Unknown error!");
  }
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("successfully connected mongoDB!");
  })
  .catch((error) => {
    console.log(error);
  });

server.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
