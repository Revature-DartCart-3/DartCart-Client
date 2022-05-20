import React, { useRef } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateShipping } from "../../common/slices/shippingSlice";
export function Shipping() {
    const dispatch = useDispatch()

    const handleStreet = (street: string) => {
        dispatch(updateShipping({
            id: 1,
            changes: {
                streetAddress: street
            }
        }))
    }

    const handleCity = (city: string) => {
        dispatch(updateShipping({
            id: 1,
            changes: {
                city: city
            }
        }))
    }

    const handleState = (state: string) => {
        dispatch(updateShipping({
            id: 1,
            changes: {
                state: state
            }
        }))
    }

    const handleZip = (zip: string) => {
        dispatch(updateShipping({
            id: 1,
            changes: {
                zip: zip
            }
        }))
    }
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <h3>Shipping Information</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="shippingStreet">
                        <Form.Control type="text" placeholder="Street Address" onChange={e => handleStreet(e.target.value)}/>
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="shippingCity">
                        <Form.Control type="text" placeholder="City" onChange={e => handleCity(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="shippingState">
                        <Form.Control type="text" placeholder="State" onChange={e => handleState(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="shippingZip">
                        <Form.Control type="text" placeholder="Zip" onChange={e => handleZip(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Card>
        </>
    )
}
