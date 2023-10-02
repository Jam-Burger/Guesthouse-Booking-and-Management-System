import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
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

export default roomSchema;
export const Room = new mongoose.model("Room", roomSchema);