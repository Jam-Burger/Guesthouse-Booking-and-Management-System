import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRoute from "./routes/users.route.js";
import hotelsRoute from "./routes/hotels.route.js";
import roomsRoute from "./routes/rooms.route.js";
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

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("successfully connected mongoDB!");
    server.get("/", (req, res) => {
      res.send("Booking Page");
    });
    server.use("/users", usersRoute);
    server.use("/hotels", hotelsRoute);
    server.use("/rooms", roomsRoute);
  })
  .catch((error) => {
    server.get("/", (req, res) => {
      res.status(404).send("Can not connect to database");
    });
    console.log(error);
  });

server.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
