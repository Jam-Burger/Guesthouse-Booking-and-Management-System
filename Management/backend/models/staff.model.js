import mongoose from "mongoose";

//here users are staff or admin and not the guests
const staffSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },  
  gender: {
    type: String,
    required: true,
  },
  role: {
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
  password: {
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
  shift: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

export default staffSchema;
export const Staff = new mongoose.model("Staff", staffSchema);
