import { useParams } from "react-router-dom";
import "./shopProduct.css";
import { useSelector } from "react-redux";
import { selectShopProductById, fetchShopProducts } from "../../common/slices/shopProductSlice";
import { selectProductReviews, fetchProductReviews } from "../../common/slices/productReviewSlice";
import { CompetingSellers } from "../competing-sellers/CompetingSellers";
import { ProductReview } from "../../common/types";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../common/hooks";
import ProductReviewDetail from "../product-reviews/ProductReviewDetail";
import ProductReviewCard from "../product-reviews/product-review-card/ProductReviewCard";
import { AiFillStar } from 'react-icons/ai';

const ShopProductDisplay = () => {

  const [averageRating, setAverageRating] = useState("");

  const { shop_product_id } = useParams();

  const id: number = parseInt(shop_product_id!);

  const [showModal, setShowModal] = useState(false);
  // const id = parseInt(shop_product_id);

  const ReduxShopProducts = useSelector((state) => selectShopProductById(state, id));
  const ReduxProductReviews = useSelector(selectProductReviews);

  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchProductReviews(""));
  }, [id]);

  let reviewCount:number = 0;
  let reviewTotal:number = 0;

  for(let review of ReduxProductReviews){
    if (review.product.id == shop_product_id){
      reviewCount++;
      reviewTotal += review.rating;
    }
  }
  const avgReview = reviewCount>0 ? reviewTotal / reviewCount : 0;

  return (
    <>
      <div className="productInfoContainer">
        <div className="row">

          {/* Product image */}
          <div className="col productIMGcontainer">
            <img className="productImage" src={ReduxShopProducts?.imageURL} alt={`${ReduxShopProducts?.name}`}></img>
            <button className="review-link" onClick={()=>setShowModal(true)}>Leave a Product Review</button>
          </div>

          {/* Product Info */}
          <div className="col productDesc">

            <h1>{ReduxShopProducts?.name}</h1>
            <p>{ReduxShopProducts?.description}</p>
            <p><b>Average Rating: </b>
              {/* Star rating */}
              {avgReview >= 1 &&
              Array.from(Array(Math.floor(avgReview)).keys()).map(c => {
                return (
                  <AiFillStar key={`avg${c}`} style={{ color: 'orange' }} />
                )
              })}
              {reviewCount > 0?
              <><b>{avgReview.toFixed(1)}</b> ({reviewCount} {reviewCount === 1 ? " review": "reviews"}) </>
              : "No reviews" }
            </p>
          </div>
        </div>
      </div>

      {/* Buying options */}
      <div className="sellersContainer">
        <h5>Purchase Options</h5>
        <div className="sellerColumn">
          <CompetingSellers Seller={ReduxShopProducts?.id}></CompetingSellers>
        </div>
      </div>

      {/* Reviews */}
      <div>
        <ProductReviewDetail product_id={shop_product_id} callback={updateProductReviews} showModal={showModal} setShowModal={setShowModal} />
      </div>
      <div className="reviews">
        {ReduxProductReviews.map((ProductReview) => {
          if (ProductReview.product.id==shop_product_id){
            return <ProductReviewCard
              key={ProductReview.id}
              profilePic = {ProductReview.user.imageURL}
              title = {ProductReview.title}
              fullName = {ProductReview.user.username}
              comment = {ProductReview.comment}
              rating = {ProductReview.rating}
            />
          }
        })}
      </div>
      {ReduxProductReviews.length > 0 ?
      <div className="average-rating">Average Item Rating: {averageRating} Stars</div>
      : noProductReviews}
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