import mongoose from "mongoose";
import { Hotel } from "./hotel.model.js";


const roomSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  pictures: {
    type: [String],
    required: false,
  },
  rating: {
    type: Number,
    required: true,
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

roomSchema.post("save", async function (room) {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      room.hotelId,
      { $push: { rooms: room._id } },
      { new: true }
    );
    if (!hotel) {
      throw new Error("Hotel not found.");
    }
  } catch (error) {
    console.log(error);
  }
});

export default roomSchema;
export const Room = new mongoose.model("Room", roomSchema);
