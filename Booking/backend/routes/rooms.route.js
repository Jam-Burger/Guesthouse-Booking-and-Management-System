import express from "express";
import { Room } from "../models/room.model.js";

const router= express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Room.find({});
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
    const data = await Room.find(findObj);
    if (data.length != 1) {
      res.status(404).json({
        msg: "failure",
        error: "data not found",
      });
    } else {
      res.json({
        msg: "success",
        data: data[0],
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
  const data = req.body;
  const room = new Room(data);
  try {
    await room.save();
    res.status(201).json({
      msg: "success",
      data: data,
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