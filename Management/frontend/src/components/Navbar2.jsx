import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

const Navbar2 = () => {

  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  return (
    <>
      <div class="container-fluid">
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div class="col-md-3 mb-2 mb-md-0">
            <Sidebar />
          </div>

          <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <img src="/img/logo.png" alt="Hotel Logo" width="50px" height="50px" style={{ filter: "invert(1)" }} />
            <a href="/home" style={{ textDecoration: "none", color: "black", fontSize: "2rem" }}><span className="mx-2 ">The Haven</span></a>
          </ul>

          <div class="col-md-3 text-end mt-2">
            <p className="fs-5">
              {' '}
              {dateState.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
              {'   |   '}

              {dateState.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
        </header>
      </div>




























      {/* <div className={`${styles.navbar}`} style={{ height: "74px" }}>
        <Sidebar />
        <span>
          <img src="/img/logo.png" alt="Hotel Logo" width="50px" height="50px" style={{ filter: "invert(1)", marginLeft: "80px" }} />
          <a href="/home" style={{ textDecoration: "none", color: "black", fontSize: "2rem" }}>
            <span className="mx-5">The Haven</span>
          </a>
        </span>
        <span className={`${styles.navbar_right_side} d-flex align-items-end`} style={{ color: "black", fontSize: "17px" }}>
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
      </div> */}
    </>
  );
}

export default Navbar2;
