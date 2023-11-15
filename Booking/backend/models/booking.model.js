import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  
});

const bookingSchema = new mongoose.Schema({

  hotelName: {
    type:String,
    required:true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  roomNo: {
    type: String,
    required: true,
  },
  guestDetails: {
    type: guestSchema,
    required: true,
  },
  
});

export default bookingSchema;
export const Booking = new mongoose.model("Booking", bookingSchema);
