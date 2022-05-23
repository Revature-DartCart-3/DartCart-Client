import {useState} from 'react';
import { Form, FloatingLabel } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateShipping } from "../../common/slices/shippingSlice";

export function Shipping({next}) {

    const dispatch = useDispatch();

    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");

    const handleStreet = (street: string) => {
        setStreet(street);
    }

    const handleCity = (city: string) => {
        setCity(city);
    }

    const handleState = (state: string) => {
        setState(state);
    }

    const handleZip = (zip: string) => {
        setZip(zip);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(updateShipping({
            id: 1,
            changes: {
                streetAddress: street,
                city: city,
                state: state,
                zip: zip
            }
        }))
        next();
    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div className="form-heading yellow">
                    <h3>Shipping Information</h3>
                </div>
                <Form.Group className="mb-3 form-group" >
                    <FloatingLabel 
                        controlId="shippingStreet"
                        label="Street Address"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Street Address" onChange={e => handleStreet(e.target.value)} required/>
                    </FloatingLabel>
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 form-group" >
                    <FloatingLabel
                        controlId="shippingCity"
                        label="City"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="City" onChange={e => handleCity(e.target.value)} required/>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3 form-group" >
                    <FloatingLabel
                        controlId="shippingState"
                        label="State"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="State" onChange={e => handleState(e.target.value)} required/>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3 form-group">
                    <FloatingLabel
                        controlId="shippingZip"
                        label="Zip Code"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Zip" onChange={e => handleZip(e.target.value)} required/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3 form-group">
                    <button type="submit" className="button yellow-button">Next</button>
                </Form.Group>
            </Form>
        </>
    )
}
