import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const ReviewCard = ({ data }) => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/users/" + data.userId
        );
        if (response.data.data) {
          setUserData(response.data.data);
        } else {
          console.log(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3>{userData && userData.firstName + " " + userData.lastName}</h3>
        <h4>{data.stars}</h4>
      </div>
      <h4>{data.message}</h4>
    </div>
  );
};

export default ReviewCard;
