import React, { useState } from 'react';
import '../styles/dummyPay.css';

function DummyPayPage(){
    const [cardNumber, setCardNumber] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();

        setCardNumber('');
        setCardholderName('');
        setExpiryDate('');
        setCvv('');
    };

    return (
        <div className="paymDiv">
            <h1 className='dumTitle'>Dummy Payment Page</h1>
            <div className="paymImg">
                <img src="/img/amazonPayImg.png" alt="Payment Logo" className="paymLogo" />
                <img src="/img/masterCardImg.png" alt="Master Card" className="paymLogo" />
                <img src="/img/visaImg.png" alt="Visa Logo" className="paymLogo" />
                <img src="/img/gPayImg.png" alt="Payment Logo" className="paymLogo" />
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="cardNumber">Card Number:</label>
                <input
                    className='inpText'
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
                    className='inpText'
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
                    className='inpText'
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
                    className='inpText'
                    type="number"
                    id="cvv"
                    name="cvv"
                    placeholder="***"
                    value={cvv}
                    onChange={(evt) => setCvv(evt.target.value)}
                    required
                />
                <button type="submit" className='btn btn-success'>Pay Now</button>
            </form>
        </div>
    );
}

export default DummyPayPage;
