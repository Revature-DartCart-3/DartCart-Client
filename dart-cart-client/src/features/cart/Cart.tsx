import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, selectAllCartItems, updateTotal } from "../../common/slices/cartSlice";
import CartItemView from "./CartItemView";


const Cart = () => {
    const items = useSelector(selectAllCartItems)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCart())
    }, [])


    let totalTotal = items.reduce(
        (cartTotal, cartItems) => {
            const price  = cartItems.shopProduct.price;
            const totalQuantity = cartItems.quantity;
            const itemTotal = price * totalQuantity;

            cartTotal += itemTotal;

            return cartTotal;
        },
        0,
    );
        totalTotal = parseFloat(totalTotal.toFixed(2));
        dispatch(updateTotal(totalTotal));
        
    

    return (
        <>
            {
                items.map(item => {
                    return <CartItemView key={item.id} {...item} />
                })
            }
            <p>Cart Total: ${ totalTotal }</p>
            <Link to="/checkout">Checkout</Link>
        </>
    )
}

export default Cart