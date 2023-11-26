import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import "../styles/HotelList.css";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";

const RoomsListPage = () => {
  const { id } = useParams();
  const [hotelData, setHotelData] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const hd = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/hotels/" + id
        );
        setHotelData(hd.data.data);
        if (hotelData) {
          let tempData = [];
          const allRoomsData = await axios.get(
            process.env.REACT_APP_MANAGEMENT_BACKEND_URL + "/rooms/"
          );
          if (allRoomsData.data.data) {
            for (let roomCategoryId of hotelData.rooms) {
              const roomCategoryData = await axios.get(
                process.env.REACT_APP_BACKEND_URL + "/rooms/" + roomCategoryId
              );
              tempData.push(roomCategoryData.data.data);
            }
          }
          setData(tempData);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div>
      <h1 className="m-4">{hotelData && hotelData.name}</h1>
      <div className="d-flex flex-row px-4 justify-content-between">
        <div className="col-md-7">
          <div className="d-flex flex-column" style={{ height: "100vh" }}>
            {data.map((item, id) => {
              return <RoomCard data={item} key={id} />;
            })}
          </div>
        </div>
        <div className="col-md-4">
          <h2>
            <b>Reviews</b>
          </h2>
          <div className="d-flex flex-column">
            {hotelData &&
              hotelData.reviews.map((item, id) => {
                return <ReviewCard data={item} key={id} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsListPage;
