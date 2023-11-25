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

const Sidebar = () => {
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
                href="/home"
                className="text-decoration-none"
                style={{ color: "inherit" }}
              >
                Home
              </a>
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <NavLink to="/reservation" activeclassname="activeClicked">
                  <CDBSidebarMenuItem icon="calendar">
                    Reservation
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink to="/inventory" activeclassname="activeClicked">
                  <CDBSidebarMenuItem icon="warehouse">
                    Inventory
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink to="/booking" activeclassname="activeClicked">
                  <CDBSidebarMenuItem icon="history">
                    Booking History
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink to="/staff" activeclassname="activeClicked">
                  <CDBSidebarMenuItem icon="user-cog">
                    Staff Management
                  </CDBSidebarMenuItem>
                </NavLink>
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
