import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const getTodayDate = () => {
  const date = new Date();
  return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
};
const getTomorrowDate = () => {
  const date = new Date(Date.now() + 24 * 3600 * 1000);
  return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
};
const computeAmount = (bp, cid, cod, nor) => {
  return (bp * nor * (new Date(cod) - new Date(cid))) / 86400000;
};

const BookingPage = () => {
  const { id } = useParams();
  const [roomsData, setData] = useState([]);
  const [roomCategoryData, setRoomCategoryData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const rcd = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/rooms/" + id
        );
        setRoomCategoryData(rcd.data.data);

        const allRoomsData = await axios.get(
          process.env.REACT_APP_MANAGEMENT_BACKEND_URL + "/rooms/"
        );
        if (allRoomsData.data.data) {
          let tempData = allRoomsData.data.data;
          tempData = tempData.filter((item) => {
            return (
              item.status === "AVAILABLE" && item.type === rcd.data.data.type
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

  const [checkInDate, setCheckInDate] = useState(getTodayDate());
  const [checkOutDate, setCheckOutDate] = useState(getTomorrowDate());
  const [noOfRooms, setNoOfRooms] = useState(Math.max(0, roomsData.length));

  const handleSubmit = (e) => {
    // console.log(checkInDate, checkOutDate, noOfRooms);
    const amount = computeAmount(
      roomCategoryData.bookingPrice,
      checkInDate,
      checkOutDate,
      noOfRooms
    );
    let rooms = roomsData.slice(0, noOfRooms);
    rooms = rooms.map((item) => {
      return item.roomNo;
    });
    navigate("/payment", {
      state: {
        amount,
        checkInDate,
        checkOutDate,
        rooms,
      },
    });
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center pt-3">
      <div style={{ width: "70%" }}>
        <h1>{roomCategoryData.type}</h1>
        <h3>{roomCategoryData.bookingPrice}/night</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="checkInDate" className="form-label">
              Check In date
            </label>
            <input
              type="date"
              className="form-control"
              id="checkInDate"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              min={getTodayDate()}
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
              value={checkOutDate}
              onChange={(e) => {
                setCheckOutDate(e.target.value);
              }}
              min={checkInDate}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="noOfRo0ms" className="form-label">
              Select number of rooms to book
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setNoOfRooms(e.target.value);
              }}
            >
              {roomsData.map((item, id) => {
                return (
                  <option key={id + 1} value={id + 1}>
                    {" "}
                    {id + 1}{" "}
                  </option>
                );
              })}
            </select>
          </div>
          <h3>
            Payment={" "}
            {computeAmount(
              roomCategoryData.bookingPrice,
              checkInDate,
              checkOutDate,
              noOfRooms
            )}
          </h3>
          <h5>
            {(new Date(checkOutDate) - new Date(checkInDate)) / 86400000} nights
            stay
          </h5>
          <button type="submit" className="btn btn-primary">
            Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
