import React from "react";
import { Link } from "react-router-dom";

const HotelCard = ({ data }) => {
  const imageLink =
    data.pictures && data.pictures.length > 0 ? data.pictures[0] : null;
  let ratingText = "unrated";
  if (data.reviews.length > 0) {
    let rating = 0;
    data.reviews.forEach((review) => {
      rating += review.stars;
    });
    rating /= data.reviews.length;
    ratingText = `${rating.toFixed(1)} (${data.reviews.length} reviews)`;
  }

  return (
    <div className="p-2 col-md-4">
      <Link to={"/hotels/" + data._id}>
        <div className="card">
          <img
            className="card-img object-fit-cover"
            style={{ height: "300px" }}
            src={imageLink}
            alt={imageLink}
          />
          <div className="card-body">
            <h5 className="card-title">{data.name}</h5>
            <p className="card-text">Rating: {ratingText}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCard;
