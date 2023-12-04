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
    <div className="rCard card mb-3 mt-3 border-none border-0 shadow" style={{ maxWidth: "800px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={imageLink} className="h-full object-fit-cover rounded" alt=""/>
        </div>
        <div className="col-md-8 ">
          <div className="card-body row d-flex justify-content-center">
            <div className='col-md-8 mb-0 mt-2 '>
              <h1 className='text-info-emphasis'>{data.type}</h1>
              <h3><p className='m-0'>₹{data.bookingPrice}</p></h3>
              <h5><p className='m-0 text-secondary'>Capacity: {data.capacity}</p></h5>
              <button className='btn btn-primary mt-3' onClick={handleCLick}>Book Now!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
