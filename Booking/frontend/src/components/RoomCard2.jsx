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

function RoomCard2(props){
    return (
    <div className="rCard">
        <img src={props.photu} alt="room" className='rPhotu'/>
        <div className='rInfo'>
            <h1 className='rTitle'>{props.roomName}</h1>
            <p className='rRoomAvail'>{props.roomsAvail}</p>
            <p className='rAditn'>{props.additional}</p>
            <p className='rAditn'>{props.additional2}</p>
            <p className='rAditn'>{props.additional3}</p>
            <p className='rPara'>{props.para}</p>
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

export default RoomCard2;