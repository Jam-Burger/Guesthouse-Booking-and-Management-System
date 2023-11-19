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
      <div className="card" style={{ width: "70%" }}>
        <div className="row g-0">
          <div className="col-md-6" style={{ width: "25rem" }}>
            <img
              src={imageLink}
              className="card-img object-fit-cover rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-4">
            <div className="card-body">
              <h5 className="card-title">{data.type}</h5>
              <p className="card-text">{data.bookingPrice}/night</p>
              <p className="card-text">
                <small className="text-muted">capacity: {data.capacity}</small>
              </p>
              <p>{data.availableRooms.length} rooms available</p>
              <div
                className="btn btn-primary"
                onClick={() => {
                  navigate("/bookings/" + data._id);
                }}
              >
                Book now!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomCard;
