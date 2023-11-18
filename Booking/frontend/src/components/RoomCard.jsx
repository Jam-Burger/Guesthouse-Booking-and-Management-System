import React from "react";

const RoomCard = ({ data }) => {
  const imageLink =
    data.pictures && data.pictures.length > 0 ? data.pictures[0] : null;

  data.rating = data.rating === undefined ? 0 : data.rating;
  return (
    <div className="rCard">
      <img src={imageLink} alt="room" className="rPhotu" />
      <div className="rInfo">
        <h1 className="rTitle">{data.type}</h1>
        <p className="rRoomAvail">{"-"}</p>
        <p className="rAditn">{"data.additional"}</p>
        <p className="rAditn">{"data.additional2"}</p>
        <p className="rAditn">{"data.additional3"}</p>
        <p className="rPara">{"data.para"}</p>
      </div>
      <div className="rDetails">
        <div className="rRating">
          <p id="iRateReview">{data.rating}</p>
          <p id="iRating">{data.rating}</p>
        </div>
        <div className="rPricing">
          <p className="rPrice">₹{data.bookingPrice}/night</p>
          <p className="rParaPrice">{data.bookingPrice}</p>
          <button id="bookBtn" className="rBookBtn">
            Book Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
