
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { a } from "react-router-dom";
export default function Sidebar() {
  return (

    <div className="mt-3">
      <div>
      <button className="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
      </svg></button>
      </div>
      <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div className="offcanvas-header bg-dark text-white">
          <h5 className="offcanvas-title fs-3" id="offcanvasWithBothOptionsLabel"><a href="/home" className="text-decoration-none text-white">Home</a> </h5>
          <button type="button" className=" btn btn-dark btn-close"
           data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body bg-dark ">
          <ul className="list-unstyled ">
            <li className="mb-3"><a href="/reservation" className="text-decoration-none text-white fs-4">Reservation</a></li>
            <li className="mb-3"><a href="/inventory" className="text-decoration-none text-white fs-4">Inventory</a></li>
            <li className="mb-3"><a href="/booking" className="text-decoration-none text-white fs-4">Booking History</a></li>
            <li className="mb-3"><a href="/staff" className="text-decoration-none text-white fs-4">Staff Management</a></li>
          </ul>
          <div className="fixed-bottom mt-3 p-3">
            <a href="/profile" className="text-decoration-none text-white fs-4">
              Profile
            </a>
          </div>
        </div>
      </div>


    </div>

  )
}
