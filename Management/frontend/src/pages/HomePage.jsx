import React from "react";
import MyNavbar from "../components/MyNavbar";

const HomePage = () => {
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
          </div>
        </div>
        
      </div>
    </>
  );
};

export default HomePage;
