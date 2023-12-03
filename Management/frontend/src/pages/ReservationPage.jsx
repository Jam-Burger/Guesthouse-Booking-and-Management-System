import Navbar2 from "../components/Navbar2";
import Sidebar from "../components/Sidebar";
// import Grid from "../components/Grid";
import DataGrid from "../components/DataGrid";
import { useState, useEffect } from "react";
import Unauthorized from "../components/Unauthorized";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function dateParser(inputDateStr) {
  // const inputDateStr = "Wed Nov 29 2023 00:00:00 GMT+0530 (India Standard Time)";
  const inputDate = new Date(inputDateStr);
  console.log("input date : ", inputDate); // Output: 2023-11-29T00:00:00.000+00:00
  const outputDateStr = inputDate.toISOString().substring(0, 10);
  console.log("output date : ", outputDateStr); // Output: 2023-11-29T00:00:00.000+00:00
  return outputDateStr;
}

function getNewValues(obj) {
  const newValues = {};
  if (obj.checkInDate) {
    newValues.checkInDate = dateParser(obj.checkInDate.newValue);
  }
  if (obj.checkOutDate) {
    newValues.checkOutDate = dateParser(obj.checkOutDate.newValue);
  }

  if (obj.guestDetails) {
    newValues.guestDetails = {};
    if (obj.guestDetails.fullName) {
      newValues.guestDetails.fullName = obj.guestDetails.fullName.newValue;
    }
    if (obj.guestDetails.contactNo) {
      newValues.guestDetails.contactNo = obj.guestDetails.contactNo.newValue;
    }
    if (obj.guestDetails.age) {
      newValues.guestDetails.age = obj.guestDetails.age.newValue;
    }
    if (obj.guestDetails.gender) {
      newValues.guestDetails.gender = obj.guestDetails.gender.newValue;
    }
  }
  return newValues;
}

function getOldValues(obj) {
  const oldValues = {};

  if (obj.checkInDate) {
    oldValues.checkInDate = obj.checkInDate.oldValue;
  }
  if (obj.checkOutDate) {
    oldValues.checkOutDate = obj.checkOutDate.oldValue;
  }

  return oldValues;
}

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
  {
    field: "room.roomNo",
    headerText: "Room Number",
    width: "15",
    isPrimaryKey: "true",
  },
  {
    field: "room.type",
    headerText: "Room Type",
    width: "20",
    isPrimaryKey: "true",
  },
  { field: "status", headerText: "Status", width: "15", isPrimaryKey: "true" },
  {
    field: "checkInDate",
    headerText: "Check In Date",
    width: "25",
    type: "date",
    format: "yMd",
    editType: "datepickeredit",
  },
  {
    field: "checkOutDate",
    headerText: "Check Out Date",
    width: "25",
    type: "date",
    format: "yMd",
    editType: "datepickeredit",
  },
  { field: "guestDetails.fullName", headerText: "Guest Name", width: "35" },
  { field: "guestDetails.contactNo", headerText: "Contact No.", width: "25" },
  {
    field: "guestDetails.age",
    headerText: "Age",
    width: "10",
    editType: "numericedit",
  },
  {
    field: "guestDetails.gender",
    headerText: "Gender",
    width: "15",
    // editType: "dropdownedit", this not done because if no female present, then female option will not come
  },
];

const ReservationPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleChange = async (args) => {
    if (args.action === "edit") {
      if (args.data.status === "Booked") {
        //patch request
        const dataToChange = objectDiff(args.previousData, args.data);
        const oldData = getOldValues(dataToChange);
        oldData.roomNo = args.data.room.roomNo;
        const newData = getNewValues(dataToChange);

        const data = { oldData: oldData, newData: newData };
        console.log("old Data from frontend  : ", oldData);
        console.log("New Data from frontend  : ", newData);
        try {
          const response = await axios.patch(
            process.env.REACT_APP_BACKEND_URL + `/bookings/`,
            data
          );
          // window.location.reload(true);
          // console.log(response);
        } catch (e) {
          console.log(e);
          // window.location.reload(true);
        }
      } else {
        //post request
        const guestDetails = {
          fullName: args.data.guestDetails.fullName,
          gender: args.data.guestDetails.gender,
          age: args.data.guestDetails.age,
          contactNo: args.data.guestDetails.contactNo,
        };
        const newData = {
          checkInDate: dateParser(args.data.checkInDate),
          checkOutDate: dateParser(args.data.checkOutDate),
          roomNo: args.data.room.roomNo,
          guestDetails: guestDetails,
        };

        try {
          const response = await axios.post(
            process.env.REACT_APP_BACKEND_URL + `/bookings`,
            newData
          );
          if (response.data.success === "false") {
            alert(response.data.msg);
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
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

          const reservationResponse = await axios.get(
            process.env.REACT_APP_BACKEND_URL + "/reservations",
            { withCredentials: true }
          );
          if (reservationResponse.data.data) {
            const allReservations = reservationResponse.data.data;

            allReservations.map((reservation) => {
              reservation.checkInDate = reservation.checkInDate.substring(
                0,
                10
              );
              reservation.checkOutDate = reservation.checkOutDate.substring(
                0,
                10
              );
            });
            setData(allReservations);
            // console.log(allReservations);
          } else {
            console.log(reservationResponse.data);
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
    <div
      style={{
        backgroundImage: 'url("/img/backgroundimg.jpeg")',
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <Navbar2 />
      <Sidebar />
      <div style={{ marginLeft: "80px" }}>
        {isLoggedIn ? (
          <DataGrid
            page="RESERVATION"
            content={content}
            data={data}
            edit="true"
            function={handleChange}
          />
        ) : (
          <Unauthorized />
        )}
      </div>
    </div>
  );
};

export default ReservationPage;