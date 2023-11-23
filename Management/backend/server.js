import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import staffRoute from "./routes/staff.route.js";
import itemsRoute from "./routes/items.route.js";
import roomsRoute from "./routes/rooms.route.js";
import bookingsRoute from "./routes/bookings.route.js";
import cookieParser from "cookie-parser";
import session from "express-session";

dotenv.config();
const server = express();
server.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.BOOKING_FRONTEND_URL],
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

server.use(express.json());
server.use(cookieParser());

if (server.get('env') === 'production') {
  server.set('trust proxy', 1) // trust first proxy
  session.cookie.secure = true // serve secure cookies
}

server.use("/staff", staffRoute);
server.use("/items", itemsRoute);
server.use("/rooms", roomsRoute);
server.use("/bookings", bookingsRoute);

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
