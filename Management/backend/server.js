import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import staffRoute from "./routes/staff.route.js";
import itemsRoute from "./routes/items.route.js";
import roomsRoute from "./routes/rooms.route.js";
import bookingsRoute from "./routes/bookings.route.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

dotenv.config();
const server = express();

server.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.BOOKING_FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

server.use(express.json());
server.use(cookieParser());

server.use("/staff", staffRoute);
server.use("/items", itemsRoute);
server.use("/rooms", roomsRoute);
server.use("/bookings", bookingsRoute);

server.get("/", (req, res) => {
  res.send("Management Page");
});

server.get("/me",async (req, res) => {
  const { currentUserToken } = req.cookies;
  console.log("someone called me : ",currentUserToken);
  try {
    const decoded = await jwt.verify(currentUserToken, process.env.JWT_SECRET);
    console.log("data sent")

    res.json({ success: true, data: decoded.currentUser });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
});

server.get("/logout", (req, res) => {
  try {
    res.clearCookie("currentUserToken");
    res.json({
      success: true,
      message: "logged out successfully",
    });
  }
  catch (e) {
    res.status(400).json({ success: false, error: e });
  }
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
