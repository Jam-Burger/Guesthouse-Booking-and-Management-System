import mongoose from "mongoose";
import encrypt from "mongoose-encryption";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
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
  }
});
userSchema.plugin(encrypt, { encryptKey: process.env.ENCRYPT_KEY, encryptedFields: ["password"] });

export default userSchema;
export const User = new mongoose.model("User",userSchema);