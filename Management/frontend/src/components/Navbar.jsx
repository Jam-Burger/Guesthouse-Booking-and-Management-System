import React from "react";
import styles from "../styles/Navbar.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
const Navbar = () => {
  const [role, setRole] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/me",
          { withCredentials: true }
        );
        // console.log(response.data);
        if (response.data.data) {
          setRole(response.data.data.role);
        } else {
          console.log(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <div className={`${styles.navbar}`}>
        <span>
          <img
            src="/img/hotel_logo.png"
            alt="Hotel Logo"
            width="60px"
            height="60px"
          />
          <a href="/" style={{ textDecoration: "none" }}>
            <span
              style={{ color: "white", fontSize: "1.8rem" }}
              className="mx-5"
            >
              The Haven
            </span>
          </a>
        </span>
        <span className={`${styles.navbar_right_side}`}>
          {role === "admin" || role === "Receptionist" ? (
            <span className="mx-5">
              <a
                href="/reservation"
                style={{ textDecoration: "none", fontSize: "1.4rem" }}
              >
                Reservation
              </a>
            </span>
          ) : (
            <span></span>
          )}
          {role === "admin" || role === "Inventory-Manager" ? (
            <span className="mx-5">
              {" "}
              <a
                href="/inventory"
                style={{ textDecoration: "none", fontSize: "1.4rem" }}
              >
                Inventory
              </a>
            </span>
          ) : (
            <span></span>
          )}
          {role === "admin" ? (
            <span className="mx-5">
              {" "}
              <a
                href="/staff"
                style={{ textDecoration: "none", fontSize: "1.4rem" }}
              >
                Staff
              </a>
            </span>
          ) : (
            <span></span>
          )}
          {role === "admin" || role === "Receptionist" ? (
            <span className="mx-5">
              {" "}
              <a
                href="/booking"
                style={{ textDecoration: "none", fontSize: "1.4rem" }}
              >
                Booking History
              </a>
            </span>
          ) : (
            <span></span>
          )}
          <span className="mx-5">
            <a href="/profile">
              <button style={{ border: "none", padding: "0px" }}>
                <img
                  src="/img/no-profile-picture.png"
                  width="38px"
                  height="38px"
                  alt="profile pic"
                  padding="0px"
                  bac
                />
              </button>
            </a>
          </span>
        </span>
      </div>
    </>
  );
};

export default Navbar;
