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
  // console.log(new Date(checkInDate), new Date(checkOutDate), booking.checkInDate, booking.checkOutDate);
  return false;
};

router.patch("/available", async (req, res) => {
  const { type, checkInDate, checkOutDate } = req.body;
  if (new Date(checkInDate).getTime() > new Date(checkOutDate).getTime()) {
    res.json({
      msg: "success",
      data: []
    });
    return;
  }
  try {
    const allRooms = await Room.find({ type: type });
    const availableRooms = await Promise.all(
      allRooms.map(async (room) => {
        const bookedDates = [];
        const previousBookings = await Booking.find({ roomNo: room.roomNo });

        previousBookings.forEach((booking) => {
          const startDate = booking.checkInDate;
          const endDate = booking.checkOutDate;

          for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
            bookedDates.push(date.toISOString().substring(0, 10)); // Convert Date to YYYY-MM-DD format
          }
        });

        const isAvailable = !bookedDates.some((bookedDate) => {
          return (
            checkInDate <= bookedDate &&
            checkOutDate >= bookedDate
          );
        });

        return isAvailable ? room : null;
      })
    );

    res.json({
      msg: "success",
      data: availableRooms.filter((room) => room !== null), // Filter out null values
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