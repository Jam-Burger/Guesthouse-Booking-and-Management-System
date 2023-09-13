import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  profilePic: {
    type: String,
    required: false,
  },
});
