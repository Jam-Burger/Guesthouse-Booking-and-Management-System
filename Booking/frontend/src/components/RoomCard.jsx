import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RoomCard = ({ data }) => {
  const navigate = useNavigate();
  const imageLink =
    data.pictures && data.pictures.length > 0 ? data.pictures[0] : null;

  data.rating = data.rating === undefined ? 0 : data.rating;

  const handleCLick = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/me",
        { withCredentials: true }
      );
      // console.log(response.data);
      if (response.data.data) {
        navigate("/bookings/" + data._id);
      } else {
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
      navigate("/login");
    }
  };
  return (
    <div className="card mb-2">
      <div className="row">
        <div className="col-md-6">
          <img
            src={imageLink}
            style={{ height: "15rem" }}
            className="card-img object-fit-cover overflow-hidden"
            alt="..."
          />
        </div>
        <div className="col-md-4">
          <div className="card-body">
            <h5 className="card-title">{data.type}</h5>
            <p className="card-text">&#8377;{data.bookingPrice}/night</p>
            <p className="card-text">
              <small className="text-muted">capacity: {data.capacity}</small>
            </p>
            <button className="btn btn-primary" onClick={handleCLick}>
              {"Book now!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
