import React from "react";
import Sidebar from "../components/Sidebar";

const ReservationPage = ()=>{
    return (
        <>
        <Sidebar />
        <div style={{position:"absolute", marginLeft:"90px"}}>
            This is Reservation Page
        </div>
        </>
    );
}

export default ReservationPage;