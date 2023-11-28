import React, { useState } from "react";
import "../styles/dummyPay.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const { state } = useLocation();
  const { checkInDate, checkOutDate, rooms, amount } = state;
  const [msg, setMessage] = useState("");
  const navigate = useNavigate();

  const validate = (_cardNumber, _cardHolderName, _expiryDate, _cvv) => {
    const cardNumberRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cardHolderNameRegex = /^[a-zA-Z]{5,30}$/;

    if (!_cardNumber.match(cardNumberRegex)) {
      setMessage("Invalid card number. Please enter a 16-digit number.");
      return false;
    }

    if (
      _cardHolderName.trim() === "" ||
      !cardHolderName.match(cardHolderNameRegex)
    ) {
      setMessage(
        "Invalid cardholder name. Please enter alphabetic characters only."
      );
      return false;
    }

    if (!_expiryDate.match(expiryDateRegex)) {
      setMessage(
        "Invalid expiry date. Please enter a valid date in MM/YY format."
      );
      return false;
    }

    if (!_cvv.match(cvvRegex)) {
      setMessage("Invalid CVV. Please enter a 3-digit number.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(cardNumber, cardHolderName, expiryDate, cvv)) {
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
        <label htmlFor="cardNumber" className=" ">
          Card Number:
        </label>
        <input
          className="inpText"
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder="XXXX-XXXX-XXXX-XXXX"
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
