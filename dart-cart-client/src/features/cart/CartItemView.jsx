import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { CartItem, RootState } from "../../common/types"
import { selectCartItemById, updateCartItem, updateCart } from "../../common/slices/cartSlice";
import './cart.css';


const CartItemView = ({ id }) => {

    const [addQuantity, setAddQuantity] = useState("1")
    const [subtractQuantity, setSubtractQuantity] = useState("1")

    const dispatch = useDispatch()

    const item = useSelector((state)=> selectCartItemById(state, id))

    const handleItemUpdate = (quantity) => {
        dispatch(updateCartItem({
            id: id,
            changes: {
                quantity: quantity
            }
        }))
    }

    const handleQuantityAdd = (quantity) => {
        dispatch(updateCartItem({
            id: id,
            changes: {
                quantity: quantity = parseInt(quantity) + 1
            }
        }))
    }

    const handleQuantitySubtract = (quantity) => {
        if (quantity == 1){
        
        }
        else {
            dispatch(updateCartItem({
                id: id,
                changes: {
                    quantity: quantity = quantity-1
                }
            })) 
        }
    }

    const handleDelete = (quantity) => {
            dispatch(updateCartItem({
                id: id,
                changes: {
                    quantity: quantity = 0
                }
            }))

            dispatch(updateCart({
                id: id,
                changes: {
                    quantity: quantity = 0
                }
            }))

            window.location.reload()
    }

    const saveQuantity = () => {
        if(item) dispatch(updateCart(item))
    }


    useEffect(() => {
        
    }, [])
    
    return  (
        <div className="card">
            <div className="row no-gutters">
                <div className="col-3">
                    <img className="cardImg" src={item?.shopProduct.product.imageURL}/>
                </div>
                <div className="col-9">
                    <div className="card-block px-2" style={{ textAlign: 'left' }}>
                        <h4 className="card-title">{item?.shopProduct.product.name}</h4>
                        <p className="card-text">{item?.shopProduct.product.description}</p>
                        <p className="card-text">${item?.shopProduct.price}</p>
                        <input className="form-control" type="number" value={item?.quantity} onChange={e => handleItemUpdate(e.target.value)} min={1} readOnly/>
                        <button className="button1" value={item?.quantity} onClick={e => handleQuantityAdd(e.target.value)}> + </button>
                        <button className="button1" value={item?.quantity} onClick={e => handleQuantitySubtract(e.target.value)}> - </button>
                        <button className="button1" value={item?.quantity} onClick={e => handleDelete(e.target.value)}> Delete </button>
                        <button onClick={saveQuantity}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItemView;