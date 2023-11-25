import React, { useState } from "react";
import "../styles/dummyPay.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const { state } = useLocation();
  const { checkInDate, checkOutDate, rooms, amount } = state;
  const navigate = useNavigate();
  const validate = (_cardNumber, _cardholderName, _expiryDate, _cvv) => {
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      cardNumber === "" ||
      cardholderName === "" ||
      expiryDate === "" ||
      cvv === "" ||
      !validate(cardNumber, cardholderName, expiryDate, cvv)
    ) {
      return;
    }

    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/me",
        { withCredentials: true }
      );
      const userData = response.data.data;
      const guestDetails = {
        fullName: userData.firstName + " " + userData.lastName,
        gender: userData.gender,
        age: userData.age,
        contactNo: userData.contactNo,
      };
      rooms.forEach(async (roomNo) => {
        const booking = {
          checkInDate,
          checkOutDate,
          roomNo,
          guestDetails,
        };
        await axios.post(
          process.env.REACT_APP_MANAGEMENT_BACKEND_URL + "/bookings/",
          booking
        );
      });
      navigate("/bookingConfirmation", {
        state: { rooms, checkInDate, checkOutDate, guestDetails },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="paymDiv">
      <h1 className="dumTitle">Net Banking </h1>
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
        <label htmlFor="cardNumber">Card Number:</label>
        <input
          className="inpText"
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder="XXXX-XXXX-XXXX-XXXX"
          value={cardNumber}
          onChange={(evt) => setCardNumber(evt.target.value)}
          required
          autoFocus
        />

        <label htmlFor="cardholderName">Cardholder Name:</label>
        <input
          className="inpText"
          type="text"
          id="cardholderName"
          name="cardholderName"
          placeholder="Surname Name"
          value={cardholderName}
          onChange={(evt) => setCardholderName(evt.target.value)}
          required
        />

        <label htmlFor="expiryDate">Expiry Date:</label>
        <input
          className="inpText"
          type="text"
          id="expiryDate"
          name="expiryDate"
          placeholder="MM/YY"
          value={expiryDate}
          onChange={(evt) => setExpiryDate(evt.target.value)}
          required
        />

        <label htmlFor="cvv">CVV:</label>
        <input
          className="inpText"
          type="number"
          id="cvv"
          name="cvv"
          placeholder="***"
          value={cvv}
          onChange={(evt) => setCvv(evt.target.value)}
          required
        />
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
