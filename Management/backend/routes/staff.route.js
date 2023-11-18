import express from "express";
import { Staff } from "../models/staff.model.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const router = express.Router();
const saltRounds = 10;

// find(query, queryProjection)
async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  console.log(typeof result);
  console.log(result);
  return result;
}

router.get("/", async (req, res) => {
  try {
    const data = await Staff.find({ role: { $ne :"admin"} });
    res.json({
      msg: "success",
      data: data,
    });
  } catch (e) {
    res.status(400).json({
      msg: "failure",
      error: e,
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const findObj = { _id: id };

  try {
    const data = await Staff.find(findObj);
    if (data.length == 0) {
      res.status(404).json({
        msg: "failure",
        error: "data not found",
      });
    } else {
      res.json({
        msg: "success",
        data: data,
      });
    }
  } catch (e) {
    res.status(400).json({
      msg: "failure",
      error: e,
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const plainPassword = data.password;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    const newStaff = new Staff({ ...data, password: hashedPassword });
    await newStaff.save();
    res.status(201).json({
      msg: "success",
      data: Staff,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "failure",
      error: e,
    });
  }
});

router.post("/", async (req, res) => { // /users/login
  try {
    const data = req.body;
    const plainPassword = data.password;
    const emailId = data.emailId;
    Staff.findOne({ emailId: emailId })
      .then(async (Staff) => {
        if (!Staff) {
          res.json({ msg: "No such Email found" });
        } else if (!(await comparePassword(plainPassword, Staff.password))) {
          res.json({ msg: "Wrong Password, Try again." });
        } else {
          res.json({ msg: "Hooray! You have successfully logged in", Staff: Staff, redirect:true});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "failure",
      error: e,
    });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  const findObj = { emailId: id };

  try {
    const data = await Staff.findOneAndUpdate(findObj, updates);
    if (data.length == 0) {
      res.status(404).json({
        msg: "failure",
        error: "data not found",
      });
    } else {
      res.json({
        msg: "success",
        data: data,
      });
    }
  } catch (e) {
    res.status(400).json({
      msg: "failure",
      error: e,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const findObj = { emailId: id };
  const deletedUser = await Staff.deleteOne(findObj);
    if (deletedUser.deletedCount === 0) {
      // Document not found
      return res.status(404).json({ error: 'User not found' });
    }
  
    // Document deleted successfully
    return res.status(204).json({ message: 'User deleted successfully' });
});

export default router;
