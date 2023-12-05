import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRoute from "./routes/users.route.js";
import hotelsRoute from "./routes/hotels.route.js";
import roomsRoute from "./routes/rooms.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

dotenv.config();
const server = express();

server.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);

server.use(express.json());
server.use(cookieParser());

server.use("/users", usersRoute);
server.use("/hotels", hotelsRoute);
server.use("/rooms", roomsRoute);

server.get("/", (req, res) => {
  res.send("Booking Page");
});

server.get("/logout", (req, res) => {
  try {
    res.clearCookie("currentUserToken", {
      secure: process.env.NODE_ENV !== "development",
      sameSite: process.env.NODE_ENV !== "development" ? 'none' : 'lax',
      // httpOnly: true,
    });
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
  const { currentUserToken } = req.cookies;
  try {
    const decoded = jwt.verify(currentUserToken, process.env.JWT_SECRET);
    res.json({ success: true, data: decoded.currentUser });
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
