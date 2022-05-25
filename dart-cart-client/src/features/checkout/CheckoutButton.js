import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectAllCartItems, updateCart, updateCartItem } from "../../common/slices/cartSlice";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CheckoutButton.css";

/* TODO: set up checkout
import { RootState } from "../../common/types";
import { selectUser } from "../../common/slices/authSlice";
import { selectShipping } from "../../common/slices/shippingSlice";
import { addInvoice, selectStatus } from "../../common/slices/cartSlice";
*/

export function CheckoutButton() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(true);

    /* TODO: set up checkout
    const currentUser = useSelector(selectUser);
    */
    const currentCart = useSelector(selectAllCartItems);

    /* TODO: set up checkout
    const status = useSelector(selectStatus);
    const { id, streetAddress, city, state, zip } = useSelector((state: RootState) => selectShipping(state, 1)) || {   
        id: 1,
        streetAddress: "",
        city: "",
        state: "",
        zip: "" 
    };
    */

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        /* TODO: set up checkout
        if(status === "fulfilled"){
            nav("/");
        }else{
            nav("/cart");
        }
        */

       //WARNING: cart page crashes app without page refresh
        setTimeout(() => {
            window.location.reload();
        }, 500);

        nav('/', { replace: true });
    }


    async function checkout() {

        /* TODO: set up checkout
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
        */

        //clears cart
        for (let item of currentCart) {
            dispatch(updateCartItem({
                id: item.id,
                changes: {
                    quantity: 0
                }
            }))

            dispatch(updateCart({
                id: item.id,
                changes: {
                    quantity: 0
                }
            }))
        }

        setSuccess(true);
        handleShow();
    }

    return(
        <>
            {/* TODO: fix bug when button is clicked -- warning listed below
                The entity passed to the `selectId` implementation returned undefined. 
                You should probably provide your own `selectId` implementation.
            */}
            <button className="mb-3 button orange-button" onClick={checkout}>
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