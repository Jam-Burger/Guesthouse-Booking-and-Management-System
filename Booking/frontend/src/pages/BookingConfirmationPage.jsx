import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import h2c from "html2canvas";
import { jsPDF } from "jspdf";
import PageNotFound from "./PageNotFound";

const BookingConfirmationPage = () => {
  const [isDownloading, setDownloading] = useState(false);

  const { state } = useLocation();
  if (!state) return <PageNotFound />;
  const { checkInDate, checkOutDate, rooms, amount, user } = state;

  const generatePdf = () => {
    const capture = document.querySelector(".print-area");
    const cw = capture.offsetWidth;
    const ch = capture.offsetHeight;
    setDownloading(true);
    h2c(capture, {
      width: cw,
      height: ch,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "px");
      const pageWidth = doc.internal.pageSize.getWidth();
      console.log(
        capture.offsetWidth,
        capture.offsetHeight,
        pageWidth,
        (pageWidth * ch) / cw
      );
      doc.addImage(imgData, "PNG", 0, 0, cw, ch);
      setDownloading(false);
      doc.save("Invoice.pdf");
    });
  };
  return (
    <div>
      <div>
        <div className="print-area p-2 bg-lime-400" style={{ display: "inline-block" }}>
          <div>checkinDate: {checkInDate}</div>
          <div>checkoutDate: {checkOutDate}</div>
          <div>user:{user.firstName + " " + user.lastName}</div>
          <div>rooms:{rooms.join(", ")}</div>
        </div>
      </div>
      <button
        className="btn btn-primary"
        onClick={generatePdf}
        disabled={!(isDownloading === false)}
      >
        {isDownloading ? <span>Downloading</span> : <span>Download</span>}
      </button>
    </div>
  );
};

export default BookingConfirmationPage;
