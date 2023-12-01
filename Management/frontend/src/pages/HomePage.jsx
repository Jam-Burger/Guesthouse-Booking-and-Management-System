import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/me",
          { withCredentials: true }
        );
        console.log(response.data);
        if (response.data.data) {
          setIsLoggedIn(true);
        } else {
          navigate("/login");
          console.log(response.data);
        }
      } catch (e) {
        navigate("/login");
        console.log(e);
      }
    }
    fetchData();
  });

  return (
    <>
      {isLoggedIn && (
        <div
          style={{
            background: "url('img/lg1.jpg') no-repeat center center fixed",
            backgroundSize: "cover",
            height: "100vh",
          }}
        >
          <div className="container-fluid px-0">
            <Navbar />
            <div style={{ marginTop: "10%" }}>
              <h1 className="mx-5" style={{ color: "white", fontSize: "6rem" }}>
                The HAVEN
              </h1>
              <h4
                className="mx-5"
                style={{ color: "white", fontSize: "1.5rem" }}
              >
                Elevate your stay
              </h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default HomePage;
