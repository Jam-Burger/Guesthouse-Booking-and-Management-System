import express from "express";
import { Hotel } from "../models/hotel.model.js";

const router= express.Router();

router.post("/", async (req, res) => {
  const data = req.body;
  const hotel = new Hotel(data);
  try {
    await hotel.save();
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