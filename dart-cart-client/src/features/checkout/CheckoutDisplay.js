import { useEffect, useState } from "react";
import { Billing } from "./BillingForm";
import { Shipping } from "./ShippingForm";
import "./CheckoutDisplay.css"
import { useDispatch } from "react-redux";
import { addShipping } from "../../common/slices/shippingSlice";

import PayInstallments from "./PayInstallments";

function Checkout() {
    const dispatch = useDispatch();

    const [shippingCompleted, setShippingCompleted] = useState(false);
    const [paymentPlanCompleted, setPaymentPlanCompleted] = useState(false);
    const [billingCompleted, setBillingCompleted] = useState(false);

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

            {!shippingCompleted ? 
                // Step 1: Shipping Info
                <Shipping next={()=>setShippingCompleted(true)}/>
            :
                (!paymentPlanCompleted ?
                    //Step 2: Payment Plan
                    <PayInstallments back={()=>setShippingCompleted(false)} next={()=>setPaymentPlanCompleted(true)}/>
                :
                    (!billingCompleted?
                        // Step 3: Payment Info and final checkout
                        <Billing back={()=>setPaymentPlanCompleted(false)} next={()=>setBillingCompleted(true)}/>
                        
                       : //TODO: show checkout review with checkout button
                       "Yay!"
                    )
                )     
            }
        </>
    )
}
export default Checkout;
