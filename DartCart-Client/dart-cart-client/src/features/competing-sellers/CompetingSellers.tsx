import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product, ShopProduct, Shop, Seller} from "../../common/models";
import { addToCart } from "../../common/slices/cartSlice";
import {
  fetchCompetitorProducts,
  selectCompetitorProductById,
  selectCompetitorProducts,
} from "../../common/slices/competitorsSlice";
import Logo from "../layout/Logo";
import "./competingSellers.css";

interface SellerProduct {
  Seller: number;
}

export function CompetingSellers({ Seller }: SellerProduct) {
  const dispatch = useDispatch();

  const ReduxCompetitorProducts: ShopProduct[] = useSelector(
    selectCompetitorProducts
  );

  useEffect(() => {
    dispatch(fetchCompetitorProducts(Seller)); // places return value into REDUX global state
  }, []);

  function handleAddtoCart(e) {
    dispatch(addToCart(e.target.value));
  }

  return (
    <>
      {(ReduxCompetitorProducts &&
        ReduxCompetitorProducts.map((competitors) => {
          return (
            <div className="sellerInfo">
                <div className="shopNameAndPrice">
                  {competitors.discount > 0 ? 
                  (<span>Seller: {competitors.shop.seller.name} - <s>${competitors.price}</s>  ${(competitors.price) - (competitors.discount)} <br />Discount: {Math.floor((competitors.discount)/(competitors.price)*100)}%</span>): 
                  (<span>Seller: {competitors.shop.seller.name} - ${competitors.price}</span>)}
                </div>
                <div className="shopLocation">
                  <span>Seller Location: {competitors.location}</span>
                </div>
                <div className="shopQuant">
                  <span>Quantity In Stock: {competitors.quantity}</span>
                </div>
              <button
                className="btn btn-primary addToCart"
                value={competitors.shop_product_id}
                onClick={(e) => handleAddtoCart(e)}
              >
                Add to cart
              </button>
            </div>
          );
        })) ||
        ""}
    </>
  );
}
