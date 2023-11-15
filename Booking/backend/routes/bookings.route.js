import express from "express";
import { Booking } from "../models/booking.model.js";
import mongoose from "mongoose";

const router = express.Router();
const BreakError = {};

const checkCollision = function (item, data) {
  const date1 = (new Date (data.checkInDate)).getTime();
  const date2 = (new Date (data.checkOutDate)).getTime();
  if (date1 > item.checkInDate.getTime() && date1 < item.checkOutDate.getTime()) return true;
  if (date2 > item.checkInDate.getTime() && date2 < item.checkOutDate.getTime()) return true;
  return false;
};

router.get("/", async (req, res) => {
  const hotelName = req.query.hotelName;
  const findObj = { hotelName: hotelName };
  try {
    const data = await Booking.find(findObj);
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
    const data = await Booking.find(findObj);
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
    const hotelName = data.hotelName;
    const findObj = { hotelName: hotelName, roomNo: data.roomNo };
    const storedData = await Booking.find(findObj);
    let isCollision = false;
    try {
      storedData.forEach((item) => {
        if (checkCollision(item, data)) {
          console.log("Error, Rooms are not available on your specified date");
          isCollision=true;
          throw BreakError;
        }
      });
    } catch (err) {
      if (err !== BreakError) throw err;
    }
    if (isCollision){
      res.json({msg : "No Rooms are available"});
      return;
    }

    const newBooking = new Booking({ ...data });
    await newBooking.save();
    res.status(201).json({
      msg: "success",
      data: newBooking,
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
