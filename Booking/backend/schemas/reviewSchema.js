import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
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
