import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: String,
  contactNo: String,
  emailId: String,
  age: Number,
  profilePic: String
});
