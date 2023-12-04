import React, { useEffect, useState } from "react";
import axios from "axios";
import no_profile_picture from "../static/no-profile-picture.png";

const Navbar = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState(no_profile_picture);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/me",
          { withCredentials: true }
        );
        // console.log(response.data);
        if (response.data.data) {
          setLoggedIn(true);
          if (response.data.data.profilePic) {
            setProfilePic(response.data.data.profilePic);
          }
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
    <nav className="navbar bg-tertiary-subtle bg-gradient shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="/img/logoJug_beyondSky-removebg.png"
            alt="BeyondSky"
            width="150"
          ></img>
        </a>

        <header className="d-flex flex-wrap justify-content-center">
          <ul className="nav nav-pills">
            {/* <li className="nav-item">
              <a
                href="/"
                className="nav-link text-black"
                style={{ textDecoration: "none", fontSize: "1.2rem" }}
              >
                Home
              </a>
            </li> */}
            {/* <li className="nav-item">
              <a
                href="/hotels"
                className="nav-link text-black"
                style={{ textDecoration: "none", fontSize: "1.2rem" }}
              >
                Hotel
              </a>
            </li> */}
            <li className="nav-item">
              <a
                href={!isLoggedIn ? "/login" : "/profile"}
                className="nav-link text-black"
                style={{ textDecoration: "none", fontSize: "1.2rem" }}
              >
                <div className="d-flex flex-row align-items-center justify-content-center">
                  <img
                    src={profilePic}
                    className="object-fit-cover rounded-circle border border-black"
                    alt="profile"
                    style={{ width: "35px", height: "35px" }}
                  />
                  <div className="ml-2 text-lg">
                    {!isLoggedIn ? "Log in" : ""}
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </header>
      </div>
    </nav>
  );
};

export default Navbar;
