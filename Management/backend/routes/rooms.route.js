import express from "express";
import { Room } from "../models/room.model.js";
import { Booking } from "../models/booking.model.js";

const router = express.Router();

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

const checkCollision = (booking, checkInDate, checkOutDate) => {
  const date1 = new Date(checkInDate).getTime();
  const date2 = new Date(checkOutDate).getTime();
  const date3 = booking.checkInDate.getTime();
  const date4 = booking.checkOutDate.getTime();

  
  if (date1 >= date3 && date1 < date4) return true;
  if (date2 > date3) return true;
  console.log(new Date(checkInDate), new Date(checkOutDate), booking.checkInDate, booking.checkOutDate);
  return false;
};

router.patch("/available", async (req, res) => {
  const { type, checkInDate, checkOutDate } = req.body;
  // console.log(req.body);
  try {
    const allRooms = await Room.find({ type: type });
    const availableRooms= allRooms.filter(async (room) => {
      const previousBookings = await Booking.find({ roomNo: room.roomNo });
      let isCollision = previousBookings.length > 0;
      // console.log(previousBookings);
      previousBookings.forEach((booking) => {
        if (checkCollision(booking, checkInDate, checkOutDate)) {
          isCollision = true;
        }
      });
      return !isCollision;
    });
    // console.log(availableRooms);
    res.json({
      msg: "success",
      data: availableRooms,
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
    const data = await Room.findOne(findObj);
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