import React from "react";

import { useState, useEffect } from "react";

const Navbar2 = () => {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0"></div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <img
              src="/img/logo.png"
              alt="Hotel Logo"
              width="50px"
              height="50px"
              style={{ filter: "invert(1)" }}
            />
            <a
              href="/"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "2rem",
              }}
            >
              <span className="mx-2 ">The Haven</span>
            </a>
          </ul>

          <div className="col-md-3 text-end mt-2">
            <p className="fs-5">
              {" "}
              {dateState.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
              {"   |   "}
              {dateState.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar2;
