import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const reservationSchema = new mongoose.Schema({
  arrivalDate: {
    type: Date,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  roomNo: {
    type: String,
    required: true,
  },
  guestDetails: {
    type: [guestSchema],
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
});

export default reservationSchema;
export const Room = new mongoose.model("Reservation", reservationSchema);
