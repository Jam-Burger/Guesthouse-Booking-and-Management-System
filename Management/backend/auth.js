import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
// import pkg from 'passport-local';
// const {LocalStrategy} = pkg.Strategy;;
// import {LocalStrategy} from "passport-local";//.Strategy;
import LocalStrategy from 'passport-local';
import { Staff } from "./models/staff.model.js";
import bcrypt from "bcrypt";

// import myModule from './my-module';
// const exportedProperties = Object.keys(myModule);
// console.log(exportedProperties);

const saltRounds = 10;

// find(query, queryProjection)
async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    console.log(typeof result);
    console.log(result);
    return result;
  }
  


// Configure Express session middleware
const sessionOptions ={
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: true,
        maxAge: 60 * 60 * 1000, // One hour in milliseconds
      },
    };
  
  // Implement authentication logic using Passport.js and LocalStrategy
  passport.use(new LocalStrategy((emailId, password, done) => {
    const plainPassword = password;

    // Check if the emialId and password are valid
    Staff.findOne({ emailId: emailId })
      .then(async (staff) => {
        if (!staff) {
            return done(null, false, { msg: 'Incorrect emialId .' });
        } else if (!(await comparePassword(plainPassword, staff.password))) {
            return done(null, false, { msg: 'Incorrect emialId or password.' });
        } else {
            done(null, staff);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }));

  
  // Define custom middleware functions for authentication and authorization checks
  const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).send('Unauthorized access');
    }
  };
  
  const isAdmin = (req, res, next) => {
    console.log(req.body);
    if (req.body.role === 'admin') {
      next();
    } else {
      res.status(403).send('Insufficient access privileges');
    }
  };
  
   export const auth = { isAuthenticated, isAdmin, sessionOptions };
//    export default auth;