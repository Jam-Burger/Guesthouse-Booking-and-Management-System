import React from 'react';
import RoomCard from './RoomCard';
import '../css/HotelList.css';

function HotelList(){
    return(
    <div className="rHotel">
        <div className='rCards'>
        <RoomCard
            photu="https://i.pinimg.com/originals/7a/eb/94/7aeb94bfc83d185275b811857d9cb90f.jpg"
            roomName="Executive Suite"
            roomsAvail='10 rooms Available'
            additional='✔ Complimentary breakfast'
            additional2='✔ Access to the executive lounge'
            additional3='✔ Personalized concierge service'
            para='The Executive Suite offers a spacious and luxurious retreat with a separate living area and bedroom. '
            rating='4.6'
            paraRating='Very Good'
            price="45,000/night"
            paraPrice='+ ₹6,750 addn. charges'
        />
         <RoomCard
            photu="https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/628d35e739bf0b59fac62a8d_Hotel%20Room%20with%20a%20View%20(1)%20(1)%20(1).jpg"
            roomName="Deluxe Ocean View Suite"
            roomsAvail='20 rooms Available'
            additional='✔ Stunning ocean views'
            additional2='✔ Complimentary spa access'
            additional3='✔  Sunset Cocktail Hour'
            para="The room's elegant decor and modern amenities provide a luxurious escape for those seeking a tranquil and rejuvenating experience."
            rating='4.4'
            paraRating='Good'
            price="60,000/night"
            paraPrice='+ ₹10,800 addn. charges'
        />
         <RoomCard
            photu="https://i.pinimg.com/originals/8b/bc/1a/8bbc1a597edcbe6ec927e4d274ef2bc2.jpg"
            roomName="Presidential Suite"
            roomsAvail='5 rooms Available'
            additional='✔ 24/7 Personalized butler service'
            additional2='✔ Private dining experience'
            additional3='✔ Helicopter Transfer'
            para=' The Presidential Suite is the epitome of opulence, featuring spacious living areas, a private dining room, and unparalleled luxury.'
            rating='4.9'
            paraRating='Excellent'
            price="1,50,000/night"
            paraPrice='+ ₹30,000 addn. charges'
        />
        </div>
    </div>
    );
}

export default HotelList;