import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Sidebar = () => {
  const [role, setRole] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/me",
          { withCredentials: true }
        );
        // console.log(response.data);
        if (response.data.data) {
          setRole(response.data.data.role);
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
      <div>
        <div
          style={{
            position: "absolute",
            display: "flex",
            height: "100vh",
            overflow: "scroll initial",
            left: "0px",
            top: "0px",
            zIndex: "1",
          }}
        >
          <CDBSidebar toggled textColor="#fff" backgroundColor="#333">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <a
                href="/"
                className="text-decoration-none"
                style={{ color: "inherit" }}
              >
                Home
              </a>
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                {(role === "admin" || role === "Receptionist") ? 
                  <>
                    <NavLink to="/reservation" activeclassname="activeClicked">
                      <CDBSidebarMenuItem icon="calendar">
                        Reservation
                      </CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink to="/booking" activeclassname="activeClicked">
                      <CDBSidebarMenuItem icon="history">
                        Booking History
                      </CDBSidebarMenuItem>
                    </NavLink>
                  </> : <span></span>
                }
                {(role === "admin" || role === "Inventory-Manager") ? 
                  
                <NavLink to="/inventory" activeclassname="activeClicked">
                    <CDBSidebarMenuItem icon="warehouse">
                      Inventory
                    </CDBSidebarMenuItem>
                  </NavLink> : <span></span>

                }
                {role === "admin" ? 
                  <NavLink to="/staff" activeclassname="activeClicked">
                    <CDBSidebarMenuItem icon="user-cog">
                      Staff Management
                    </CDBSidebarMenuItem>
                  </NavLink> : <span></span>
                }
              </CDBSidebarMenu>
            </CDBSidebarContent>

            <CDBSidebarFooter style={{ textAlign: "center" }}>
              <CDBSidebarMenu>
                <NavLink to="/profile">
                  <CDBSidebarMenuItem
                    icon="user"
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    Profile
                  </CDBSidebarMenuItem>
                </NavLink>
              </CDBSidebarMenu>
            </CDBSidebarFooter>
          </CDBSidebar>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
