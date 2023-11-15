import Navbar2 from "../components/Navbar2";
import Sidebar from "../components/Sidebar";
import Grid from "../components/Grid";
import { useEffect, useState } from "react";
import axios from "axios";

const content = [
  { field: "fullName", headerText: "Name", width: "30" },
  { field: "EmailId", headerText: "Email ID", width: "30" },
  { field: "contactNo", headerText: "Contact No.", width: "30" },
  { field: "shift", headerText: "Shift", width: "30" },
  { field: "role", headerText: "Role", width: "30" },
  { field: "salary", headerText: "Salary", width: "40" },
  // { field: "minimumStock", headerText: "Gender", width: "40" }, PS: Show both of these when view Profile is clicked
  // { field: "minimumStock", headerText: "Age", width: "40" },
];

const StaffManagementPage = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL+"/staff/");
        if (response.data.data) {
          let tempData = response.data.data;
          const updatedData = tempData.map((person) => {
            person.fullName = `${person.firstName} ${person.lastName}`;
            return person;
          });
          setData(updatedData);
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
        <Grid page="EMPLOYEES" content={content} data={data} />
      </div>
    </div>
  );
};

export default StaffManagementPage;
