import express from "express";
import { Staff } from "../models/staff.model.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import {auth} from '../auth.js';

const router = express.Router();
const saltRounds = 10;

// find(query, queryProjection)
async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  console.log(typeof result);
  console.log(result);
  return result;
}

router.get("/",async (req, res) => {
  console.log(auth.isAuthenticated);
  const session = req.session; // Retrieve the session from the request object

  if (session && session.user) {
    const userId = session.user.emailId; // Extract the user emailId from the session data

    // Query the database to retrieve user information based on the emailId
    User.findOne(userId, (err, user) => {
      if (err || !user) {
        res.status(404).send('User not found');
        return;
      }

      // Use the retrieved user object to identify the logged-in user
      res.send({ user: user });
    });
  } else {
    res.status(401).send('Unauthorized access');
  }
});
//   try {
//     const data = await Staff.find({ role: { $ne :"admin"} });
//     res.json({
//       msg: "success",
//       data: data,
//     });
//   } catch (e) {
//     res.status(400).json({
//       msg: "failure",
//       error: e,
//     });
//   }
// });

router.get("/:emailId", async (req, res) => {
  const emailId = req.params.emailId;
  const findObj = { _id: emailId };

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
      .then(async (staff) => {
        if (!staff) {
          res.json({ msg: "No such Email found" });
        } else if (!(await comparePassword(plainPassword, staff.password))) {
          res.json({ msg: "Wrong Password, Try again." });
        } else {
          res.json({ msg: "Hooray! You have successfully logged in", staff: staff, redirect:true});
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

router.patch("/:emailId", async (req, res) => {
  const emailId = req.params.emailId;
  const updates = req.body;
  const findObj = { emailId: emailId };

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

router.delete("/:emailId", async (req, res) => {
  const emailId = req.params.emailId;
  const findObj = { emailId: emailId };
  const deletedUser = await Staff.deleteOne(findObj);
    if (deletedUser.deletedCount === 0) {
      // Document not found
      return res.status(404).json({ error: 'User not found' });
    }
  
    // Document deleted successfully
    return res.status(204).json({ message: 'User deleted successfully' });
});

export default router;
