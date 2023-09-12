import mongoose from "mongoose";
const roomSchema = mongoose.Schema({
  roomNo: String,
  type: String,
  capacity: Number,
  status: String,
  pictures: [String],
  bookingPrice: Number,
  freeCancelation: Boolean,
});
