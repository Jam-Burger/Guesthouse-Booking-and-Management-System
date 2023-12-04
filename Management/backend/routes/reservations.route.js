import express from "express";
import { Room } from "../models/room.model.js";
import { Booking } from "../models/booking.model.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let data = [];
    let allRooms = await Room.find({}).sort({ roomNo: 1 });
    const allBookings = await Booking.find({});
    const currentDate = new Date();
    const currentBookings = allBookings.filter((booking) => {
      return (
        currentDate > booking.checkInDate && currentDate < booking.checkOutDate
      );
    });
    allRooms.forEach((room) => {
      let guestDetails = {fullName:"-",age:"-",gender:"-",contactNo:"-"};
      let checkInDate = "-";
      let checkOutDate = "-";
      let status = "Available"
      currentBookings.forEach((booking) => {
        if (room.roomNo === booking.roomNo) {
          guestDetails = booking.guestDetails;
          status = "Booked"
          checkInDate = booking.checkInDate;
          checkOutDate = booking.checkOutDate;
          return;
        }
      });
      data.push({ room, guestDetails , status, checkInDate, checkOutDate });
    });

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

export default router;
