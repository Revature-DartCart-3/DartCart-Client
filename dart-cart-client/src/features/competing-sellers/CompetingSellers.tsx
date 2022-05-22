import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {ShopProduct} from "../../common/models";
import { addToCart } from "../../common/slices/cartSlice";
import {
  fetchCompetitorProducts,
  selectCompetitorProducts,
} from "../../common/slices/competitorsSlice";
import "./competingSellers.css";
import WishlistButton from "../wishlist/WishlistButton";
import authHeader from "../authentication/AuthHeader";
import { MdAddShoppingCart} from 'react-icons/md';

interface SellerProduct {
  Seller: number;
}

export function CompetingSellers({ Seller }: SellerProduct) {
  const dispatch = useDispatch();
  
  const ReduxCompetitorProducts: ShopProduct[] = useSelector(
    selectCompetitorProducts
  );

  useEffect(() => {
    if(Seller){
      dispatch(fetchCompetitorProducts(Seller)); // places return value into REDUX global state
    }
  }, [Seller]);

  function handleAddtoCart(e) {
    dispatch(addToCart(e.target.value));
  }
  
  return (
    <>
      {(ReduxCompetitorProducts &&
        ReduxCompetitorProducts.map((competitors) => {
          return (
            <div key={`${competitors.shop_product_id}`} className="sellerInfo">

              {/* Seller Info */}
              <div>
                <h6><b>Sold by:</b></h6>
                <p>{competitors.shop.seller.name}<br/>
                {competitors.location}</p>
              </div>
              <div>
                <h4 className="center">
                {competitors.discount > 0 ? 
                (<>
                  <s>${competitors.price}</s>  ${(competitors.price) - (competitors.discount)} 
                  <small> ({Math.floor((competitors.discount) / (competitors.price) * 100)}% off)</small>
                </>)
                : <>${competitors.price}</>}
                </h4>
                <br/><span>Quantity In Stock: {competitors.quantity}</span>
              </div>
              <div className="center-align">
                <button
                  className="button orange-button stacked"
                  value={competitors.shop_product_id}
                  onClick={(e) => handleAddtoCart(e)}
                >
                  <MdAddShoppingCart/> Add to Cart
                </button>
                {JSON.stringify(authHeader()).length > 100 && (
                  <WishlistButton product={competitors.product} />
                )}
              </div>
            </div>
          );
        }))}
    </>
  );
}
