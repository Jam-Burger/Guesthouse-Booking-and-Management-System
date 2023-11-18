import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const LoginPage = (props) => {
  const [message, setMessage] = useState("");
  const navigate   = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      emailId: event.target.emailId.value,
      password: event.target.password.value,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/staff/",
        user
      );
      if (response.data.msg) {
        setMessage(response.data.msg);
        console.log(response.data.msg);
      }

      if (response.data.redirect) {
        navigate("/home",{state:{isLoggedIn : true, user: response.data.user}});
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      style={{
        background: "url('img/bgimg.png')",
        height: "739px",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 739px",
      }}
      className="my-0"
    >
      <div className="row justify-content-around mx-0">
        <div className="col-4">
          <img
            src="img/logo.png"
            alt="./Group 2.png"
            width="400px"
            height="400px"
            className="my-5"
          />
        </div>
        <div className="col-4">
          <br />
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div
                  className="card custom-card my-5 d-flex "
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                >
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <input
                          type="email"
                          name="emailId"
                          id="emailId"
                          className="form-control"
                          placeholder="Enter your email"
                          required
                        />
                        <br />
                      </div>
                      <div className="mb-3">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="form-control"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block "
                        >
                          Login
                        </button>
                        <div style={{color : "white"}} className="d-flex justify-content-center">
                          {message}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="quote"
        style={{
          textAlign: "center",
          fontSize: "3rem",
          color: "white",
          fontStyle: "italic",
        }}
      >
        <p>"Making guest happy, makes us happy"</p>
      </div>
    </div>
  );
};

export default LoginPage;
