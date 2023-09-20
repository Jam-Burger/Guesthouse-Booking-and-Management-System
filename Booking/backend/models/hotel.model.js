import mongoose from "mongoose";
import roomSchema from "./room.model.js";
import reviewSchema from "./review.model.js";


const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rooms: {
      type: [roomSchema],
      required: true,
    },
    pictures: {
      type: [String],
      required: false,
    },
    contactNo: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviews: {
      type: [reviewSchema],
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: false,
  }
);

export default hotelSchema;
export const Hotel = new mongoose.model("Hotel", hotelSchema);