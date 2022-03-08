import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, selectAllCartItems } from "../../common/slices/cartSlice";
import CartItemView from "./CartItemView";

const Cart = () => {
    const items = useSelector(selectAllCartItems)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCart())
    }, [])

    return (
        <>
            {
                items.map(item => {
                    return <CartItemView key={item.id} {...item} />
                })
            }
        </>
    )
}

export default Cart