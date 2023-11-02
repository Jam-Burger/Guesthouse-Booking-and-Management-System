import React from "react";
import styles from "../styles/Navbar.module.css";
const Navbar = () => {
  return (
    <>
      <div className={`${styles.navbar}`}>
        <span>
          <img src="/img/hotel_logo.png" alt="Hotel Logo" width="60px" height="60px"/>
          <span style={{ color: "white", fontSize:"1.8rem" }} className="mx-5">The Haven</span>
        </span>
        <span className={`${styles.navbar_right_side}`}>
          <span className="mx-5" ><a href="/reservation" style={{ textDecoration: 'none', fontSize:"1.4rem" }}>Reservation</a></span>
          <span className="mx-5" > <a href="/inventory" style={{ textDecoration: 'none', fontSize:"1.4rem" }}>Inventory</a></span>
          <span className="mx-5"><button className={`${styles.profile}`}>.</button></span>
        </span>
      </div>
    </>
  );
};

export default Navbar;
