import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HotelCard from "../components/HotelCard";
import axios from "axios";

const HomePage = () => {
  const [data, setData] = useState("loading...");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/hotels`)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log("error occured : " + e);
      });
  });

  return (
    <>
      <Navbar />
      <div className="d-flex flex-wrap mx-auto" style={{ width: "70%" }}>
        {data.msg === "success" &&
          data.data.map((item, id) => {
            return <HotelCard data={item} key={id} />;
          })}
      </div>
    </>
  );
};

export default HomePage;
