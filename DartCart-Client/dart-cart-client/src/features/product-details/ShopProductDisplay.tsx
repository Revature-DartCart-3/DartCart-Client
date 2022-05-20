import { useParams } from "react-router-dom";
import "./shopProduct.css";
import { useSelector } from "react-redux";
import { selectShopProductById } from "../../common/slices/shopProductSlice";
import { selectProductReviews, fetchProductReviews } from "../../common/slices/productReviewSlice";
import { CompetingSellers } from "../competing-sellers/CompetingSellers";
import { ProductReview } from "../../common/types";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../common/hooks";
import ProductReviewDetail from "../product-reviews/ProductReviewDetail";
import ProductReviewCard from "../product-reviews/product-review-card/ProductReviewCard";

const ShopProductDisplay = () => {
  const { shop_product_id } = useParams();

  const id: number = parseInt(shop_product_id!);

  const ReduxShopProducts = useSelector((state) => selectShopProductById(state, id));
  const ReduxProductReviews: ProductReview[] = useSelector(selectProductReviews);

  const dispatch = useAppDispatch();

  useEffect((): void => {
    dispatch(fetchProductReviews(""));
  }, [ReduxProductReviews]);

  const updateProductReviews = () => {
    dispatch(fetchProductReviews(""));
    console.log('callback');
  }

  return (
    <>
      <div className="productInfoContainer">
        <div className="productIMGcontainer">
          <img className="testIMG" src={ReduxShopProducts?.imageURL} alt="Card image cap"></img>
        </div> 
        <div className="productName"><h1>{ReduxShopProducts?.name}</h1></div>
        <div className="productDesc"><p>{ReduxShopProducts?.description}</p></div>
      </div>
      <div className="sellersContainer">
        <div className="sellerColumn">
          <CompetingSellers Seller={ReduxShopProducts?.id!}></CompetingSellers>
        </div>
      </div>
      <div>
        <ProductReviewDetail product_id={shop_product_id} callback={updateProductReviews} />
      </div>
      <table className="table">
        {ReduxProductReviews.map((ProductReview) => { if (ProductReview.product.id==shop_product_id)
                          return <ProductReviewCard 
                          profilePic = {ProductReview.user.imageURL}
                          title = {ProductReview.title}
                          fullName = {ProductReview.user.lastName}
                          comment = {ProductReview.comment}
                          rating = {ProductReview.rating}
                            />
                        })}
      </table>
    </>
  );

}
export default ShopProductDisplay;
