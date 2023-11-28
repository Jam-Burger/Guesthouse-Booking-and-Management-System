import Navbar2 from "../components/Navbar2";
import Sidebar from "../components/Sidebar";
import Grid from "../components/Grid";

const content = [
  { field: "roomNo", headerText: "Room Number", width: "30" },
  { field: "type", headerText: "Type", width: "40" },
  { field: "status", headerText: "Status", width: "50" },
  { field: "guestName", headerText: "Guest Name", width: "60" },
];

const ReservationPage = () => {
  return (
    <div>
      <Navbar2 />
      <Sidebar />
      <div style={{ marginLeft: "80px" }}>
        <Grid page="RESERVATION" content={content} />
      </div>
    </div>
  );
};

export default ReservationPage;
