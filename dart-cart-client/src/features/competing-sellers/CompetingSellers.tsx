import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Table} from 'react-bootstrap';
import { Product, ShopProduct, Shop, Seller} from "../../common/models";
import { addToCart } from "../../common/slices/cartSlice";
import {
  fetchCompetitorProducts,
  selectCompetitorProductById,
  selectCompetitorProducts,
} from "../../common/slices/competitorsSlice";
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
  }, [Seller]);

  function handleAddtoCart(e) {
    dispatch(addToCart(e.target.value));
  }

  return (
    <>
      {(ReduxCompetitorProducts &&
        ReduxCompetitorProducts.map((competitors) => {
          return (
            <div className="sellerInfo">

              {/* Seller Info */}
              <div>
                <h6><b>Sold by:</b></h6>
                <p>{competitors.shop.seller.name}<br/>
                {competitors.location}</p>
              </div>
              <div>
                <p>
                {competitors.discount > 0 ? 
                (<>
                  <s>${competitors.price}</s>  ${(competitors.price) - (competitors.discount)} 
                  <small> ({Math.floor((competitors.discount) / (competitors.price) * 100)}% off)</small>
                </>)
                : <>${competitors.price}</>}
                <br/><span>Quantity In Stock: {competitors.quantity}</span> </p>
              </div>
              <div>
                <button
                  className="btn btn-primary addToCart"
                  value={competitors.shop_product_id}
                  onClick={(e) => handleAddtoCart(e)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          );
        }))}
    </>
  );
}
