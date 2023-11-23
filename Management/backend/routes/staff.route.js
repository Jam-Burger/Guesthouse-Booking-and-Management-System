import express from "express";
import { Staff } from "../models/staff.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";

const router = express.Router();
const saltRounds = 10;

// find(query, queryProjection)
async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  console.log(typeof result);
  console.log(result);
  return result;
}

// router.get("/", async (req,res)=>{
//     axios.get('http//localhost:5000/staff/check')
//   .then(response => {
//     // res.json(response.data);
//     res.send("hello");
//   })
//   .catch(error => {
//     console.log(error);
//   });
// })

router.get("/", async (req, res) => {
  const { staffToken } = req.cookies;
  console.log("req.cookies : ", req.cookies);
  try {
    const decoded = jwt.verify(staffToken, process.env.JWT_SECRET);
    // console.log(decoded);
    if (decoded.staffToken.role === "admin") {
      // console.log("admin verified")
      const data = await Staff.find({ role: { $ne: "admin" } });
      res.json({
        success: true,
        decoded,
        data: data,
      });
    } else {
      // console.log("admin not verified")
      res.status(400).send("Unauthorized Access");
    }
  } catch (e) {
    console.log("bad request")
    res.status(400).json({
      success: false,
      error: e,
      message: "No. Invalid Request",
    });
  }
});

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

router.post("/", async (req, res) => {
  // /users/login
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
          const token = jwt.sign({ staffToken: staff }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          res.cookie("staffToken", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
          });
          res.json({
            success: true,
            token,
            msg: "Hooray! You have successfully logged in",
            redirect: true
          });
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
    return res.status(404).json({ error: "User not found" });
  }

  // Document deleted successfully
  return res.status(204).json({ message: "User deleted successfully" });
});

export default router;
