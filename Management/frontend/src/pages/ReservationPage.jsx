import Navbar2 from "../components/Navbar2";
import Sidebar from "../components/Sidebar";
// import Grid from "../components/Grid";
import DataGrid from "../components/DataGrid";
import { useState, useEffect } from "react";
import Unauthorized from "../components/Unauthorized";
import axios from "axios";

const content = [
  { field: "roomNo", headerText: "Room Number", width: "30" },
  { field: "type", headerText: "Room Type", width: "40" },
  { field: "status", headerText: "Status", width: "50" },
  { field: "guestName", headerText: "Guest Name", width: "60" },
];

const ReservationPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState({});
  // const [bookedRoom,setBookedRoom] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/me",
          { withCredentials: true }
        );
        console.log(response.data);
        if (response.data.data) {
          setIsLoggedIn(true);

          const roomResponse = await axios.get(
            process.env.REACT_APP_BACKEND_URL + "/rooms",
            { withCredentials: true }
          );
          if (roomResponse.data.data) {
            const allRooms = roomResponse.data.data;
            setData(allRooms);
          } else {
            console.log(roomResponse.data);
          }

          const bookingResponse = await axios.get(
            process.env.REACT_APP_BACKEND_URL + "/bookings",
            { withCredentials: true }
          );
          if (bookingResponse.data.data) {
            const allBookedRooms = bookingResponse.data.data;
            // setData((prevData) => {
            //   ({ ...prevData,  allBookedRooms});
            // });
            console.log("updated data : ", data);
            // setBookedRoom(allBookedRooms);
          } else {
            console.log(bookingResponse.data);
          }
        } else {
          setIsLoggedIn(false);
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
        {isLoggedIn ? (
          <DataGrid
            page="RESERVATION"
            content={content}
            data={data}
            edit="true"
          />
        ) : (
          <Unauthorized />
        )}
      </div>
    </div>
  );
};

export default ReservationPage;
