import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import axios from "axios";
import "../styles/HotelList.css";

const RoomsListPage = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const hd = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/hotels/" + id
        );
        if (hd.data.data) {
          let tempData = [];
          const allRoomsData = await axios.get(
            process.env.REACT_APP_MANAGEMENT_BACKEND_URL + "/rooms/"
          );
          if (allRoomsData.data.data) {
            for (let roomCategoryId of hd.data.data.rooms) {
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
    <div className="d-flex justify-content-center">
      <div
        className="d-flex flex-column justify-center"
        style={{ width: "70%", height: "100vh" }}
      >
        {data.map((item, id) => {
          return <RoomCard data={item} key={id} />;
        })}
      </div>
    </div>
  );
};

export default RoomsListPage;
