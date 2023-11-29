import React, { useState } from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import "../css/bookingConfirm.css";
import h2c from 'html2canvas';
import { jsPDF } from 'jspdf';

function BookingConfirmation() {
    const [ttime, setTtime] = useState(false);

    const generatePdf = () => {
        const capture = document.querySelector('.printCard');
        setTtime(true);
        h2c(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPDF('l', 'pt', 'letter');
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
            setTtime(false);
            doc.save('Invoice1.pdf');
        })
    }

    return (
        <div className='relative overflow-hidden mb-5'>
            <div className="masking w-full d-flex flex-col h-full justify-center items-center overflow-hidden bg-cover">
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }} className="absolute flex flex-col justify-center items-center content-center  bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
                    <div className="maskingText w-full ">
                        <h1 className="text-white text-center text-6xl font-bold">Thank You for Booking from beyondSky!</h1>
                    </div>
                </div>
            </div>
            <div className='container align-content-center mt-5 mb-3 w-50'>
                <div class="printCard card ">
                    <div class="card-header d-flex bg-success justify-content-center">
                        {/* <i class="bi bi-check-circle"></i> */}
                        <IoMdCheckmarkCircleOutline className='tickIcon' /> 
                        <h1 className='text-white py-2 d-inline-flex px-2'>Booking Confirmed!</h1>
                    </div>
                    <div class="card-body ">
                        <div className='row'>
                            <div className='col-3 col-sm-3 col-md-3 col-xxl-3 col-xl-3 col-lg-3 flex-fill'>
                                <h5 class="card-title">Dear <b>Username</b></h5>
                                <p class="card-text">Following are the booking details:</p>
                            </div>
                            <div className='d-flex ms-auto align-items-start col col-sm col-md col-xl col-xxl col-lg align-top justify-content-end'>
                                <img src="./images/logoJug_beyondSky-removebg.png" className='beyondIcon' />
                            </div>
                        </div>
                        <div className="print-area p-2 ">
                            <div className='row'>
                                <div className='col-12 col-xl-8'>
                                    <ul className='list-unstyled'>
                                        <li>Date: 30th November 2023</li>
                                        <li>Booking ID: BD123456</li>
                                        <li>User: John Doe</li>
                                    </ul>
                                </div>
                                <div className='col-12 col-xl-8'>
                                    <p className='m-0 fw-bold'>Room Details:</p>
                                    <ul className='list-unstyled'>
                                        <li>Rooms: 2</li>
                                        <li>Room Type: Deluxe Suite</li>
                                        <li>No. of Guests: 4</li>
                                        <li>Room Numbers: 204,408</li>
                                    </ul>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col d-flex justify-content-start'>Checkin Date: 2023-01-15</div>
                                <div className='col d-flex justify-content-end'>Checkout Date: 2023-01-20</div>
                            </div>
                            <div className='row'>
                                <div className='d-flex divider hrr col justify-content-end'>
                                    <p className='mt-2'>Amount Paid: <span className='fw-bold'>INR.500.00/-</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row pt-3">
                    <div className="col d-flex justify-content-start"><button type="button" class="btn btn-primary">Go <i class="fas fa-circle-check"></i> Home</button></div>
                    <div className="col d-flex justify-content-end">
                        <button type="button" onClick={generatePdf} class="btn btn-primary" disabled={!ttime === false}>
                            {ttime ? (<span>Downloading</span>) : (<span>Download</span>)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingConfirmation;