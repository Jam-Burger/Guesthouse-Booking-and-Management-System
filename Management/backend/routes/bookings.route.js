import express from "express";
import { Booking } from "../models/booking.model.js";
import { Room } from "../models/room.model.js";

const router = express.Router();
const BreakError = {};

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
      res.json({ success:"false", msg: "Error, Rooms are not available on your specified date" });
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
    const newData = data.newData;
    prevData.checkInDate = prevData.checkInDate+"T00:00:00.000+00:00";
    prevData.checkOutDate = prevData.checkOutDate+"T00:00:00.000+00:00";
    newData.checkInDate = newData.checkInDate+"+00:00";
    newData.checkOutDate = newData.checkOutDate+"+00:00";

    if ((newData.checkInDate === prevData.checkInDate) && (newData.checkOutDate === prevData.checkOutDate))
    {
      // const { guestDetails.fullName : fullName } = newData;
      const updatedBooking = await Booking.findOneAndUpdate({roomNo: prevData.roomNo, checkInDate: prevData.checkInDate, checkOutDate : prevData.checkOutDate}, newData);
    }

    console.log("prevData : ",prevData);
    console.log("newData : ",newData);
    const prevBooking = await Booking.find({roomNo: prevData.roomNo, checkInDate: prevData.checkInDate, checkOutDate : prevData.checkOutDate});
    console.log("This is prev BOoking : ",prevBooking);

    // const bookingData = req.body;
    // const previousBookings = await Booking.find({ roomNo: bookingData.roomNo });
    // let isCollision = false;

    // previousBookings.forEach((item) => {
    //   if (checkCollision(item, bookingData)) {
    //     console.log("Error, Rooms are not available on your specified date");
    //     isCollision = true;
    //   }
    // });
    // if (isCollision) {
    //   res.json({ msg: "No Rooms are available" });
    //   return;
    // }
  }catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "failure",
      error: e,
    });
  }
});

export default router;
