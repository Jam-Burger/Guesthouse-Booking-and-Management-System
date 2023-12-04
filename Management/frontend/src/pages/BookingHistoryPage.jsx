import Navbar2 from "../components/Navbar2";
import Sidebar from "../components/Sidebar";
import Grid from "../components/Grid";
// import DataGrid from "../components/DataGrid";
import { useState, useEffect } from "react";
import axios from "axios";
import Unauthorized from "../components/Unauthorized";

const content = [
  { field: "roomNo", headerText: "Room No.", width: "25" },
  { field: "checkInDate", headerText: "Check In Date", width: "40" },
  { field: "checkOutDate", headerText: "Check Out Date", width: "40" },
  { field: "guestDetails.fullName", headerText: "Guest", width: "30" },
  { field: "guestDetails.contactNo", headerText: "contact No.", width: "40" },
  { field: "guestDetails.age", headerText: "Age", width: "20" },
  { field: "guestDetails.gender", headerText: "Gender", width: "30" },
];
const query = { hotelName: "The Haven" };

const BookingHistoryPage = () => {
  const [data, setData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    async function getAuthentication() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/me",
          { withCredentials: true }
        );
        console.log(response.data);
        if (response.data.data) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          console.log(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getAuthentication();
    async function fetchData() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/bookings",
          {
            params: query,
          }
        );
        console.log(response.data);
        if (response.data.data) {
          let tempData = response.data.data;

          tempData.map((item) => {
            item.checkInDate = item.checkInDate.substring(0, 10);
            item.checkOutDate = item.checkOutDate.substring(0, 10);
            return false;
          });
          setData(tempData);
          // console.log(tempData);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{backgroundImage:'url("/img/backgroundimg.jpeg")',backgroundRepeat:"no-repeat", height:"100vh", backgroundSize:"cover"}}>
      <Navbar2 />
      <Sidebar />
      <div style={{ marginLeft: "80px" }}>
        {isLoggedIn ? (
          <Grid page="BOOKING HISTORY" content={content} data={data}/>
        ) : (
          <Unauthorized />
        )}
      </div>
    </div>
  );
};

export default BookingHistoryPage;
