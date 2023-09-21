import express from "express";
import { Room } from "../models/room.model.js";

const router= express.Router();

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