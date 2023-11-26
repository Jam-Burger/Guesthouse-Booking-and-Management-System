import React from "react";

const Unauthorized = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="h1">{"NOT AUTHORIZED"}</div>
      <div>
        <a href="/login" className="btn btn-success">
          Log in
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
