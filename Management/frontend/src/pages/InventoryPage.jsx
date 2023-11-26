import Navbar2 from "../components/Navbar2";
import Sidebar from "../components/Sidebar";
import DataGrid from "../components/DataGrid";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Unauthorized from "../components/Unauthorized";
function objectDiff(obj1, obj2) {
  const differences = {};

  for (const key in obj1) {
    if (!obj2.hasOwnProperty(key)) {
      differences[key] = obj1[key];
    } else if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      const innerDifferences = objectDiff(obj1[key], obj2[key]);

      if (Object.keys(innerDifferences).length > 0) {
        differences[key] = innerDifferences;
      }
    } else if (obj1[key] !== obj2[key]) {
      differences[key] = {
        oldValue: obj1[key],
        newValue: obj2[key],
      };
    }
  }

  for (const key in obj2) {
    if (!obj1.hasOwnProperty(key)) {
      differences[key] = obj2[key];
    }
  }

  return differences;
}

const content = [
  { field: "itemId", headerText: "ID", width: "30", isPrimaryKey: "true" },
  { field: "itemName", headerText: "Item Name", width: "50", editType: "none" },
  {
    field: "category",
    headerText: "Category",
    width: "60",
    editType: "dropdownedit",
  },
  { field: "stock", headerText: "Stock", width: "40", editType: "numericedit" },
  {
    field: "minimumStock",
    headerText: "Min Stock",
    width: "40",
    editType: "numericedit",
  },
  {
    field: "costPrice",
    headerText: "Price",
    width: "50",
    editType: "numericedit",
  },
  {
    field: "dealerName",
    headerText: "Dealer",
    width: "50",
    editType: "dropdownedit",
  },
];

const InventoryPage = () => {
  const [data, setData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleChange = async (args) => {
    console.log("args : ", args);
    if (args.action === "edit" || args.action === "add") {
      const dialog = args.dialog;
      dialog.showCloseIcon = false;
      dialog.height = 400;
      // change the header of the dialog
      dialog.header =
        args.action === "edit"
          ? "Edit Record of " + args.rowData["itemID"]
          : "New Item";
    }
    if (args.action === "edit") {
      const dataToChange = objectDiff(args.previousData, args.data);
      const newDataToChange = {};

      for (const key in dataToChange) {
        if (typeof dataToChange[key] === "object") {
          newDataToChange[key] = dataToChange[key].newValue;
        }
      }
      try {
        const response = await axios.patch(
          `http://localhost:5000/items/${args.primaryKeyValue[0]}`,
          newDataToChange
        );
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    }
    if (args.action === "add") {
      try {
        const response = await axios.post(
          `http://localhost:5000/items/`,
          args.data
        );
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    }

    if (args.requestType === "delete") {
      // const answer = prompt(
      //   `Are you sure that you want to delte the item with Item ID = ${args.data[0].itemId} ?, Press 'Y' to confirm and Press 'N' to cancel `
      // );
      // if (answer === "y" || answer ==="Y") {
      try {
        console.log(args.data[0].itemId);
        const response = await axios.delete(
          `http://localhost:5000/items/${args.data[0].itemId}`
        );
        console.log(response);
      } catch (e) {
        console.log(e);
      }
      // }
    }
  };
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
          process.env.REACT_APP_BACKEND_URL + "/items/"
        );
        if (response.data.data) {
          let tempData = response.data.data;
          setData(tempData);
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
      {isLoggedIn? <div style={{ marginLeft: "80px" }}>
        <DataGrid
          page="INVENTORY"
          content={content}
          data={data}
          function={(args) => {
            handleChange(args);
          }}
        />
      </div> : <Unauthorized /> }
    </div>
  );
};

export default InventoryPage;
