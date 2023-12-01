import React, { useState } from 'react';
import '../css/dummyPay.css';
import h2c from 'html2canvas';
import { jsPDF } from 'jspdf';

function DummyPaym(){
    const [cardNumber, setCardNumber] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [ttime,setTtime] = useState(false);

    const generatePdf = () => {
        const capture = document.querySelector('.paymDiv');
        setTtime(true);
        h2c(capture).then((canvas) =>{
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPDF('p','cm','a4');
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
            setTtime(false);
            doc.save('Invoice.pdf');
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        setCardNumber('');
        setCardholderName('');
        setExpiryDate('');
        setCvv('');
    };

    return (
        <div className="paymDiv">
            <h1 className='dumTitle'>Payment Getaway Page</h1>
            <div className="paymImg">
                <img src="./images/amazonPayImg.png" alt="Payment Logo" className="paymLogo" />
                <img src="./images/masterCardImg.png" className="paymLogo" />
                <img src="./images/visaImg.png" className="paymLogo" />
                <img src="./images/gPayImg.png" alt="Payment Logo" className="paymLogo" />
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
                <button type="submit" className='btn'>Pay Now</button>
                <button className='btn' onClick={generatePdf} disabled={!(ttime===false)}>
                    {ttime?(<span>Downloading</span>):(<span>Download</span>)}
                </button>
            </form>
        </div>
    );
}

export default DummyPaym;
