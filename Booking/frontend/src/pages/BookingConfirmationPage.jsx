import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import h2c from "html2canvas";
import { jsPDF } from "jspdf";
import PageNotFound from "./PageNotFound";
import "../styles/bookingConfirm.css";

const BookingConfirmationPage = () => {
  const [isDownloading, setDownloading] = useState(false);
  const [date, setDate] = useState(new Date());
  const navigate= useNavigate();

  useEffect(() => {
    setInterval(() => setDate(new Date()), 30000);
  }, []);

  const { state } = useLocation();
  if (!state) return <PageNotFound />;
  const { checkInDate, checkOutDate, rooms, amount, user } = state;

  const generatePdf = () => {
    const capture = document.querySelector(".printCard");
    setDownloading(true);
    h2c(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");

      if (cw > ch) {
        //desktop
        const doc = new jsPDF("l", "px");
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, "PNG", 0, 0, pageWidth, pageWidth * ch / cw);
        doc.save("Invoice.pdf");
      }
      else {
        // mobile
        const doc = new jsPDF("p", "px");
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, "PNG", 0, 0, pageHeight * cw / ch, pageHeight);
        doc.save("Invoice.pdf");
      }
      setDownloading(false);
    });
  };
  return (
    // <div>
    //   <div>
    //     <div className="print-area p-2 bg-lime-400" style={{ display: "inline-block" }}>
    //       <div>checkinDate: {checkInDate}</div>
    //       <div>checkoutDate: {checkOutDate}</div>
    //       <div>user:{user.firstName + " " + user.lastName}</div>
    //       <div>rooms:{rooms.join(", ")}</div>
    //     </div>
    //   </div>
    <div className='relative overflow-hidden mb-5'>
      <div className="cheh d-flex flex-col justify-content-center items-center overflow-hidden bg-cover">
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }} className="absolute d-flex justify-content-center align-items-center h-100 w-100 overflow-hidden bg-fixed">
          <div className="maskingText w-full ">
            <h1 className="text-white text-center display-2">
              Thank You for Booking from beyondSky!
            </h1>
          </div>
        </div>
      </div>
      <div className='container align-content-center mt-5 mb-3 mw-25'>
        <div className="printCard card ">
          <div className="card-header d-flex bg-success justify-content-center">
            <i className="bi bi-check2-circle text-white display-6"></i>
            <h1 className="text-white px-2">
              <p>Booking Confirmed!</p>
            </h1>
          </div>
          <div className="card-body ">
            <div className='row'>
              <div className='col-3 flex-fill'>
                <h5 className="card-title">Dear {user.firstName}</h5>
                <p className="card-text">Following are the booking details:</p>
              </div>
              <div className='d-flex mx-auto align-items-start col align-items-top justify-content-end'>
                <img src="./img/logoJug_beyondSky-removebg.png" className='beyondIcon' />
              </div>
            </div>
            <div className="print-area p-2 ">
              <div className="row">
                <div className="col-12 col-xl-8">
                  <ul className="list-unstyled">
                    <li>
                      {"Date: "}
                      {date.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </li>
                    <li>Booking ID: BD123456</li>
                    <li>User: {user.firstName + " " + user.lastName}</li>
                  </ul>
                </div>
                <div className='col-12 col-xl-8'>
                  <p className='m-0 fw-bold'>Room Details:</p>
                  <ul className='list-unstyled'>
                    <li>Rooms: {rooms.length}</li>
                    <li>Room Type: {rooms.type}</li>
                    <li>No. of Guests: {guests}</li>
                    <li>Room Numbers: {rooms.join(", ")}</li>
                  </ul>
                </div>
              </div>

              <div className="row">
                <div className="col d-flex justify-content-start">
                  Checkin Date: {checkInDate}
                </div>
                <div className="col d-flex justify-content-end">
                  Checkout Date: {checkOutDate}
                </div>
              </div>
              <div className='row'>
                <p className='mt-2 d-flex justify-content-end'>{"Amount Paid:"} &#160;<span className='fw-bold'> INR {amount}/-</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col d-flex justify-content-start"><button type="button" onClick={()=>{navigate("/")}} className="btn btn-primary">Go <i className="fas fa-circle-check"></i> Home</button></div>
          <div className="col d-flex justify-content-end">
            <button type="button" className="btn btn-primary" onClick={generatePdf} disabled={!isDownloading === false}>
              {isDownloading ? (<span>Downloading</span>) : (<span>Download</span>)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
