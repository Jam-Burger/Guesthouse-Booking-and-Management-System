import React from "react";
import RoomCard2 from "../components/RoomCard2";
import "../styles/HotelList.css";
import { useEffect, useState } from "react";
import axios from "axios";

// photu="https://i.pinimg.com/originals/7a/eb/94/7aeb94bfc83d185275b811857d9cb90f.jpg"
// photu="https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/628d35e739bf0b59fac62a8d_Hotel%20Room%20with%20a%20View%20(1)%20(1)%20(1).jpg"
// photu="https://i.pinimg.com/originals/8b/bc/1a/8bbc1a597edcbe6ec927e4d274ef2bc2.jpg"

function HotelList() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:4000/rooms/");
        if (response.data.data) {
          let tempData = response.data.data;
          setData(tempData);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [data]);
  console.log(data);
  return (
    <div className="rHotel">
      <div className="rCards">
        {/* {data.map((item, idx) => {
          return (
            <RoomCard2
              key={idx}
              photu="https://i.pinimg.com/originals/7a/eb/94/7aeb94bfc83d185275b811857d9cb90f.jpg"
              roomName={item.type}
              roomsAvail="10 rooms Available"
              additional="✔ Complimentary breakfast"
              additional2="✔ Access to the executive lounge"
              additional3="✔ Personalized concierge service"
              para="The Executive Suite offers a spacious and luxurious retreat with a separate living area and bedroom. "
              rating="4.6"
              paraRating="Very Good"
              price="45,000/night"
              paraPrice="+ ₹6,750 addn. charges"
            />
          );
        })} */}
            <RoomCard2
              photu="https://i.pinimg.com/originals/7a/eb/94/7aeb94bfc83d185275b811857d9cb90f.jpg"
              roomName="DELUXE"
              roomsAvail="10 rooms Available"
              additional="✔ Complimentary breakfast"
              additional2="✔ Access to the executive lounge"
              additional3="✔ Personalized concierge service"
              para="The Executive Suite offers a spacious and luxurious retreat with a separate living area and bedroom. "
              rating="4.6"
              paraRating="Very Good"
              price="45,000/night"
              paraPrice="+ ₹6,750 addn. charges"
            />
      </div>
    </div>
  );
}

export default HotelList;
