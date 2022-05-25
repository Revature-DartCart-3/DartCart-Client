import {useState} from 'react';
import {Form, FloatingLabel} from 'react-bootstrap';
import "./BillingForm.css";

export function Billing({back, next, post}) {

    // card payment info
    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expDate, setExpDate] = useState("");
    const [cvc, setCvc] = useState("");

    //TODO: save/dispatch billing
    function handleSubmit(e){
        e.preventDefault();
        const billingInfo = {
            name: name,
            cardNumber: cardNumber,
            expDate: expDate,
            cvc: cvc
        };
        post(billingInfo);
        next();
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div className="form-heading yellow">
                    <h3>Payment Details</h3>
                </div>

                {/* Name */}
                <Form.Group className="mb-3 form-group" >
                    <FloatingLabel
                        controlId="fullname"
                        label="Name on Card"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Name on Card" onChange={e => setName(e.target.value)} required/>
                    </FloatingLabel>
                </Form.Group>

                {/* Card Number */}
                <Form.Group className="mb-3 form-group" >
                    <FloatingLabel
                        controlId="cardnumber"
                        label="Card Number"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Card Number" onChange={e => setCardNumber(e.target.value)} required/>
                    </FloatingLabel>
                </Form.Group>

                {/* Expiration Date */}
                <Form.Group className="mb-3 form-group" >
                    <FloatingLabel
                        controlId="expdate"
                        label="Expiration Date"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Expiration Date MM /YYYY" onChange={e => setExpDate(e.target.value)} required/>
                    </FloatingLabel>
                </Form.Group>

                {/* Security Code */}
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
                    <button type="submit" className="button yellow-button">Next</button>
                </Form.Group>
            </Form>
        </>
    )
}
