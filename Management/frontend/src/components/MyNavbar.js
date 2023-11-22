import React from 'react';



export default function MyNavbar() {
  return (
    // <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'transparent'}}>
    //   <div className="container-fluid " >
    //     <div className='col col-lg-2'><a className="navbar-brand" href="/" style={{ fontSize: '2rem', color:'white' }}><img src="/img/logo.png" alt="Hotel Logo" width="60px" height="60px" />  The Haven</a>
    //     </div>
    //     <div className='col-6 px-0'>
    //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li className="nav-item mx-4"><a href="/reservation" style={{ textDecoration: 'none', fontSize:"1.4rem" , color:'white'}}>Reservation</a></li>
    //         <li className="nav-item mx-4"><a href="/inventory" style={{ textDecoration: 'none', fontSize:"1.4rem", color:'white' }}>Inventory</a></li>
    //         <li className="nav-item mx-4"><a href="/staff" style={{ textDecoration: 'none', fontSize:"1.4rem", color:'white' }}>Staff</a></li>
    //         <li className="nav-item mx-4"><a href="/booking" style={{ textDecoration: 'none', fontSize:"1.4rem", color:'white' }}>Booking History</a></li>
    //         <li className="nav-item mx-4"><a href="/profile" style={{ textDecoration: 'none', fontSize:"1.4rem", color:'white' }}><img src="/img/profile.png" alt="Hotel Logo" width="30px" height="30px" /></a></li>
    //       </ul>
    //     </div>
    //     </div>
    //   </div>
    // </nav>
    <nav className="navbar navbar-expand-md navbar-dark" aria-label="Fourth navbar example">
    <div className="container-fluid px-2">
      <a className="navbar-brand d-flex align-items-center justify-content-s" href="/" style={{ fontSize: '2rem', color:'white' }}><img className="mx-2" src="/img/logo.png" alt="Hotel Logo" width="80px" height="80px" /></a>
      {/* <a className="navbar-brand d-flex align-items-center justify-content-s" href="/" style={{ fontSize: '2rem', color:'white', marginLeft:5}}> The Haven</a> */}
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample04">
        <ul className="navbar-nav ms-auto mb-2 mb-md-0">
          
          <li className="nav-item mx-4"><a href="/reservation" style={{ textDecoration: 'none', fontSize:"1.4rem" , color:'white'}}>Reservation</a></li>
          <li className="nav-item mx-4"><a href="/inventory" style={{ textDecoration: 'none', fontSize:"1.4rem", color:'white' }}>Inventory</a></li>
          <li className="nav-item mx-4"><a href="/staff" style={{ textDecoration: 'none', fontSize:"1.4rem", color:'white' }}>Staff</a></li>
          <li className="nav-item mx-4"><a href="/booking" style={{ textDecoration: 'none', fontSize:"1.4rem", color:'white' }}>Booking History</a></li>
          <li className="nav-item mx-4"><a href="/profile" style={{ textDecoration: 'none', fontSize:"1.4rem", color:'white' }}><img src="/img/profile.png" alt="Profile" width="30px" height="30px" /></a></li>
        </ul>
        
      </div>
    </div>
  </nav>
  );
}
