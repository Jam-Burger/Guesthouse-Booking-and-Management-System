import React, { useState } from 'react';

export default function MyNavbar() {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  const handleNavbarToggle = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark" aria-label="Fourth navbar example">
      <div className="container-fluid px-2">
        <span className="navbar-brand d-flex align-items-center justify-content-s" style={{ fontSize: '2rem', color: 'white' }}>
            <img className="mx-2" src="/img/logo.png" alt="Hotel Logo" width="80px" height="80px" />
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded={!isNavbarCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavbarToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} id="navbarsExample04">
          <ul className="navbar-nav d-flex  align-items-end text-align-lest ms-auto mb-2 mb-md-0">
            <li className="nav-item mx-4"><a href="/booking" style={{ textDecoration: 'none', fontSize: '1.4rem', color: 'white' }}>Booking History</a></li>
            <li className="nav-item mx-4"><a href="/staff" style={{ textDecoration: 'none', fontSize: '1.4rem', color: 'white' }}>Staff Details</a></li>
            <li className="nav-item mx-4"><a href="/reservation" style={{ textDecoration: 'none', fontSize: '1.4rem', color: 'white' }}>Reservation</a></li>
            <li className="nav-item mx-4"><a href="/inventory" style={{ textDecoration: 'none', fontSize: '1.4rem', color: 'white' }}>Inventory</a></li>
            <li className="nav-item mx-4"><a href="/profile" style={{ textDecoration: 'none', fontSize: '1.4rem', color: 'white' }}>{!isNavbarCollapsed ? (
            <span>Profile</span>) : (<img src="/img/profile.png" alt="Profile" width="30px" height="30px" /> )}</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
