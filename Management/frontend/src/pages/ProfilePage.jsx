import React from "react";
import Navbar2 from "../components/Navbar2";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const editInfo = () => {};

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/me",
          { withCredentials: true }
        );
        console.log(response.data);
        if (response.data.data) {
          let tempData = response.data.data;
          tempData.fullName = `${tempData.firstName} ${tempData.lastName}`;
          setUser(tempData);
          setMessage("");
        }
      } catch (e) {
        setMessage("Unauthorized Access");
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const logout = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/logout",
        { withCredentials: true }
      );
      console.log(response);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Navbar2 />
      <Sidebar />
      <div style={{ marginLeft: "80px" }}>
        {message === "" ? (
          <div className="pt-4 container-fluid">
            <div className="container">
              <div className="main-body">
                <div className="row gutters-sm">
                  <div className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                          <img
                            src="/img/maleprofile.png"
                            alt="profile_img"
                            className="rounded-circle"
                            width="150"
                          />
                          <div className="mt-3">
                            <h4>{user.fullName}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Full Name</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {user.fullName}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {user.emailId}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Phone</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {user.contactNo}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Gender</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {user.gender}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Age</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {user.age}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Role</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {user.role}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-12 d-flex justify-content-center">
                            <button
                              className="btn mx-2 btn-info"
                              onClick={() => {
                                editInfo();
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn mx-2 btn-danger"
                              onClick={() => {
                                logout();
                              }}
                            >
                              Log out
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>{message}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
