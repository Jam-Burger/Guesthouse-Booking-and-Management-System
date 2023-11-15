import React from "react";
import styles from "../styles/Navbar.module.css";
import { useState, useEffect } from "react";
  
  const Navbar2 = () => {
  
      const [dateState, setDateState] = useState(new Date());
      useEffect(() => {
             setInterval(() => setDateState(new Date()), 30000);
      }, []);

  return (
    <>
      <div className={`${styles.navbar}`} style={{backgroundColor : "#e7e7e7",height:"74px" }}>
        <span>
          <img src="/img/logo.png" alt="Hotel Logo" width="32px" height="32px" style={{filter: "invert(1)", marginLeft:"80px"}}/>
          <a href="/home" style={{textDecoration:"none", color:"black", fontSize:"1.5rem"}}>
          <span className="mx-5">The Haven</span>
          </a>
        </span>
        <span className={`${styles.navbar_right_side} d-flex align-items-end`} style={{color: "black", fontSize:"17px"}}>
            <p>
            {'| '}
             {dateState.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            })}
            {'   |'}
            </p>
            <p>
              {dateState.toLocaleDateString('en-GB', {
                 day: 'numeric',
                 month: 'short',
                 year: 'numeric',
              })}
            </p>
        </span>
      </div>
    </>
  );
}

export default Navbar2;
