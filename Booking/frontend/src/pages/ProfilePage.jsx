import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBInput,
  MDBCardImage,
} from "mdb-react-ui-kit";
import '../styles/profile.css';
import axios from "axios";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [data, setData] = useState();
  const [isEditing, setEditing] = useState(false);
  const [pictureFile, setPictureFile] = useState();
  const navigate = useNavigate();

  const changeProfilePic = async (file) => {
    setData({ ...data, profilePic: URL.createObjectURL(file) });
    setPictureFile(file);
  };

  const updateData = async () => {
    try {
      const formData = new FormData();
      formData.append("profileData", JSON.stringify(data));
      formData.append("picture", pictureFile);

      // console.log(formData);
      const response = await axios.patch(
        process.env.REACT_APP_BACKEND_URL + "/users",
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
    <>
      <Navbar />
      <section style={{ backgroundColor: "white", height: "100vh", backgroundSize: "cover" }}>
        <MDBContainer className=" d-flex flex-column align-items-center pt-3">
          <MDBCol lg="3">
            <MDBContainer className="d-flex flex-column align-items-center">
              <label
                className="d-flex flex-column align-items-center mb-3"
                for="upload-photo"
                style={isEditing ? { cursor: "pointer" } : {}}
              >
                <MDBInput
                  type="file"
                  id="upload-photo"
                  accept="image/*"
                  style={{ display:"none", zIndex: -1 }}
                  disabled={!isEditing}
                  onChange={(e) => {
                    changeProfilePic(e.target.files[0]);
                  }}
                />
                <MDBCardImage
                  src={!data ? "./img/maleprofile.png" : data.profilePic}
                  alt="profile"
                  className={isEditing ? "rounded-circle i object-fit-cover" : "rounded-circle object-fit-cover"}
                  style={{
                    width: "150px",
                    height: "150px",
                    border: "black solid",
                  }}
                  
                />
                
              </label>
            </MDBContainer>
          </MDBCol>

          <MDBCol lg="6">
            <MDBCard className="p-2 rounded-4" >
              <MDBCardBody >
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    {isEditing ? (
                      <MDBInput
                        type="text"
                        defaultValue={
                          !data ? "" : data.firstName + " " + data.lastName
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
                      <MDBCardText className="text-muted">
                        {data && data.firstName} {data && data.lastName}
                      </MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Gender</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    {isEditing ? (
                      <MDBInput
                        type="text"
                        defaultValue={!data ? "" : data.gender}
                        onChange={(e) => {
                          setData({ ...data, gender: e.target.value });
                        }}
                      />
                    ) : (
                      <MDBCardText className="text-muted">
                        {data && data.gender}
                      </MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Age</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    {isEditing ? (
                      <MDBInput
                        type="number"
                        defaultValue={!data ? 0 : data.age}
                        onChange={(e) => {
                          setData({ ...data, age: e.target.value });
                        }}
                      />
                    ) : (
                      <MDBCardText className="text-muted">
                        {data && data.age}
                      </MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    {isEditing ? (
                      <MDBInput
                        type="email"
                        defaultValue={!data ? "" : data.emailId}
                        onChange={(e) => {
                          setData({ ...data, email: e.target.value });
                        }}
                      />
                    ) : (
                      <MDBCardText className="text-muted">
                        {data && data.emailId}
                      </MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    {isEditing ? (
                      <MDBInput
                        type="text"
                        defaultValue={!data ? "" : data.contactNo}
                        onChange={(e) => {
                          setData({ ...data, contactNo: e.target.value });
                        }}
                      />
                    ) : (
                      <MDBCardText className="text-muted">
                        {data && data.contactNo}
                      </MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <div className="d-flex ">
                    <button
                      className="btn btn-info mx-3 my-0"
                      onClick={() => {
                        if (isEditing) updateData();
                        setEditing(!isEditing);
                      }}
                    >
                      {isEditing ? "Save" : "Edit"}
                    </button>



                    <button
                      className="btn btn-danger mx-3 my-0"
                      onClick={isEditing ? cancel : logout}
                    >
                      {isEditing ? "Cancel" : "Log Out"}
                    </button>

                  </div>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBContainer>
      </section>
    </>
  );
};

export default ProfilePage;
