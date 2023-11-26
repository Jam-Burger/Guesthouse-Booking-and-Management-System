import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
        <div style={{ backroundColor: "#001C30" }}>
          <Navbar />
          <div>
            <img
              src="/img/background_img.png"
              alt="background"
              width="100%"
              height="659px"
            />
            <div>
              <h1 style={{ color: "white", fontSize: "5rem" }}>
                Welcome to The Haven
              </h1>
            </div>
          </div>
          {/* <div style={{background:"#001C30", zIndex:"2", width:"100%", height:"100%", position:"absolute", top:"0",left:"0",opacity:"0.5"}}></div> */}
        </div>
      )}
    </>
  );
};

export default HomePage;
