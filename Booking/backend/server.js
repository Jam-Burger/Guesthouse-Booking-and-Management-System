import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRoute from "./routes/users.route.js";
import hotelsRoute from "./routes/hotels.route.js";
import roomsRoute from "./routes/rooms.route.js";
import bookingsRoute from "./routes/bookings.route.js";
import cors from "cors";

dotenv.config();
const server = express();

server.use(
  cors({
    origin: ['http://localhost:3001','http://localhost:3000'],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

server.use(express.json());
server.use("/users", usersRoute);
server.use("/hotels", hotelsRoute);
server.use("/rooms", roomsRoute);
server.use("/bookings", bookingsRoute);


server.get("/", (req, res) => {
  res.send("Booking Page");
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
