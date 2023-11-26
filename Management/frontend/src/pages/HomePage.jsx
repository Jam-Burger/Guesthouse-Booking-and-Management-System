import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";

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
      <div style={{ background: "url('img/lg1.jpg') no-repeat center center fixed", backgroundSize: "cover", height: "100vh"}}>
        <div> 
          <div className="container-fluid px-0">
            <MyNavbar/>
            <div style={{marginTop:"10%"}}>
              {/* <h2 className="mx-5" style={{color:"white",fontSize:"1.5rem"}}>Welcome to </h2> */}
              <h1 className="mx-5" style={{color:"white", fontSize:"6rem"}}>The HAVEN</h1>
              <h4 className="mx-5" style={{color:"white",fontSize:"1.5rem"}}>Elevate your stay</h4>
            </div>
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
        
      </div>
    </>
  );
};

export default HomePage;
