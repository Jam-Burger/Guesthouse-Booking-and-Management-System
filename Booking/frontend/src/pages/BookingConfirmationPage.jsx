import React from 'react'

const BookingConfirmationPage = () => {
  const [isDownloading, setDownloading] = useState(false);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  
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
      const doc = new jsPDF("l", "pt", "letter");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
      setDownloading(false);
      doc.save("Invoice.pdf");
    });
  };
  return (
    <div className="relative overflow-hidden mb-5">
      <div className="masking w-full d-flex flex-col h-full justify-content-center items-center overflow-hidden bg-cover">
        <div
          style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
          className="absolute flex flex-col justify-content-center items-center content-center  bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
        >
          <div className="maskingText w-full ">
            <h1 className="text-white text-center display-2">
              Thank You for Booking from beyondSky!
            </h1>
          </div>
        </div>
      </div>
      <div className="container align-content-center mt-5 mb-3 mw-25">
        <div className="printCard card ">
          <div className="card-header d-flex bg-success justify-content-center">
            <i className="bi bi-check2-circle text-white display-6"></i>
            <h1 className="text-white px-2">
              <p>Booking Confirmed!</p>
            </h1>
          </div>
          <div className="card-body ">
            <div className="row">
              <div className="col-3 col-sm-3 col-md-3 col-xxl-3 col-xl-3 col-lg-3 flex-fill">
                <h5 className="card-title">Dear {user.firstName}</h5>
                <p className="card-text">Following are the booking details:</p>
              </div>
              <div className="d-flex ms-auto align-items-start col col-sm col-md col-xl col-xxl col-lg align-top justify-content-end">
                <img
                  src="./img/logoJug_beyondSky-removebg.png"
                  className="beyondIcon"
                  alt="mask"
                />
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
                <div className="col-12 col-xl-8">
                  <p className="m-0 fw-bold">Room Details:</p>
                  <ul className="list-unstyled">
                    <li>Rooms: {rooms.length}</li>
                    <li>Room Type: {rooms[0].type}</li>
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
              <div className="row">
                <div className="d-flex divider hrr col justify-content-end">
                  <p className="mt-2">
                    Amount Paid:{" "}
                    <span className="fw-bold">INR Rs.{amount}/-</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col d-flex justify-content-start">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/");
              }}
            >
              Go <i className="fas fa-circle-check" /> Home
            </button>
          </div>
          <div className="col d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary"
              onClick={generatePdf}
              disabled={!isDownloading === false}
            >
              {isDownloading ? <span>Downloading</span> : <span>Download</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;