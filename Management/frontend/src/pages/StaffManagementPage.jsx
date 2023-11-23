import Navbar2 from "../components/Navbar2";
import Sidebar from "../components/Sidebar";
import DataGrid from "../components/DataGrid";
import { useEffect, useState } from "react";
import axios from "axios";
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
  { field: "fullName", headerText: "Name", width: "30", isPrimaryKey: "true" },
  {
    field: "emailId",
    headerText: "Email ID",
    width: "30",
    isPrimaryKey: "true",
  },
  {
    field: "contactNo",
    headerText: "Contact No.",
    width: "30",
    isPrimaryKey: "true",
  },
  {
    field: "shift",
    headerText: "Shift",
    width: "30",
    editType: "dropdownedit",
  },
  { field: "role", headerText: "Role", width: "30", editType: "dropdownedit" },
  {
    field: "salary",
    headerText: "Salary",
    width: "30",
    editType: "numericedit",
  },
  { field: "gender", headerText: "Gender", width: "20", isPrimaryKey: "true" },
  { field: "age", headerText: "Age", width: "20", isPrimaryKey: "true" },
];

const handleChange = async (args) => {
  console.log("args : ", args);
  if (args.action === "edit" || args.action === "add") {
    const dialog = args.dialog;
    dialog.showCloseIcon = false;
    dialog.height = 400;
    // change the header of the dialog
    dialog.header =
      args.action === "edit"
        ? "Edit Record of " + args.rowData["fullName"]
        : "New Employee";
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
        `http://localhost:5000/staff/${args.primaryKeyValue[1]}`,
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
        `http://localhost:5000/staff/signup`,
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
        `http://localhost:5000/staff/${args.data[0].emailId}`
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    // }
  }
};

const StaffManagementPage = () => {
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/staff/"
        );

        if (response.data.data) {
          let tempData = response.data.data;
          const updatedData = tempData.map((person) => {
            person.fullName = `${person.firstName} ${person.lastName}`;
            return person;
          });
          setData(updatedData);
          setMessage("");
        }
      } catch (e) {
        setMessage("Unauthorized Access");
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
        {message === "" ? (
          <DataGrid
            page="EMPLOYEES"
            content={content}
            data={data}
            function={(args) => {
              handleChange(args);
            }}
          />
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>{message}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffManagementPage;
