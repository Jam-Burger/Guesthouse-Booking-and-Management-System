import React from "react";
import Navbar2 from "../components/Navbar2";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
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

  const updateData = async () => {
    try {
      const formData = new FormData();
      formData.append("profileData", JSON.stringify(data));
      formData.append("picture", pictureFile);

      // console.log(formData);
      const response = await axios.patch(
        process.env.REACT_APP_BACKEND_URL + "/staff",
        formData,
        { withCredentials: true }
      );
      navigate("/profile");
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
      navigate("/");
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
        // console.log(response.data);
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
                        <div className="d-flex flex-column text-center">
                          <label
                            for="upload-photo"
                            style={isEditing ? { cursor: "pointer" } : {}}
                          >
                            <img
                              src={!data ? "" : data.profilePic}
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
                  <div className="col-md-8">
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Full Name</h6>
                          </div>
                          {isEditing ? (
                            <input
                              type="text"
                              className="form-control-sm col-sm-9"
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
                            <div className="col-sm-9 text-secondary">
                              {data && data.firstName} {data && data.lastName}
                            </div>
                          )}
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                          </div>
                          {isEditing ? (
                            <input
                              type="email"
                              className="form-control-sm col-sm-9"
                              defaultValue={!data ? "" : data.emailId}
                              onChange={(e) => {
                                setData({ ...data, email: e.target.value });
                              }}
                            />
                          ) : (
                            <div className="col-sm-9 text-secondary">
                              {data && data.emailId}
                            </div>
                          )}
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Phone</h6>
                          </div>
                          {isEditing ? (
                            <input
                              type="text"
                              className="form-control-sm col-sm-9"
                              defaultValue={!data ? "" : data.contactNo}
                              onChange={(e) => {
                                setData({ ...data, contactNo: e.target.value });
                              }}
                            />
                          ) : (
                            <div className="col-sm-9 text-secondary">
                              {data && data.contactNo}
                            </div>
                          )}
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Gender</h6>
                          </div>
                          {isEditing ? (
                            <div className="col-sm-9">
                              <select
                                className="form-select form-select-sm border-1 border-black"
                                defaultValue={!data ? "" : data.gender}
                              >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          ) : (
                            <div className="col-sm-9 text-secondary">
                              {data && data.gender}
                            </div>
                          )}
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Age</h6>
                          </div>
                          {isEditing ? (
                            <input
                              type="number"
                              className="form-control-sm col-sm-9"
                              defaultValue={!data ? "" : data.age}
                              onChange={(e) => {
                                setData({ ...data, age: e.target.value });
                              }}
                            />
                          ) : (
                            <div className="col-sm-9 text-secondary">
                              {data && data.age}
                            </div>
                          )}
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Role</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {data && data.role}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-12 d-flex justify-content-center">
                            <button
                              className="btn mx-2 btn-info"
                              onClick={() => {
                                if (isEditing) updateData();
                                setEditing(!isEditing);
                              }}
                            >
                              {isEditing ? "Save" : "Edit"}
                            </button>
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
                  </div>
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
