import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import staffRoute from "./routes/staff.route.js";
import itemsRoute from "./routes/items.route.js";
import {auth} from './auth.js';
import expressSession from "express-session";
import bcrypt from "bcrypt";
import { Staff } from "./models/staff.model.js";
const saltRounds = 10;

// find(query, queryProjection)
async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  console.log(typeof result);
  console.log(result);
  return result;
}

dotenv.config();
const server = express();
server.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

server.use(express.json());



server.post("/login", async (req, res) => { // /users/login
  try {
    const data = req.body;
    const plainPassword = data.password;
    const emailId = data.emailId;
    Staff.findOne({ emailId: emailId })
      .then(async (staff) => {
        if (!staff) {
          res.json({ msg: "No such Email found" });
        } else if (!(await comparePassword(plainPassword, staff.password))) {
          res.json({ msg: "Wrong Password, Try again." });
        } else {
          res.json({ msg: "Hooray! You have successfully logged in", staff: staff, redirect:true});
        }
      })
      .catch((err) => {
        console.log(err);
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        msg: "failure",
        error: e,
      });
    }
  });
  // Initialize Express session middleware
  server.use(expressSession(auth.sessionOptions));
  
// Initialize Passport.js
server.use(passport.initialize());
server.use(passport.session());

server.use("/staff", auth.isAuthenticated, auth.isAdmin, staffRoute);
server.use("/items", itemsRoute);

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
