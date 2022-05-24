import { useParams } from "react-router-dom";
import "./shopProduct.css";
import { useSelector } from "react-redux";
import { selectShopProductById, fetchShopProducts } from "../../common/slices/shopProductSlice";
import { selectProductReviews, fetchProductReviews } from "../../common/slices/productReviewSlice";
import { CompetingSellers } from "../competing-sellers/CompetingSellers";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../common/hooks";
import ProductReviewDetail from "../product-reviews/ProductReviewDetail";
import ProductReviewCard from "../product-reviews/product-review-card/ProductReviewCard";
import { AiFillStar } from 'react-icons/ai';

const ShopProductDisplay = () => {

  const { shop_product_id } = useParams();
  const id = parseInt(shop_product_id);

  const dispatch = useAppDispatch();
  const ReduxShopProducts = useSelector((state) => selectShopProductById(state, id));
  const ReduxProductReviews = useSelector(selectProductReviews);

  const [averageRating, setAverageRating] = useState("");
  const [reviewCount, setReviewCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProductReviews(""));
    dispatch(fetchShopProducts(""));
  }, [id]);

  const updateProductReviews = () => {
    dispatch(fetchProductReviews(""));
  }

  let ratingsArray = [];

  useEffect(() => {
    for(let productReview of ReduxProductReviews) {
      if(id === productReview.product.id) {
        setReviewCount(reviewCount + 1);
        ratingsArray.push(productReview.rating);
      }
    }

    let ratingsTotal = [];
    if(ratingsArray.length > 0) {
      ratingsTotal = ratingsArray.reduce((acc, curr) => parseInt(curr) + parseInt(acc));
    }

    let averageRatingVar = (ratingsTotal/ratingsArray.length).toFixed(1);
    setAverageRating(averageRatingVar);
  }, [ReduxProductReviews]);

  const noProductReviews = (
    <div className="average-rating">
    Average Item Rating: No Ratings for This Product
    </div>
  );

  return (
    <>
      <div className="productInfoContainer">
        <div className="row">

          {/* Product image */}
          <div className="col productIMGcontainer">
            <img className="productImage" src={ReduxShopProducts?.imageURL} alt={`${ReduxShopProducts?.name}`}></img>
            <button className="review-link stacked" onClick={()=>setShowModal(true)}>Leave a Product Review</button>
          </div>

          {/* Product Info */}
          <div className="col productDesc">

            <h1>{ReduxShopProducts?.name}</h1>
            <p>{ReduxShopProducts?.description}</p>
            <p><b>Average Rating: </b></p>
            <p>
              {/* Star rating */}
              {averageRating >= 1 &&
                Array.from(Array(Math.floor(averageRating)).keys()).map(c => {
                  return (
                    <AiFillStar key={`avg${c}`} style={{ color: 'orange' }} />
                  )
                })
              }
              {!!reviewCount?
              <><b>{averageRating}</b> ({reviewCount} {reviewCount === 1 ? " review": "reviews"}) </>
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
        {!!averageRating ?
          <div className="average-rating">
            Average Rating: {averageRating}
          </div>
        : noProductReviews}
        {ReduxProductReviews.map((productReview) => {
          if (productReview.product.id==shop_product_id){
            return <ProductReviewCard
              key={productReview.id}
              profilePic = {productReview.user.imageURL}
              title = {productReview.title}
              fullName = {productReview.user.username}
              comment = {productReview.comment}
              rating = {productReview.rating}
            />
          }
        })}
      </div>
    </>
  );

}
export default ShopProductDisplay;
