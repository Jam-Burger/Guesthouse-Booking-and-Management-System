import express from "express";
import { Item } from "../models/item.model.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Item.find({});
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
    const data = await Item.find(findObj);
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
        const item = new Item({ ...data});
        await item.save();
        res.status(201).json({
            msg: "success",
            data: item,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "failure",
            error: e,
        });
    }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body; 
  const findObj = { itemId: id };

  try {
    const data = await Item.findOneAndUpdate(findObj,updates);
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
export default router;
