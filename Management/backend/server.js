import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import staffRoute from "./routes/staff.route.js";
import itemsRoute from "./routes/items.route.js";
import roomsRoute from "./routes/rooms.route.js";
import bookingsRoute from "./routes/bookings.route.js";
import reservationRoute from "./routes/reservations.route.js"
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
server.use("/reservations", reservationRoute);

server.get("/", (req, res) => {
  res.send("Management Page");
});

server.get("/logout", (req, res) => {
  try {
    res.clearCookie("currentStaffToken");
    res.json({
      success: true,
      message: "logged out successfully",
    });
  }
  catch (e) {
    res.status(400).json({ success: false, error: e });
  }
});

server.get("/me", (req, res) => {
  const { currentStaffToken } = req.cookies;
  try {
    const decoded = jwt.verify(currentStaffToken, process.env.JWT_SECRET);
    res.json({ success: true, data: decoded.currentStaff });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
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
