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
});

export default roomSchema;
export const Room = new mongoose.model("Room", roomSchema);
