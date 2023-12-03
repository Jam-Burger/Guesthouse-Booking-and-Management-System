import Navbar2 from "../components/Navbar2";
import Sidebar from "../components/Sidebar";
// import Grid from "../components/Grid";
import DataGrid from "../components/DataGrid";
import { DatePickerComponent, DateRangePickerComponent } from "@syncfusion/ej2-react-calendars"
import { getValue } from '@syncfusion/ej2-base';
import { useState, useEffect } from "react";
import Unauthorized from "../components/Unauthorized";
import axios from "axios";

function dateParser(inputDateStr){
  console.log("input date : ",inputDateStr); // Output: 2023-11-29T00:00:00.000+00:00
  // const inputDateStr = "Wed Nov 29 2023 00:00:00 GMT+0530 (India Standard Time)";
const inputDate = new Date(inputDateStr);
const outputDateStr = inputDate.toISOString().replace(/Z$/, "+00:00");
console.log("output date : ",outputDateStr); // Output: 2023-11-29T00:00:00.000+00:00
return outputDateStr;
}

function getOldValues(obj) {
  const oldValues = {};

  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      oldValues[key] = getOldValues(obj[key]);
    } else {
      oldValues[key] = obj[key].oldValue;
    }
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

const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 15);
const maxDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15);
// var editTemp =  (argss) => {
//   return (<DatePickerComponent value={getValue('OrderDate', argss)}  id="OrderDate" placeholder="Order Date" floatLabelType='Never' />);
// }
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
    // startDate: {minDate},
    // endDate: {maxDate},
    
    // editTemplate : {editTemp}
  },
  {
    field: "checkOutDate",
    headerText: "Check Out Date",
    width: "25",
    type: "date",
    format: "yMd",
    editType: "datepickeredit",
    // startDate: {minDate},
    // endDate: {maxDate},
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
  const handleChange = async (args) => {
    console.log("args : ", args);
    if (args.action === "edit") {
      if (args.data.status === "Booked") {
        //patch request
        const dataToChange = objectDiff(args.previousData, args.data);
        // const newDataToChange = {};

        // for (const key in dataToChange) {
        //   if (typeof dataToChange[key] === "object") {
        //     newDataToChange[key] = dataToChange[key].newValue;
        //   }
        // }
        // console.log("previousData : ",args.previousData);
        console.log("Data to change in frontend :", dataToChange)
        // console.log("new Data to change in frontend : ", newDataToChange)
        // let data = {prevData : args.previousData, newData : newDataToChange }


        const oldData = getOldValues(dataToChange);
        console.log("old Data from frontend  :  aasa ",oldData);
        // try {
        //   const response = await axios.patch(
        //     process.env.REACT_APP_BACKEND_URL +
        //       `/bookings/`,
        //     dataToChange
        //   );
        //   // console.log(response);
        // } catch (e) {
        //   console.log(e);
        // }
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
          guestDetails : guestDetails
        };
        
        try {
          const response = await axios.post(
            process.env.REACT_APP_BACKEND_URL +
              `/bookings`,
            newData
          );
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
            function={(args) => {
              handleChange(args);
            }}
          />
        ) : (
          <Unauthorized />
        )}
      </div>
    </div>
  );
};

export default ReservationPage;
