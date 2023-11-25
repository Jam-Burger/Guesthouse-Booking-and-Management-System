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
      <section style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5">
          <MDBCol lg="2">
            <MDBContainer className="d-flex justify-content-center">
              <label
                for="upload-photo"
                style={isEditing ? { cursor: "pointer" } : {}}
              >
                <MDBCardImage
                  src={!data ? "" : data.profilePic}
                  alt="profile"
                  className="rounded-circle object-fit-cover border border-black"
                  style={{
                    width: "200px",
                    height: "200px",
                  }}
                />
                <MDBInput
                  type="file"
                  id="upload-photo"
                  accept="image/*"
                  style={{ opacity: 0, position: "absolute", zIndex: -1 }}
                  disabled={!isEditing}
                  onChange={(e) => {
                    changeProfilePic(e.target.files[0]);
                  }}
                />
              </label>
            </MDBContainer>
          </MDBCol>

          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
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
                  <MDBCol sm="3">
                    <MDBCardText>Gender</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
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
                  <MDBCol sm="3">
                    <MDBCardText>Age</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
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
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
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
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
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
                  <MDBCol>
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        if (isEditing) updateData();
                        setEditing(!isEditing);
                      }}
                    >
                      {isEditing ? "Save" : "Edit"}
                    </button>
                  </MDBCol>
                  <MDBCol>
                    <MDBCol>
                      <button
                        className="btn btn-danger"
                        onClick={isEditing ? cancel : logout}
                      >
                        {isEditing ? "Cancel" : "Log Out"}
                      </button>
                    </MDBCol>
                  </MDBCol>
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
