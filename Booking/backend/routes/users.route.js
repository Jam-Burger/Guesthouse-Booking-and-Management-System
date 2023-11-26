import express from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import uploadFile from "../utills/file-uploader.js"

const router = express.Router();
const saltRounds = 10;

// find(query, queryProjection)
async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}

router.get("/", async (req, res) => {
  try {
    const data = await User.find({});
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
    const data = await User.find(findObj);
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

const upload = multer();
router.patch("/", upload.single('picture'), async (req, res) => {
  try {
<<<<<<< HEAD
    let updates = JSON.parse(req.body.profileData);
    if (req.file) {
      const { webContentLink } = await uploadFile(req.file);
      console.log(webContentLink);
      updates = { ...updates, profilePic: webContentLink };
    }
    const findObj = { _id: updates._id };
    let data = await User.findOneAndUpdate(findObj, updates);

    if (!data) {
      res.status(404).json({
        msg: "failure",
        error: "data not found",
      });
    } else {
      const token = jwt.sign({ currentUser: data }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("currentUserToken", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      res.json({ msg: "success", data });
      console.log("data updated successfully");
    }
=======
    let updatedData = JSON.parse(req.body.profileData);
    if (req.file) {
      const { webContentLink } = await uploadFile(req.file);
      console.log(webContentLink);
      updatedData = { ...updatedData, profilePic: webContentLink };
    }
    const findObj = { _id: updatedData._id };
    await User.findOneAndUpdate(findObj, updatedData);

    const token = jwt.sign({ currentUser: updatedData }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("currentUserToken", token, {
      secure: process.env.NODE_ENV !== "development",
      sameSite: process.env.NODE_ENV !== "development" ? 'none' : 'lax',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    res.json({ msg: "success", data: updatedData });
    console.log("data updated successfully");
>>>>>>> 1a80ac3a634119659f124c11cc8c588aac25157e
  } catch (e) {
    console.log(e);
    res.status(500).json({
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
    const user = new User({ ...data, password: hashedPassword });
    console.log(plainPassword);
<<<<<<< HEAD
=======

>>>>>>> 1a80ac3a634119659f124c11cc8c588aac25157e
    await user.save();
    const token = jwt.sign({ currentUser: user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("currentUserToken", token, {
      secure: process.env.NODE_ENV !== "development",
      sameSite: process.env.NODE_ENV !== "development" ? 'none' : 'lax',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    res.status(201).json({
      msg: "success",
      data: user,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "failure",
      error: e,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const plainPassword = data.password;
    const emailId = data.emailId;

    User.findOne({ emailId: emailId })
      .then(async (user) => {
        if (!user) {
          res.json({ msg: "No such Email found" });
        } else if (!(await comparePassword(plainPassword, user.password))) {
          res.json({ msg: "Wrong Password, Try again." });
        } else {
          const token = jwt.sign({ currentUser: user }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          res.cookie("currentUserToken", token, {
<<<<<<< HEAD
=======
            secure: process.env.NODE_ENV !== "development",
            sameSite: process.env.NODE_ENV !== "development" ? 'none' : 'lax',
>>>>>>> 1a80ac3a634119659f124c11cc8c588aac25157e
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

export default router;
