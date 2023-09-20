import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";

dotenv.config();
const server = express();

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

server.get("/", (req, res) => {
  res.send("Booking Page");
});

server.get("/users", (req, res) => {
  const id = req.query.id;
  const name = req.query.name;
  if (Object.keys(req.query).length === 0) {
    User.find({})
      .then((foundUsers) => {
        res.send(foundUsers);
      })
      .catch((err) => {
        res.status(400).send("error occured: " + err);
      });
  } else {
    res.send("user with id : " + id);
  }
  // if (req.query.id!==undefined) {
  //   res.send("user with id : " + id);
  // } else if(req.query.name!==undefined){
  //   res.send("user with name : " + name);
  // }else {
  //   res.send("All users");
  // }
});
