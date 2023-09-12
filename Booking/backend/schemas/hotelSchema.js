import mongoose from "mongoose";
const hotelSchema = mongoose.Schema({
  rooms: [roomSchema],
  pictures: [String],
  contactNo: String,
  address: String,
  rating: Number,
  reviews: [reviewSchema],
});
