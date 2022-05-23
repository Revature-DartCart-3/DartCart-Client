import {useState} from 'react';
import {Form, FloatingLabel} from 'react-bootstrap';
import "./BillingForm.css";

export function Billing({back, next}) {

    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expDate, setExpDate] = useState("");
    const [cvc, setCvc] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        const billingInfo = {
            name: name,
            cardNumber: cardNumber,
            expDate: expDate,
            cvc: cvc
        };
        console.log(billingInfo);
        next();
    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div className="form-heading blue">
                    <h3>Payment Details</h3>
                </div>
                <Form.Group className="mb-3 form-group" >
                    <FloatingLabel
                        controlId="fullname"
                        label="Name on Card"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Name on Card" onChange={e => setName(e.target.value)} required/>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3 form-group" >
                    <FloatingLabel
                        controlId="cardnumber"
                        label="Card Number"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Card Number" onChange={e => setCardNumber(e.target.value)} required/>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3 form-group" >
                    <FloatingLabel
                        controlId="expdate"
                        label="Expiration Date"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Expiration Date MM /YYYY" onChange={e => setExpDate(e.target.value)} required/>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3 form-group">
                    <FloatingLabel
                        controlId="cvc"
                        label="Security Code"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Security Code" onChange={e => setCvc(e.target.value)} required/>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3 form-group">
                    <button type="button" className="button grey-button" onClick={() => back()}>Back</button>
                    <button type="submit" className="button blue-button">Next</button>
                </Form.Group>
            </Form>
        </>
    )
}
