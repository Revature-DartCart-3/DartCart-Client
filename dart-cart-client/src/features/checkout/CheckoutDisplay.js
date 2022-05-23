import { useEffect, useState } from "react";
import { Billing } from "./BillingForm";
import { Shipping } from "./ShippingForm";
import "./CheckoutDisplay.css"
import { useDispatch } from "react-redux";
import { addShipping } from "../../common/slices/shippingSlice";

import PayInstallments from "./PayInstallments";
import OrderSummary from "./OrderSummary";

function Checkout() {
    const dispatch = useDispatch();

    //track checkout progress
    const [shippingCompleted, setShippingCompleted] = useState(false);
    const [paymentPlanCompleted, setPaymentPlanCompleted] = useState(false);
    const [billingCompleted, setBillingCompleted] = useState(false);

    //gather order information
    const [shippingInfo, setShippingInfo] = useState({});
    const [paymentPlan, setPaymentPlan] = useState({});
    const [billingInfo, setBillingInfo] = useState({});

    //not sure what this does
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
                <Shipping 
                    next={()=>setShippingCompleted(true)} 
                    post={setShippingInfo}/>
            :
                (!paymentPlanCompleted ?
                    //Step 2: Payment Plan
                    <PayInstallments 
                        back={()=>setShippingCompleted(false)} 
                        next={()=>setPaymentPlanCompleted(true)}
                        post={setPaymentPlan}/>
                :
                    (!billingCompleted?
                        // Step 3: Payment Info
                        <Billing 
                            back={()=>setPaymentPlanCompleted(false)} 
                            next={()=>setBillingCompleted(true)}
                            post={setBillingInfo}/>
                        
                    : 
                        //Step 4: Final order summary 
                        <OrderSummary 
                            shipping={shippingInfo} 
                            paymentPlan={paymentPlan} 
                            billing={billingInfo}/>
                    )
                )     
            }
        </>
    )
}
export default Checkout;
