import mongoose from "mongoose";
const reviewSchema = mongoose.Schema({
  user: userSchema,
  stars: Number,
  description: String,
});
