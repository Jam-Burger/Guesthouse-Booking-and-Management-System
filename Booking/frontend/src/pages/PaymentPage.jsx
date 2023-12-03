import React, { useState } from "react";
import "../styles/dummyPay.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import PageNotFound from "./PageNotFound";

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [msg, setMessage] = useState("");
  const navigate = useNavigate();

  const { state } = useLocation();
  if (!state) return <PageNotFound />;
  const { checkInDate, checkOutDate, rooms, amount } = state;

  const cardNumberRegex = "[0-9]{16}";
  const cvvRegex = "^[0-9]{3}$";
  const expiryDateRegex = "^(0[1-9]|1[0-2])/[0-9]{2}$";
  const cardHolderNameRegex = "^[a-zA-Z ]{5,30}$";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/me",
        { withCredentials: true }
      );
      const user = response.data.data;
      if (!user) {
        console.log(response.data);
        return;
      }
      rooms.forEach(async (roomNo) => {
        const booking = {
          checkInDate,
          checkOutDate,
          roomNo,
          guestDetails: {
            fullName: user.firstName + " " + user.lastName,
            gender: user.gender,
            age: user.age,
            contactNo: user.contactNo,
          },
        };
        await axios.post(
          process.env.REACT_APP_MANAGEMENT_BACKEND_URL + "/bookings",
          booking
        );
      });
      navigate("/bookingConfirmation", {
        state: { ...state, user },
        replace: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="paymDiv">
      <h1 className="dumTitle">Payment</h1>
      <div className="paymImg">
        <img
          src="/img/amazonPayImg.png"
          alt="Payment Logo"
          className="paymLogo"
        />
        <img
          src="/img/masterCardImg.png"
          alt="Master Card"
          className="paymLogo"
        />
        <img src="/img/visaImg.png" alt="Visa Logo" className="paymLogo" />
        <img src="/img/gPayImg.png" alt="Payment Logo" className="paymLogo" />
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="cardNumber" className=" ">
          Card Number:
        </label>
        <input
          className="inpText"
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder="XXXXXXXXXXXXXXXX"
          pattern={cardNumberRegex}
          title="Invalid card number. Please enter a 16-digit number."
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
          autoFocus
        />

        <label htmlFor="cardholderName">Cardholder Name:</label>
        <input
          className="inpText"
          type="text"
          id="cardholderName"
          name="cardholderName"
          placeholder="Cardholder Name"
          value={cardHolderName}
          pattern={cardHolderNameRegex}
          title="Invalid cardholder name. Please enter alphabetic name between 5-30 characters."
          onChange={(e) => setCardHolderName(e.target.value)}
          required
        />

        <label htmlFor="expiryDate">Expiry Date:</label>
        <input
          className="inpText"
          type="text"
          id="expiryDate"
          name="expiryDate"
          placeholder="MM/YY"
          pattern={expiryDateRegex}
          title="Invalid expiry date. Please enter a valid date in MM/YY format."
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />

        <label htmlFor="cvv">CVV:</label>
        <input
          className="inpText"
          type="number"
          id="cvv"
          name="cvv"
          placeholder="***"
          pattern={cvvRegex}
          title="Invalid CVV. Please enter a 3-digit number."
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
        <div className="text-danger">{msg}</div>
        <div className="d-flex justify-content-between flex-direction-row align-items-center">
          <span>Amount : &#8377;{amount}/- only</span>
          <button type="submit" className=" d-inline btn btn-success just ">
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;
