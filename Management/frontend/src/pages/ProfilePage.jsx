import React, { useEffect, useState } from "react";
import Navbar2 from "../components/Navbar2";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Unauthorized from "../components/Unauthorized";

const ProfilePage = () => {
  const [data, setData] = useState();
  const [isEditing, setEditing] = useState(false);
  const [pictureFile, setPictureFile] = useState();
  const navigate = useNavigate();

  const changeProfilePic = async (file) => {
    setData({ ...data, profilePic: URL.createObjectURL(file) });
    setPictureFile(file);
    console.log(file);
  };

  const updateData = async (e) => {
    e.preventDefault();

    console.log(e);
    try {
      const formData = new FormData();
      formData.append("profileData", JSON.stringify(data));
      formData.append("picture", pictureFile);

      const response = await axios.patch(
        process.env.REACT_APP_BACKEND_URL + "/staff",
        formData,
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const cancel = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/me",
        { withCredentials: true }
      );
      if (response.data.data) {
        setData(response.data.data);
        setEditing(false);
      } else {
        console.log(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/logout",
        { withCredentials: true }
      );
      console.log(response);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/me",
          { withCredentials: true }
        );
        if (response.data.data) {
          setData(response.data.data);
        } else {
          console.log(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Navbar2 />
      <Sidebar />
      <div style={{ marginLeft: "80px" }}>
        {data ? (
          <div className="pt-4 container-fluid">
            <div className="container">
              <div className="main-body">
                <div className="row gutters-sm">
                  <div className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-column text-center ">
                          <label
                            htmlFor="upload-photo"
                            style={isEditing ? { cursor: "pointer" } : {}}
                          >
                            <img
                              src={
                                !data.profilePic
                                  ? "/img/blank-profile-picture.webp"
                                  : data.profilePic
                              }
                              alt="profile"
                              className="object-fit-cover rounded-5 border border-black"
                              style={{ width: "200px", height: "200px" }}
                            />
                            <input
                              type="file"
                              id="upload-photo"
                              accept="image/*"
                              style={{
                                opacity: 0,
                                position: "absolute",
                                zIndex: -1,
                              }}
                              disabled={!isEditing}
                              onChange={(e) => {
                                changeProfilePic(e.target.files[0]);
                              }}
                            />
                          </label>
                          <div className="mt-3">
                            <h4>
                              {data && data.firstName} {data && data.lastName}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form
                    className="col-md-8"
                    onSubmit={(e) => {
                      updateData(e);
                      setEditing(false);
                    }}
                  >
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Full Name</h6>
                          </div>
                          <div className="col-sm-9">
                            {isEditing ? (
                              <input
                                type="text"
                                className="form-control form-control-sm border border-black"
                                pattern="[a-zA-Z\s]{5,30}"
                                title="Enter your full name between 5 and 30 characters"
                                minLength="5"
                                maxLength="20"
                                defaultValue={
                                  !data
                                    ? ""
                                    : data.firstName + " " + data.lastName
                                }
                                onChange={(e) => {
                                  const names = e.target.value.split(" ", 2);
                                  console.log(names);
                                  const firstName = names[0];
                                  const lastName = names[1];
                                  setData({ ...data, firstName, lastName });
                                }}
                              />
                            ) : (
                              <div className="text-secondary">
                                {data && data.firstName} {data && data.lastName}
                              </div>
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className="row align-items-center">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                          </div>
                          <div className="col-sm-9">
                            {isEditing ? (
                              <input
                                type="email"
                                className="form-control form-control-sm border border-black"
                                pattern="[a-zA-Z0-9_\._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                title="Please enter a valid email address"
                                onChange={(e) => {
                                  setData({ ...data, email: e.target.value });
                                }}
                                defaultValue={!data ? "" : data.emailId}
                              />
                            ) : (
                              <div className="text-secondary">
                                {data && data.emailId}
                              </div>
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className="row align-items-center">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Contact No</h6>
                          </div>
                          <div className="col-sm-9">
                            {isEditing ? (
                              <input
                                type="text"
                                minLength="10"
                                maxLength="10"
                                title="Please enter a valid contact number"
                                className="form-control form-control-sm border border-black"
                                onChange={(e) => {
                                  setData({
                                    ...data,
                                    contactNo: e.target.value,
                                  });
                                }}
                                defaultValue={!data ? "" : data.contactNo}
                              />
                            ) : (
                              <div className="text-secondary">
                                {data && data.contactNo}
                              </div>
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className="row align-items-center">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Gender</h6>
                          </div>
                          <div className="col-sm-9">
                            {isEditing ? (
                              <select
                                className="form-select form-select-sm border-1 border-black"
                                defaultValue={!data ? "" : data.gender}
                                onChange={(e) => {
                                  setData({ ...data, gender: e.target.value });
                                }}
                              >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            ) : (
                              <div className="text-secondary">
                                {data && data.gender}
                              </div>
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className="row align-items-center">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Age</h6>
                          </div>
                          <div className="col-sm-9">
                            {isEditing ? (
                              <input
                                type="number"
                                className="form-control form-control-sm border border-black"
                                min="18"
                                max="100"
                                title="Please entesr a valid age between 18 and 100"
                                defaultValue={!data ? "" : data.age}
                              />
                            ) : (
                              <div className="col-sm-9 text-secondary">
                                {data && data.age}
                              </div>
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className="row align-items-center">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Role</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {data && data.role}
                          </div>
                        </div>
                        <hr />
                        <div className="row align-items-center">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Shift</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {data && data.shift}
                          </div>
                        </div>
                        <hr />
                        <div className="row align-items-center">
                          <div className="col-sm-12 d-flex justify-content-center">
                            {isEditing ? (
                              <button
                                className="btn mx-2 btn-info"
                                type="submit"
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                className="btn mx-2 btn-info"
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setEditing(true);
                                }}
                              >
                                Edit
                              </button>
                            )}

                            <button
                              className="btn mx-2 btn-danger"
                              onClick={isEditing ? cancel : logout}
                            >
                              {isEditing ? "Cancel" : "Log Out"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Unauthorized />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
