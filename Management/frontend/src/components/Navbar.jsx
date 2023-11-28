import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [role, setRole] = useState("");
  const [profileImg, setProfileImg] = useState("/img/profile.png");
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  const handleNavbarToggle = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

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
          setProfileImg(response.data.data.profilePic);
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
    <nav
      className="navbar navbar-expand-md navbar-dark"
      aria-label="Fourth navbar example"
    >
      <div className="container-fluid px-2">
        <span
          className="navbar-brand d-flex align-items-center justify-content-s"
          style={{ fontSize: "2rem", color: "white" }}
        >
          <img
            className="mx-2"
            src="/img/logo.png"
            alt="Hotel Logo"
            width="80px"
            height="80px"
          />
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded={!isNavbarCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavbarToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${
            isNavbarCollapsed ? "" : "show"
          }`}
          id="navbarsExample04"
        >
          <ul className="navbar-nav d-flex  align-items-end text-align-lest ms-auto mb-2 mb-md-0">
            {(role === "admin" || role === "Receptionist") && (
              <li className="nav-item mx-4">
                <a
                  href="/booking"
                  style={{
                    textDecoration: "none",
                    fontSize: "1.4rem",
                    color: "white",
                  }}
                >
                  Booking History
                </a>
              </li>
            )}
            {role === "admin" && (
              <li className="nav-item mx-4">
                <a
                  href="/staff"
                  style={{
                    textDecoration: "none",
                    fontSize: "1.4rem",
                    color: "white",
                  }}
                >
                  Staff Details
                </a>
              </li>
            )}
            {(role === "admin" || role === "Receptionist") && (
              <li className="nav-item mx-4">
                <a
                  href="/reservation"
                  style={{
                    textDecoration: "none",
                    fontSize: "1.4rem",
                    color: "white",
                  }}
                >
                  Reservation
                </a>
              </li>
            )}
            {(role === "admin" || role === "Inventory-Manager") && (
              <li className="nav-item mx-4">
                <a
                  href="/inventory"
                  style={{
                    textDecoration: "none",
                    fontSize: "1.4rem",
                    color: "white",
                  }}
                >
                  Inventory
                </a>
              </li>
            )}
            <li className="nav-item mx-4">
              <a
                href="/profile"
                style={{
                  textDecoration: "none",
                  fontSize: "1.4rem",
                  color: "white",
                }}
              >
                {!isNavbarCollapsed ? (
                  <span>Profile</span>
                ) : (
                  <img
                    src={profileImg}
                    alt="Profile"
                    className="rounded-circle object-fit-cover"
                    width="35px"
                    height="35px"
                  />
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
