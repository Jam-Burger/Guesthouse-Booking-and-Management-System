import React from 'react'

const RoomCard = ({ data }) => {
  const imageLink =
    data.pictures && data.pictures.length > 0 ? data.pictures[0] : null;
  let rating = -1;
  if (data.reviews.length > 0) {
    data.reviews.forEach((review) => {
      rating += review.stars;
    });
  }
  rating /= data.reviews.length;
  return (
    <div className="card">
      <div className="row no-gutters">
        <div className="col-sm-3">
          <img className="card-img" src={imageLink} alt={imageLink} />
        </div>
        <div className="col">
          <div className="card-body">
            <h5 className="card-title">{data.name}</h5>
            <p className="card-text">{data.description}</p>
            <p className="card-text">
              Rating: {rating >= 0 ? rating : "unrated"}
            </p>
            <p className="card-text">Address: {data.address}</p>
            <p className="card-text">Contact: {data.contactNo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;