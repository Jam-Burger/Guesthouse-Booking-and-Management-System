import express from "express";
import { Booking } from "../models/booking.model.js";
import { Room } from "../models/room.model.js";

const router = express.Router();
const BreakError = {};

const checkCollision = function (item, data) {
  const date1 = (new Date(data.checkInDate)).getTime();
  const date2 = (new Date(data.checkOutDate)).getTime();
  if (date1 > item.checkInDate.getTime() && date1 < item.checkOutDate.getTime()) return true;
  if (date2 > item.checkInDate.getTime() && date2 < item.checkOutDate.getTime()) return true;
  return false;
};

router.get("/", async (req, res) => {
  const hotelName = req.query.hotelName;
  try {
    const data = await Booking.find({});
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
    const data = await Booking.findOne(findObj);
    if (!data) {
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
    const bookingData = req.body;
    const previousBookings = await Booking.find({ roomNo: bookingData.roomNo });
    let isCollision = false;

    previousBookings.forEach((item) => {
      if (checkCollision(item, bookingData)) {
        console.log("Error, Rooms are not available on your specified date");
        isCollision = true;
      }
    });
    if (isCollision) {
      res.json({ msg: "No Rooms are available" });
      return;
    }

    const newBooking = new Booking({ ...bookingData });

    await newBooking.save();
    await Room.findOneAndUpdate({ roomNo: bookingData.roomNo }, { status: "BOOKED" });

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
