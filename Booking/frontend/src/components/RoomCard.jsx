import React from 'react';
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

<<<<<<< HEAD
function RoomCard(props){
    return (
    <div className="rCard">
        <img src={props.photu} className='rPhotu'/>
        <div className='rInfo'>
            <h1 className='rTitle'>{props.roomName}</h1>
            <p className='rRoomAvail'>{props.roomsAvail}</p>
            <p className='rAditn'>{props.additional}</p>
            <p className='rAditn'>{props.additional2}</p>
            <p className='rAditn'>{props.additional3}</p>
            <p className='rPara'>{props.para}</p>
=======
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
>>>>>>> 1a80ac3a634119659f124c11cc8c588aac25157e
        </div>
        <div className='rDetails'>
            <div className='rRating'>
                <p id='iRateReview'>{props.paraRating}</p>
                <p id='iRating'>{props.rating}</p>
            </div>
            <div className='rPricing'>
                <p className='rPrice'>₹{props.price}</p>
                <p className='rParaPrice'>{props.paraPrice}</p>
                <button id='bookBtn' className='rBookBtn'>Book Now!</button>
            </div>
         </div>
    </div>
    );
}

export default RoomCard;