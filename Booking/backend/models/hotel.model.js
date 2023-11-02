import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
});

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
      },
    ],
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
