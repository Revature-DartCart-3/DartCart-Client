import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../common/types";

import { addInvoice, selectAllCartItems, selectStatus } from "../../common/slices/cartSlice";
import { Modal } from "react-bootstrap";
import { selectUser } from "../../common/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { selectShipping } from "../../common/slices/shippingSlice";
import "./CheckoutButton.css";

export function CheckoutButton() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(true);

    const currentUser = useSelector(selectUser);
    const currentCart = useSelector(selectAllCartItems);

    const status = useSelector(selectStatus);

    const { id, streetAddress, city, state, zip } = useSelector((state: RootState) => selectShipping(state, 1)) || {   
        id: 1,
        streetAddress: "",
        city: "",
        state: "",
        zip: "" 
    };

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        if(status === "fulfilled"){
            nav("/");
        }else{
            nav("/cart");
        }
    }


    async function checkout() {

        if(currentUser && currentCart){
            let shippingAddress = streetAddress + ", " + city + " " + state + ", " + zip;

            await dispatch(addInvoice({user: JSON.parse(currentUser), currentCart: currentCart, shippingAddress: shippingAddress}));
            if(status === "fulfilled"){
                setSuccess(true);
                handleShow();
            }else if(status === "rejected") {
                setSuccess(false);
                handleShow();
            }
        }
    }

    return(
        <>
            <button className="button orange-button" onClick={checkout}>
                Checkout
            </button>

            <Modal show={show} >
                <Modal.Header>
                    {success ? 
                        <Modal.Title>Order Confirmed</Modal.Title> 
                        : <Modal.Title>Order Failed</Modal.Title>}
                </Modal.Header>
                    {success ? 
                        <Modal.Body>Your items have been successfully purchased!</Modal.Body> 
                        : <Modal.Body>Something went wrong</Modal.Body>}
                <Modal.Footer>
                    <button className="button blue-button" onClick={handleClose}> Confirm </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}