import React from 'react';
import {useNavigate} from "react-router-dom";
//deluxe, simple,luxury ke 3 vertical room cards banane hai

// function loginReq(e){
// iss function ko use karlena divyam bhai...agar bina login ke koi booking kar raha ho toh 
//     if(e != accountLogin){
//         document.getElementById('bookBtn').hidden = true;
//         <p className='rRating'>Please Login first to make this booking.</p>
//     }else{
//         document.getElementById('bookBtn').hidden = false;
//     }
// }
// <button id='bookBtn' className='rBookBtn' onclick={(e)=>{loginReq(e)}}>Book Now!</button> //use this code below
const RoomCard = ({ data }) => {
  const navigate = useNavigate();
  const imageLink =
    data.pictures && data.pictures.length > 0 ? data.pictures[0] : null;

  data.rating = data.rating === undefined ? 0 : data.rating;
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
}

export default RoomCard;