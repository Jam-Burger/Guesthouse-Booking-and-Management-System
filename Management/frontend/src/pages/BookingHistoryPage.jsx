import Navbar2 from "../components/Navbar2";
import Sidebar from "../components/Sidebar";
import Grid from "../components/Grid";
import { useState, useEffect } from "react";
import axios from "axios";

const content = [
  { field: "checkInDate", headerText: "Check In Date", width: "40" },
  { field: "checkOutDate", headerText: "Check Out Date", width: "40" },
  { field: "roomNo", headerText: "Room No.", width: "20" },
  { field: "guestDetails.fullName", headerText: "Guest", width: "30" },
  { field: "guestDetails.contactNo", headerText: "contact No.", width: "40" },
  { field: "guestDetails.age", headerText: "Age", width: "20" },
  { field: "guestDetails.gender", headerText: "Gender", width: "30" },
];
const query = { hotelName: "The Haven" };

const BookingHistoryPage = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:4000/bookings", {
          params: query,
        });
        if (response.data.data) {
          let tempData = response.data.data;

          tempData.map((item) => {
            item.checkInDate = item.checkInDate.substring(0, 10);
            item.checkOutDate = item.checkOutDate.substring(0, 10);
            return false;
          });
          setData(tempData);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [data]);

  return (
    <div>
      <Navbar2 />
      <Sidebar />
      <div style={{ marginLeft: "80px" }}>
        <Grid page="BOOKING HISTORY" content={content} data={data} />
      </div>
    </div>
  );
};

export default BookingHistoryPage;
