
import { Product } from "../../common/models";
import { Link } from "react-router-dom";
import authHeader from "../../features/authentication/AuthHeader";
import axios from "axios";
import React, { useState } from "react";
import { addToCart } from "../../common/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";


interface IShopProductCard {
  Product: Product;
}

const MOCK_SERVER = process.env.REACT_APP_API_URL;

function addToWishList(productId){
   return axios.post(`${MOCK_SERVER}addToWishList`, {
      productId: productId
    },
      { headers: authHeader() }
    ).then(response => {
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

export function ShopProductCard({ Product }: IShopProductCard) {

  const dispatch = useDispatch();

  function handleAddtoCart(e) {
    dispatch(addToCart(e.target.value));
  }

  const [notice, setNotice] = useState(React.createElement("span", {class : "wishListNotice"}, "hey"))
  return (
    <div style={{ height: "28rem" }}>
      <Link to={`/shop-product/${Product?.id}` || ""} style={{ textDecoration: 'none' }}>
        <div className=" card bg-black text-warning" style={{ height: "20rem", width: "18rem" }}>
          <img
            className="testIMG"
            src={Product?.imageURL}
            alt="Card image cap"
          ></img>
          <div className="card-body">
            <h1>{Product?.name || ""}</h1>

            <p className="card-text">{`${Product?.description || ""}`}</p>

          </div>
        </div>
      </Link>
      {JSON.stringify(authHeader()).length > 100 ? (
        <div className=" card bg-black text-warning" style={{ height: "8rem", width: "18rem" }}>

          <button
            className="btn addToCart"
            value={Product?.id}
            onClick={(e) => handleAddtoCart(e)}>
            Add {Product?.name} to cart
          </button>

          <button id="addToWishList" className="btn addToWishList" onClick={async () => {
            setNotice(await addToWL(Product?.id));
            setTimeout(() =>{setNotice(React.createElement("span", {class : "wishListNotice"}, "hey"))}, 5000);
          }
          }>Add To Wishlist
          <div>{notice}</div>
          </button>
        </div>) : (
        <Link to={`/shop-product/${Product?.id}` || ""} style={{ textDecoration: 'none' }}>
          <div className=" card bg-black text-warning" style={{ height: "4rem", width: "18rem" }}>
          </div>
        </Link>
      )}
    </div>
  );
}