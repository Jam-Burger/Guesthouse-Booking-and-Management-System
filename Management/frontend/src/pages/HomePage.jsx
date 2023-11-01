import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [data, setData] = useState("loading...");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/`)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log("error occured : " + e);
      });
  });

  return (
    <>
      <div>{data}</div>
    </>
  );
};

export default HomePage;
