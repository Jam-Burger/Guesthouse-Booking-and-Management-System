import React from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/HomePage.module.css"

const HomePage = () => {
  return (
    <>
      <div style={{ backroundColor: "#001C30"}}>
        <Navbar />
        <div>
          <img
            src="/img/background_img.png"
            alt="background"
            width="100%"
            height="659px"
          />
          <div className={`${styles.tagline}`}>
            <h1 style={{color:"white", fontSize:"5rem"}}>Welcome to The HAVEN</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
