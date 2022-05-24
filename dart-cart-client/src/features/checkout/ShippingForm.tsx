import {useState} from 'react';
import { Form, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateShipping, selectShipping } from "../../common/slices/shippingSlice";
import { RootState } from "../../common/types";

export function Shipping({next, post}) {

    const dispatch = useDispatch();

    const shippingInfo = useSelector((state: RootState) => selectShipping(state, 1)) || {
        id: 1,
        streetAddress: "",
        city: "",
        state: "",
        zip: ""
    };

    const [street, setStreet] = useState(shippingInfo.streetAddress);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [zip, setZip] = useState(shippingInfo.zip);

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
        post({
            streetAddress: street,
            city: city,
            state: state,
            zip: zip
        });
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
                        <Form.Control 
                            type="text" 
                            placeholder={"Street Address"}
                            onChange={e => handleStreet(e.target.value)}
                            defaultValue={street}
                            required/>
                    </FloatingLabel>
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 form-group" >
                    <FloatingLabel
                        controlId="shippingCity"
                        label="City"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="text" 
                            placeholder="City" 
                            onChange={e => handleCity(e.target.value)} 
                            defaultValue={city}
                            required/>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3 form-group" >
                    <FloatingLabel
                        controlId="shippingState"
                        label="State"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="text" 
                            placeholder="State" 
                            onChange={e => handleState(e.target.value)} 
                            defaultValue={state}
                            required/>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3 form-group">
                    <FloatingLabel
                        controlId="shippingZip"
                        label="Zip Code"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="text" 
                            placeholder="Zip" 
                            onChange={e => handleZip(e.target.value)} 
                            defaultValue={zip}
                            required/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3 form-group">
                    <button type="submit" className="button yellow-button">Next</button>
                </Form.Group>
            </Form>
        </>
    )
}
