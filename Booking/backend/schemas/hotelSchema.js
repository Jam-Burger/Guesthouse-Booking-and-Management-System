import mongoose from "mongoose";

const hotelSchema = mongoose.Schema(
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
