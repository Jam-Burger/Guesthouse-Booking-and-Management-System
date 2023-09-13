import mongoose from "mongoose";

const hotelSchema = mongoose.Schema(
  {
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
  },
  {
    timestamps: false,
  }
);
