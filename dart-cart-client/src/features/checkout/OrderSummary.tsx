import {Container} from 'react-bootstrap';
import { CheckoutButton } from "./CheckoutButton";

export default function OrderSummary({shipping, paymentPlan, billing}){


    return(<>
        <Container className="order-summary">
            {/* Heading */}
            <div className="order-summary-heading">
                <h2>Order Summary</h2>
            </div>

            {/* Shipping Info */}
            <h5><b>Ship to:</b></h5>
            <p>
                {shipping.streetAddress} {shipping.city}, {shipping.state} {shipping.zip}
            </p>

            {/* Payment Plan */}
            <h5><b>Payment Plan:</b></h5>
            <p>
                {paymentPlan.installments == 1? 
                <>
                1 payment of ${paymentPlan.price}
                </>
                :
                <>
                {paymentPlan.installments} payments of ${paymentPlan.price}
                </>}
            </p>

            {/* Card Info */}
            <h5><b>Card Information:</b> </h5>
            <p>
                {billing.name}
                <br/>**** **** **** {billing.cardNumber % 10000}
            </p>
            <CheckoutButton/>
        </Container>
    </>);
}