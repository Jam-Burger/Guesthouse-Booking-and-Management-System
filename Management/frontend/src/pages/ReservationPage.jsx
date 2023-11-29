import Navbar2 from "../components/Navbar2";
import Sidebar from "../components/Sidebar";
import Grid from "../components/Grid";


const content = [
    { field: "itemID", headerText: "ID", width: "30" },
    { field: "itemName", headerText: "Item Name", width: "50" },
    { field: "category", headerText: "Category", width: "60" },
    { field: "inStock", headerText: "Stock", width: "40" },
    { field: "inUse", headerText: "Min Stock", width: "40" },
    { field: "prices", headerText: "Price", width: "50" },
    { field: "dealerName", headerText: "Dealer", width: "50" },
  ];

const ReservationPage = () => {
  return (
    <div>
      <Navbar2 />
      <Sidebar />
      <div style={{marginLeft:"80px"}}>
      <Grid page="RESERVATION" content={content} />
      </div>
    </div>
  );
};

export default ReservationPage;
