import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import staffRoute from "./routes/staff.route.js";
import itemsRoute from "./routes/items.route.js";
import roomsRoute from "./routes/rooms.route.js";
import bookingsRoute from "./routes/bookings.route.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

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
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.use("/staff", staffRoute);
server.use("/items", itemsRoute);
server.use("/rooms", roomsRoute);
server.use("/bookings", bookingsRoute);

server.get("/", (req, res) => {
  res.send("Management Page");
});

server.post("/check", (req, res) => {
  const user = {
    id: 1,
    name: "Divyam",
    password: "op",
  };
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    })
    .json({ success: true, token });
});

server.get("/protected", async (req, res) => {
  const { token } = req.cookies;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: `Welcome`, decoded });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access" });
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
