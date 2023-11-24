import React from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/HomePage.module.css"
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  return (
    <>
      <div style={{ backgroundImage:'url("/img/background_img.png")',backgroundRepeat:"no-repeat", height:"100vh", backgroundSize:"cover"}}>
        <Navbar />
        <div>
          {/* <img
            src="/img/background_img.png"
            alt="background"
            width="100%"
            height="659px"
            transform="rotateX(180deg)"
          /> */}
          
          <div className={`${styles.tagline}`}>
            <h2 style={{color:"white",fontSize:"3rem",zIndex:"4"}}>Welcome to </h2>

            <h1 style={{color:"white", fontSize:"6rem",zIndex:"4"}}>The HAVEN</h1>
            <br></br> 
            <h4 style={{color:"white",fontSize:"1.5rem",zIndex:"4"}}>Elevate your stay</h4>
          </div>
          {/* <div style={{background:"#001C30", zIndex:"2", width:"100%", height:"100%", position:"absolute", top:"0",left:"0",opacity:"0.5"}}></div> */}
        </div>
        
      </div>
    </>
  );
};

export default HomePage;
