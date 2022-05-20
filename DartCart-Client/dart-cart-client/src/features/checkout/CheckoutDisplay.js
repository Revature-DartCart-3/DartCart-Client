import React, { useEffect } from "react";
import { Billing } from "./BillingForm";
import { Shipping } from "./ShippingForm";
import "./CheckoutDisplay.css"
import { CheckoutButton } from "./CheckoutButton";
import { useDispatch } from "react-redux";
import { addShipping } from "../../common/slices/shippingSlice";

import PayInstallments from "./PayInstallments";

function Checkout() {
    const dispatch = useDispatch();

    useEffect(() => {
        const shippingObject= {   
            id: 1,
            streetAddress: "",
            city: "",
            state: "",
            zip: "" 
        }
        dispatch(addShipping( shippingObject ))
    }, [])

    return (
        <>
            <h1>Checkout</h1>
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <Shipping></Shipping>
                        <Billing></Billing>
                    </div>
                    <div className="col-sm">
                    <PayInstallments/>
                    </div>
                    <div className="col align-self-end">
                        {/* <DisplayInvoice></DisplayInvoice> */}
                        
                        <CheckoutButton></CheckoutButton>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Checkout;
