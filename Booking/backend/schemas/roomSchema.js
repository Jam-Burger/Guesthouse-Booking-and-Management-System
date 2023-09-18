import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  pictures: {
    type: [String],
    required: false,
  },
  bookingPrice: {
    type: Number,
    required: true,
  },
  freeCancelation: {
    type: Boolean,
    required: true,
  },
});
