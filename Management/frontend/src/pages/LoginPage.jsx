import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
<<<<<<< HEAD
  const handleSumbit = async (e) => {
=======

  const handleSubmit = async (e) => {
>>>>>>> d10bcaddc19dee9821ef50ca1c98f1066b39e8d9
    e.preventDefault();
    const user = {
      emailId: e.target.emailId.value,
      password: e.target.password.value,
      emailId: e.target.emailId.value,
      password: e.target.password.value,
    };
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/staff/login",
        user,
        { withCredentials: true }
      );
      if (response.data.msg) {
        setMessage(response.data.msg);
        console.log(response.data.msg);
      }

      if (response.data.redirect) {
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      style={{
        background: "url('img/lg1.jpg') no-repeat center center fixed",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="container d-flex justify-content-center px-2 ">
        {/********************  CARD************* */}
        <div
          className="card shadow rounded-4"
          style={{
            backgroundColor: "rgba(255,255,255, 0.5)",
            width: "30rem",
            marginTop: "6%",
          }}
        >
          <div className="card-body">
            <div className="d-flex justify-content-center">
              <img
                src="img/blogo.png"
                alt="./Group 2.png"
                width="20%"
                height="20%"
              />
            </div>
            <p className="text-center rounded-4 text-dark px-3">
              <b>
                Welcome, valued hotel staff! Please enter your credentials to
                access the secure staff portal.
              </b>
            </p>
            <form className="card-body d-flex flex-column align-items-center" onSubmit={handleSubmit}>
              <div style={{ width: "70%" }}>
                <input
                  type="email"
                  name="emailId"
                  id="emailId"
                  className="form-control border border-dark "
                  placeholder="Enter your email"
                />
                <br />
              </div>
              <div style={{ width: "70%" }}>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control border border-dark "
                  placeholder="Enter your password"
                />
              </div>
              <br />
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary btn-block"
                >
                  Login
                </button>
                <div
                  style={{ color: "white" }}
                  className="d-flex justify-content-center"
                >
                  {message}
                </div>
              </div>
              <br />
              <p className="text-center rounded-4 text-dark px-3">
                <b>
                  Your dedication ensures the smooth operation of our hotel, and
                  we appreciate your commitment to providing exceptional
                  service.
                </b>
              </p>
            </form>
          </div>
          <br />
        </div>
        {/****** CARD ***************/}
      </div>
    </div>
  );
};

export default LoginPage;
