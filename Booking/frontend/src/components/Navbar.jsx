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
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          Booking.com
        </a>

        {location.state && location.state.isLoggedIn ? (
          <button onClick={handleClick} style={{ border: "none" }}>
            <img
              src={no_profile_picture}
              width="38px"
              height="38px"
              alt="profile pic"
            />
          </button>
        ) : window.location.pathname === "/" ? (
          <a class="btn btn-primary m-1" href="/login" role="button">
            Login
          </a>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;
