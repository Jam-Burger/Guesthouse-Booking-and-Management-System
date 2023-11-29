import React from "react";
import no_profile_picture from "../static/no-profile-picture.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (location.state)
      navigate("/profile", { state: { user: location.state.user } });
  };

  return (
    <nav className="navbar bg-tertiary-subtle bg-gradient shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          <img src="./img/logoJug_beyondSky-removebg.png" alt="BeyondSky" width="150"></img>
        </a>

        <header class="d-flex flex-wrap justify-content-center">

          <ul class="nav nav-pills">

            <li class="nav-item" ><a href="/home" class="nav-link text-black" style={{ textDecoration: "none",fontSize:"1.2rem"  }}>Home</a></li>
            <li class="nav-item"><a href="/hotels" class="nav-link text-black" style={{ textDecoration: "none",fontSize:"1.2rem" }}>Hotel</a></li>
            <li class="nav-item"><a href="/profile" class="nav-link text-black" style={{ textDecoration: "none",fontSize:"1.2rem" }}>Profile</a></li>

          </ul>
        </header>
      </div>

    </nav>
  );
};

export default Navbar;
