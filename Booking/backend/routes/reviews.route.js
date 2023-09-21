import express from "express";
import { Review } from "../models/review.model.js";

const router= express.Router();

router.post("/", async (req, res) => {
  const data = req.body;
  const review = new Review(data);
  try {
    await review.save();
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