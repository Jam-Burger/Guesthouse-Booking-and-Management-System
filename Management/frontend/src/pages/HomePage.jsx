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
            <h1 style={{color:"white", fontSize:"5rem"}}>Welcome to The Haven</h1>
            <div className="container">
              <div className="cards">
                <img src="https://t4.ftcdn.net/jpg/00/09/21/15/360_F_9211505_d4hxfNtPeTfgt7AeGmoO7u79P2hwxkoQ.jpg" />
              </div>
              <div className="cards">
                <img src="https://t4.ftcdn.net/jpg/00/09/21/15/360_F_9211505_d4hxfNtPeTfgt7AeGmoO7u79P2hwxkoQ.jpg" />
              </div>
              <div className="cards">
                <img src="https://t4.ftcdn.net/jpg/00/09/21/15/360_F_9211505_d4hxfNtPeTfgt7AeGmoO7u79P2hwxkoQ.jpg" />
              </div>
              <div className="cards">
                <img src="https://t4.ftcdn.net/jpg/00/09/21/15/360_F_9211505_d4hxfNtPeTfgt7AeGmoO7u79P2hwxkoQ.jpg" />
              </div>
              <div className="cards">
                <img src="https://t4.ftcdn.net/jpg/00/09/21/15/360_F_9211505_d4hxfNtPeTfgt7AeGmoO7u79P2hwxkoQ.jpg" />
              </div>
              <div className="cards">
                <img src="https://t4.ftcdn.net/jpg/00/09/21/15/360_F_9211505_d4hxfNtPeTfgt7AeGmoO7u79P2hwxkoQ.jpg" />
              </div>
              
          </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
