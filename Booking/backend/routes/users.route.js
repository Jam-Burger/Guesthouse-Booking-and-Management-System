import express from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const router= express.Router();
const saltRounds = 10;

router.get("/", (req, res) => {
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
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const plainPassword = data.password;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    const user = new User({ ...data, password: hashedPassword });
    await user.save();
    res.status(201).json({
      msg: "success",
      data: user,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "failure",
      error: e,
    });
  }
});

export default router;