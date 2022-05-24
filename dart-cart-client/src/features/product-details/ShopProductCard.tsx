
import { Product } from "../../common/models";
import { Link } from "react-router-dom";
import authHeader from "../../features/authentication/AuthHeader";
import axios from "axios";
import React, { useState } from "react";
import { addToCart } from "../../common/slices/cartSlice";
import { useDispatch } from "react-redux";


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

  function handleAddtoCart(e) {
    dispatch(addToCart(e.target.value));
  }

  const [notice, setNotice] = useState(React.createElement("span", {class : "wishListNotice"}, "hey"))
  return (
    <div style={{ height: "28rem" }}>
      <div className=" card bg-black text-warning" style={{ height: "20rem", width: "18rem" }}>
        <Link to={`/shop-product/${product?.id}` || ""} style={{ textDecoration: 'none' }}>
          <img
            className="testIMG"
            src={product?.imageURL}
            alt="Card image cap"
          ></img>
          <div className="card-body">
            <h1>{product?.name || ""}</h1>
            <p className="card-text">{`${product?.description || ""}`}</p>

          </div>
        </Link>

      </div>
      {JSON.stringify(authHeader()).length > 100 ? (
        <div className=" card bg-black text-warning" style={{ height: "8rem", width: "18rem" }}>
          <button
            className="button addToCart"
            value={product?.id}
            onClick={(e) => handleAddtoCart(e)}>
            Add To Cart
          </button>
          <button id="addToWishList" className="button addToWishList" onClick={async () => {
            setNotice(await addToWL(product?.id));
            setTimeout(() =>{setNotice(React.createElement("span", {class : "wishListNotice"}, "hey"))}, 5000);
          }}>
            Add To Wishlist
            <div>{notice}</div>
          </button>
        </div>
      ) : (
        <Link to={`/shop-product/${product?.id}` || ""} style={{ textDecoration: 'none' }}>
          <div className=" card bg-black text-warning" style={{ height: "4rem", width: "18rem" }}>
          </div>
        </Link>
      )}
    </div>
  );
}