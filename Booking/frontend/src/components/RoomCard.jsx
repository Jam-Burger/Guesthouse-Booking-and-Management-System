import React from "react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ data }) => {
  const navigate = useNavigate();
  const imageLink =
    data.pictures && data.pictures.length > 0 ? data.pictures[0] : null;

  data.rating = data.rating === undefined ? 0 : data.rating;
  // console.log(data);
  return (
    <>
      <div className="card mb-2">
        <div className="row g-0">
          <img
            src={imageLink}
            style={{ width: "25rem", maxHeight: "15rem" }}
            className="col-md-6 card-img object-fit-cover overflow-hidden"
            alt="..."
          />
          <div className="col-md-4">
            <div className="card-body">
              <h5 className="card-title">{data.type}</h5>
              <p className="card-text">&#8377;{data.bookingPrice}/night</p>
              <p className="card-text">
                <small className="text-muted">capacity: {data.capacity}</small>
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/bookings/" + data._id);
                }}
              >
                {"Book now!"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomCard;
