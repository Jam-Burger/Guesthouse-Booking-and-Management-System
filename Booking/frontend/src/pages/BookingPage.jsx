import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const BookingPage = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/rooms/" + id
        );
        if (response.data.data) {
          setData(response.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [id]);

  return <div>{data !== 0 && <h3>{data.type}</h3>}</div>;
};

export default BookingPage;
