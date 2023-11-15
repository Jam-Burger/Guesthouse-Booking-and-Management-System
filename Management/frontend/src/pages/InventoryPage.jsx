import Navbar2 from "../components/Navbar2";
import Sidebar from "../components/Sidebar";
import Grid from "../components/Grid";
import { useEffect, useState } from "react";
import axios from "axios";

const content = [
  { field: "itemId", headerText: "ID", width: "30" },
  { field: "itemName", headerText: "Item Name", width: "50" },
  { field: "category", headerText: "Category", width: "60" },
  { field: "stock", headerText: "Stock", width: "40" },
  { field: "minimumStock", headerText: "Min Stock", width: "40" },
  { field: "costPrice", headerText: "Price", width: "50" },
  { field: "dealerName", headerText: "Dealer", width: "50" },
];

const InventoryPage = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/items/");
        if (response.data.data) {
          let tempData = response.data.data;
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
        <Grid page="INVENTORY" content={content} data={data} />
      </div>
    </div>
  );
};

export default InventoryPage;
