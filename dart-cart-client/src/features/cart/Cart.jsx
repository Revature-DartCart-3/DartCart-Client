import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, selectAllCartItems } from "../../common/slices/cartSlice";
import CartItemView from "./CartItemView";
import './cart.css';

const Cart = () => {
    const items = useSelector(selectAllCartItems)
    const dispatch = useDispatch()
    const [paymentPlan, setPaymentPlan] = useState("")

    useEffect(() => {
        dispatch(fetchCart())
    }, [])

    console.log(items)

    let paymentPlanChosen = false;
    
    const handlePaymentPlan = (choice) => {

        console.log(choice)

        if (choice == 1) {
            let prices = [];

            for (let i=0; i<items.length; i++) {
                prices.push(items[i].shopProduct.price)
            }

            console.log(prices)

            const cartTotal = prices.reduce((acc, curr) => parseInt(curr) + parseInt(acc));

            console.log(cartTotal); 
        }
        else if (choice == 2){
            let prices = [];

            for (let i=0; i<items.length; i++) {
                prices.push(items[i].shopProduct.price)
            }

            console.log(prices)

            const cartTotal = prices.reduce((acc, curr) => parseInt(curr) + parseInt(acc));

            console.log(cartTotal);
        }
        else if (choice == 3) {
            let prices = [];

            for (let i=0; i<items.length; i++) {
                prices.push(items[i].shopProduct.price)
            }

            console.log(prices)

            const cartTotal = prices.reduce((acc, curr) => parseInt(curr) + parseInt(acc));

            console.log(cartTotal); 
        }
        else if (choice == 4) {
            let prices = [];
            
            for (let i=0; i<items.length; i++) {
                prices.push(items[i].shopProduct.price)
            }

            console.log(prices)

            const cartTotal = prices.reduce((acc, curr) => parseInt(curr) + parseInt(acc));

            console.log(cartTotal); 
        }
    }

    return (
        <>
            {
                items.map(item => {
                    return <CartItemView key={item.id} {...item} />
                })
            }

            <div className="cart-padding">

            </div>

            <div className="card">
                <div>
                    <div className="payment-plan">
                        Payment Plan Options:
                    </div>
                    <label for="payment">Choose Payment Plan: &nbsp;</label>
                    <select name="payment" id="payment"onChange={e => handlePaymentPlan(e.target.value)}>
                        <option value="1">Pay in Full</option>
                        <option value="2">2 Payments</option>
                        <option value="3">3 Payments</option>
                        <option value="4">4 Payments</option>
                    </select>
                </div>
            </div>


            <Link to="/checkout">Checkout</Link>
        </>
    )
}

export default Cart