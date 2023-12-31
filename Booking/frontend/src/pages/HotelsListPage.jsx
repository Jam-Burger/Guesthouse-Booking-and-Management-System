import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HotelCard from "../components/HotelCard";
import axios from "axios";

const HotelsListPage = () => {
  const [data, setData] = useState("loading...");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/hotels")
      .then((res) => {
        if(res.data.data) res.data.data.reverse();
        setData(res.data);
      })
      .catch((e) => {
        console.log("error occured : " + e);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="d-flex flex-wrap mt-4 mx-auto" style={{ width: "70%" }}>
        {data.msg === "success" &&
          data.data.map((item, id) => {
            return <HotelCard data={item} key={id} />;
          })}
      </div>
    </>
  );
};

export default HotelsListPage;
