import React from "react";
import Navbar2 from "../components/Navbar2";
import Sidebar from "../components/Sidebar";

const ProfilePage = () => {
  return (
    <div>
      <Navbar2 />
      <Sidebar />
      <div style={{marginLeft:"80px"}}>
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
                        <h4>John Doe</h4>
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
                      <div className="col-sm-9 text-secondary">Jay Parikh</div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        fip@jukmuh.al
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Phone</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        (239) 816-9029
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Gender</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">Male</div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Age</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">35</div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Role</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        Receptionist
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-12 d-flex justify-content-center">
                        <a className="btn btn-info" target="__blank" href="/">
                          Edit  
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
