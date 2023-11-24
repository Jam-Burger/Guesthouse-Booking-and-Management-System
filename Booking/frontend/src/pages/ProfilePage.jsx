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
      navigate("/profile");
      console.log(response.data);
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
              <label for="upload-photo" style={{ cursor: "pointer" }}>
                <MDBCardImage
                  src={!data ? "" : data.profilePic}
                  alt="profile"
                  className="rounded-circle"
                  style={{
                    width: "200px",
                    height: "200px",
                    border: "black solid",
                  }}
                />
                <MDBInput
                  type="file"
                  id="upload-photo"
                  accept="image/*"
                  style={{ opacity: 0, position: "absolute", zIndex: -1 }}
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
                      <button className="btn btn-danger" onClick={logout}>
                        Log Out
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
