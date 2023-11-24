import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className={` `}>
        <span className="navbar-brand d-flex align-items-center">
          <img
            src="/img/hotel_logo.png"
            alt="Hotel Logo"
            width="60px"
            height="60px"
          />
          <a href="/" style={{ textDecoration: "none" }}>
            <span
              style={{ color: "white", fontSize: "1.8rem" }}
              className="mx-3 mt-5 "
            >
              The Haven
            </span>
          </a>
        </span>
        <span className={` navbar-brand`}>
          <span className="mx-4" ><a href="/reservation" style={{ textDecoration: 'none', fontSize:"1.4rem" , color:'white'}}>Reservation</a></span>
          <span className="mx-4" > <a href="/inventory" style={{ textDecoration: 'none', fontSize:"1.4rem", color:'white' }}>Inventory</a></span>
          <span className="mx-4" > <a href="/staff" style={{ textDecoration: 'none', fontSize:"1.4rem", color:'white' }}>Staff</a></span>
          <span className="mx-4" > <a href="/booking" style={{ textDecoration: 'none', fontSize:"1.4rem", color:'white' }}>Booking History</a></span>
        </span>
      </nav>
    </> 
  );
};

export default Navbar;
