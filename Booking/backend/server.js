import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRoute from "./routes/users.route.js";
import hotelsRoute from "./routes/hotels.route.js";
import roomsRoute from "./routes/rooms.route.js";
import reviewsRoute from "./routes/reviews.route.js";


dotenv.config();
const server = express();

server.use(express.json());
server.use('/users', usersRoute);
server.use('/hotels', hotelsRoute);
server.use('/rooms', roomsRoute);
server.use('/reviews', reviewsRoute);

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

