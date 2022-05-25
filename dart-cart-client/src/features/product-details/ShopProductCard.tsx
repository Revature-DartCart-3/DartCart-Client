
import { Product } from "../../common/models";
import { Link } from "react-router-dom";
import authHeader from "../../features/authentication/AuthHeader";
import axios from "axios";
import { useState, useRef } from "react";
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

export function ShopProductCard({ Product: product }: IShopProductCard) {

  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const cart_target = useRef(null);
  const wishlist_target = useRef(null)

  function handleAddtoCart(e) {
    dispatch(addToCart(e.target.value));
  }

  return (

    // Product cards listed on homepage
    <div id="shop-card">
      <div className="card" style={{ height: "28rem", width: "18rem" }}>

        {/* Entirety of product card will link to product page */}
        <Link to={`/shop-product/${product?.id}` || ""} style={{ textDecoration: 'none' }}>
          <img
            className="testIMG"
            src={product?.imageURL}
            alt={product?.name}
          />

          {/* Displays product name up to 30 characters (2 lines) */}
          <div className="card-body">
            <h3>
              {product?.name.length > 30 ?
                product?.name.substring(0, 27).concat("...")
              :
                product?.name
              }
            </h3>

            {/* Fills remaining space with  product description */}
            <p className="card-text">
              {product?.description.length > 125?
                (product?.name.length > 15 ?
                  (product?.description.substring(0,97).concat("..."))
                :
                  (product?.description.substring(0, 125).concat("...")))
              :
                product?.description
              }
            </p>
          </div>
        </Link>
        
        {/* Displays cart and wishlist buttons when user is logged in */}
        {JSON.stringify(authHeader()).length > 100 && (
        <div className="card-footer">

          {/* Cart Button */}
          <button
            ref={cart_target}
            className="button orange-outline"
            value={product?.id}
            onClick={(e) => {
            setShowCart(!showCart);
            setTimeout(() => { setShowCart(false) }, 2000);
            handleAddtoCart(e)
            }
          }>
            Cart +
          </button>

          {/* Tootlip for successful addition to cart */}
          <Overlay
            target={cart_target.current}
            show={showCart}
            placement="right">
            <Tooltip id={`tooltip${product?.id}`}><AiOutlineCheck/></Tooltip>
          </Overlay>

          {/* Wishlist Button */}
          <button id="addToWishList" 
            ref={wishlist_target}
            className="button grey-outline" 
            onClick={() => {
              setShowWishlist(!showWishlist);
              setTimeout(() => { setShowWishlist(false) }, 2000);
              addToWishList(product?.id);}
            }
          >
            Wishlist +
          </button>

          {/* Tooltip for successful addition to wishlist */}
          <Overlay
            target={wishlist_target.current}
            show={showWishlist}
            placement="right">
            <Tooltip id={`wltooltip${product?.id}`}><AiOutlineCheck /></Tooltip>
          </Overlay>
        </div>
        )}
      </div>
      
    </div>
  );
}