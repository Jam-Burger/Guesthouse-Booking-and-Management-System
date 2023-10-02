import express from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const router = express.Router();
const saltRounds = 10;

// find(query, queryProjection)

router.get("/", async (req, res) => {
  try {
    const data = await User.find({});
    res.json({
      msg: "success",
      data: data,
    });
  } catch (e) {
    res.status(400).json({
      msg: "failure",
      error: e,
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const findObj = { _id: id };

  try {
    const data = await User.find(findObj);
    if (data.length == 0) {
      res.status(404).json({
        msg: "failure",
        error: "data not found",
      });
    } else {
      res.json({
        msg: "success",
        data: data,
      });
    }
  } catch (e) {
    res.status(400).json({
      msg: "failure",
      error: e,
    });
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
