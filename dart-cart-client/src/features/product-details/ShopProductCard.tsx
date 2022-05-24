
import { Product } from "../../common/models";
import { Link } from "react-router-dom";
import authHeader from "../../features/authentication/AuthHeader";
import axios from "axios";
import React, { useState, useRef } from "react";
import { addToCart } from "../../common/slices/cartSlice";
import { useDispatch } from "react-redux";
import { Overlay, Tooltip } from "react-bootstrap";
import { AiOutlineCheck } from 'react-icons/ai';


interface IShopProductCard {
  Product: Product;
}

const MOCK_SERVER = process.env.REACT_APP_API_URL;

function addToWishList(productId){
   return axios.post(`${MOCK_SERVER}addToWishList`, {
      productId: productId
    },
      { headers: authHeader() }
    ).then(_response => {
        return "Item added to wishlist!"
    }).catch((error)=>{
      if(error.response!.status === 409){
        return "Item already exists in wishlist!"
      }
      return "Cannot add to wishlist";
    })
  }

async function addToWL(productId){
  const y = await addToWishList(productId);
  return React.createElement("span", {class : "wishListNotice  youCanSeeMe"}, y);
}

export function ShopProductCard({ Product: product }: IShopProductCard) {

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const target = useRef(null);

  function handleAddtoCart(e) {
    dispatch(addToCart(e.target.value));
  }

  const [notice, setNotice] = useState(React.createElement("span", {class : "wishListNotice"}, "hey"))
  return (
    <div id="shop-card" style={{ height: "28rem" }}>
      <div className="card" style={{ height: "28rem", width: "18rem" }}>
        <Link to={`/shop-product/${product?.id}` || ""} style={{ textDecoration: 'none' }}>
          <img
            className="testIMG"
            src={product?.imageURL}
            alt={product?.name}
          ></img>
          <div className="card-body">
            <h3>{product?.name || ""}</h3>
            <p className="card-text">
              {product?.description.length > 55?
                product?.description.substring(0,50).concat("...")
            :
              product?.description
            }</p>

          </div>
        </Link>
        
        {JSON.stringify(authHeader()).length > 100 && (
        <div className="card-footer">
          <button
            ref={target}
            className="button orange-button addToCart"
            value={product?.id}
            onClick={(e) => {
            setShow(!show);
            setTimeout(() => { setShow(false) }, 2000);
            handleAddtoCart(e)
            }
          }>
            Add To Cart
          </button>

          <Overlay
            target={target.current}
            show={show}
            placement="right">
            <Tooltip id={`tooltip${product?.id}`}><AiOutlineCheck/></Tooltip>
          </Overlay>

          <button id="addToWishList" className="button yellow-button addToWishList" onClick={async () => {
            setNotice(await addToWL(product?.id));
            setTimeout(() =>{setNotice(React.createElement("span", {class : "wishListNotice"}, "hey"))}, 5000);
          }}>
            Add To Wishlist
            <div>{notice}</div>
          </button>
        </div>
        )}
      </div>
      
    </div>
  );
}