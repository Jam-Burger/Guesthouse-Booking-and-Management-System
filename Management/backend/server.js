import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import staffRoute from "./routes/staff.route.js";
import itemsRoute from "./routes/items.route.js";
import passport from "passport";
import expressSession from "express-session";

dotenv.config();
const server = express();

// app.use(
//   expressSession({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: true,
//       maxAge: 60 * 60 * 1000, // One hour in milliseconds
//     },
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, done) => {
//   done(null, user.id); // Store the user's ID in the cookie
// });

// passport.deserializeUser((userId, done) => {
//   // Retrieve the user object from the database using the userId
//   User.findById(userId, (err, user) => {
//     if (err) {
//       return done(err);
//     }
//     done(null, user);
//   });
// });

// passport.serializeUser((user, done) => {
//   done(null, user.id); // Store the user's ID in the cookie
// });

// passport.deserializeUser((userId, done) => {
//   // Retrieve the user object from the database using the userId
//   User.findById(userId, (err, user) => {
//     if (err) {
//       return done(err);
//     }
//     done(null, user);
//   });
// });

// app.get(
//   "/protected-route",
//   passport.authenticate("local", { failureRedirect: "/login" }),
//   (req, res) => {
//     // User is logged in and has access to the protected route
//     res.send("You are logged in and have access to this protected route.");
//   }
// );

server.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

server.use(express.json());
server.use("/staff", staffRoute);
server.use("/items", itemsRoute);

server.get("/", (req, res) => {
  res.send("Management Page");
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("successfully connected mongoDB!");
    server.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
