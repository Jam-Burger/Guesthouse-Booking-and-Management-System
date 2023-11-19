import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookingPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const roomCategoryData = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/rooms/" + id
        );
        const allRoomsData = await axios.get(
          process.env.REACT_APP_MANAGEMENT_BACKEND_URL + "/rooms/"
        );
        if (allRoomsData.data.data) {
          let tempData = allRoomsData.data.data;
          tempData = tempData.filter((item) => {
            return (
              item.status === "AVAILABLE" &&
              item.type === roomCategoryData.data.data.type
            );
          });
          setData(tempData);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [id]);

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const setMinDate = () => {

  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="checkInDate" className="form-label">
          Check In date
        </label>
        <input
          type="date"
          className="form-control"
          id="checkInDate"
          placeholder="dd/mm/yyyy"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          min={new Date()}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="checkOutDate" className="form-label">
          Check out date
        </label>
        <input
          type="date"
          className="form-control"
          id="checkOutDate"
          placeholder="dd/mm/yyyy"
          value={checkOutDate}
          onChange={(e) => {setCheckOutDate(e.target.value);
          console.log(e.target.value)}}
          min={checkInDate}
        />
      </div>

      <div className="mb-3">
        <select className="form-select" aria-label="Default select example">
          <option>number of rooms to book {"max " + data.length}</option>

        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default BookingPage;
