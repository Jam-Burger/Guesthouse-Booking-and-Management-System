import express from "express";
import { Booking } from "../models/booking.model.js";
import { Room } from "../models/room.model.js";

const router = express.Router();
const BreakError = {};

const isSameDate = (date1, date2) => {
  return new Date(date1) === new Date(date2);
}

const checkCollision = function (prevBooking, data) {
  const date1 = (new Date(data.checkInDate)).getTime();
  const date2 = (new Date(data.checkOutDate)).getTime();
  if (date1 > prevBooking.checkInDate.getTime() && date1 < prevBooking.checkOutDate.getTime()) return true;
  if (date2 > prevBooking.checkInDate.getTime() && date2 < prevBooking.checkOutDate.getTime()) return true;
  return false;
};

router.get("/", async (req, res) => {
  // const hotelName = req.query.hotelName;
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

    previousBookings.forEach((prevBooking) => {
      if (checkCollision(prevBooking, bookingData)) {
        console.log("Error, Rooms are not available on your specified date");
        isCollision = true;
      }
    });
    if (isCollision) {
      res.json({ success: "false", msg: "Error, Rooms are not available on your specified date" });
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

router.patch("/", async (req, res) => {
  try {
    const data = req.body;
    const prevData = data.oldData;
    prevData.checkInDate = new Date(prevData.checkInDate);
    prevData.checkOutDate = new Date(prevData.checkOutDate);
    const newData = data.newData;

    console.log("prevData : ", prevData);
    console.log("newData : ", newData);

    const allBookings = await Booking.find({ roomNo: prevData.roomNo, checkInDate: { $ne: prevData.checkInDate } });
    console.log(allBookings.length);
    let isCollision = false;

    allBookings.forEach((prevBooking) => {
      console.log(prevBooking);
      if (checkCollision(prevBooking, { checkInDate: newData.checkInDate, checkOutDate: newData.checkOutDate })) {
        isCollision = true;
        return;
      }
    });

    if (isCollision) {
      res.json({ success: "false", msg: "Error, Rooms are not available on your specified date" });
      return;
    }

    const booking = await Booking.findOne({ roomNo: prevData.roomNo, checkInDate: prevData.checkInDate, checkOutDate: prevData.checkOutDate });
    console.log(booking);
    for (const field in newData) {
      if (typeof newData[field] === 'object') {
        for (const nestedField in newData[field]) {
          booking[field][nestedField] = newData[field][nestedField];
        }
      } else {
        booking[field] = newData[field];
      }
    }
    console.log(booking);

    await booking.save();
    console.log("updated successfully!");
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "failure",
      error: e,
    });
  }
});

export default router;
