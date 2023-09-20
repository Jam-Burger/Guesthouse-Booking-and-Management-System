import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Hotel, User, Room, Review } from "./models/index.model.js";

dotenv.config();
const server = express();

server.use(express.json());

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

  server.post("/hotels", (req, res) => {
    const data = req.body;
    console.log(data);
    const hotel = new Hotel(data);
    hotel
      .save()
      .then((val) => {
        res.send({ msg: "success", data: val });
      })
      .catch((e) => {
        res.status(400).send({ msg: "failure", error: e });
      });
  });

  server.post("/users", (req, res) => {
    const data = req.body;
    console.log(data);
    const user = new User(data);
    user
      .save()
      .then((val) => {
        res.send({ msg: "success", data: val });
      })
      .catch((e) => {
        res.status(400).send({ msg: "failure", error: e });
      });
  });

  server.post("/rooms", (req, res) => {
    const data = req.body;
    console.log(data);
    const room = new Room(data);
    room
      .save()
      .then((val) => {
        res.send({ msg: "success", data: val });
      })
      .catch((e) => {
        res.status(400).send({ msg: "failure", error: e });
      });
  });

  server.post("/reviews", (req, res) => {
    const data = req.body;
    console.log(data);
    const review = new Review(data);
    review
      .save()
      .then((val) => {
        res.send({ msg: "success", data: val });
      })
      .catch((e) => {
        res.status(400).send({ msg: "failure", error: e });
      });
  });
});
