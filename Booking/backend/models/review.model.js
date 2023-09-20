import mongoose from "mongoose";
import userSchema from "./user.model.js";

export const reviewSchema = new mongoose.Schema({
  user: {
    type: userSchema,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

export default reviewSchema;
export const Review = new mongoose.model("Review", reviewSchema);
