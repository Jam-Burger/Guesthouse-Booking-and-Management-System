import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import axios from "axios";

const RoomsListPage = (props) => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/hotels/" + id
        );
        if (response.data.data) {
          let tempData = [];
          for (let roomid of response.data.data.rooms) {
            const roomData = await axios.get(
              process.env.REACT_APP_BACKEND_URL + "/rooms/" + roomid
            );
            tempData.push(roomData.data.data);
          }
          setData(tempData);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  });

  return (
    <div className="d-flex flex-wrap mx-auto" style={{ width: "70%" }}>
      {data.map((item, id) => {
        // console.log(item);
        return <RoomCard data={item} key={id} />;
      })}
    </div>
  );
};

export default RoomsListPage;
