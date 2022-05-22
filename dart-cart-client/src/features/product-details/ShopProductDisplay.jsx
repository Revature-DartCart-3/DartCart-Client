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

  const [averageRating, setAverageRating] = useState("");

  const { shop_product_id } = useParams();

  const id = parseInt(shop_product_id);

  const ReduxShopProducts = useSelector((state) => selectShopProductById(state, id));
  const ReduxProductReviews = useSelector(selectProductReviews);

  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchProductReviews(""));
  }, []);


  const updateProductReviews = () => {
    dispatch(fetchProductReviews(""));
    console.log('callback');
  }

  console.log(ReduxProductReviews);


  useEffect(() => {
      let ratingsArray = [];

      for (let i = 0; i < ReduxProductReviews.length; i++) {
        if (id == ReduxProductReviews[i].product.id) {
          ratingsArray.push(ReduxProductReviews[i].rating)
        }
      }

      console.log(ratingsArray)

      let reviewTotal = [];

      if (ratingsArray.length == 0){

      } 
      else {
        reviewTotal = ratingsArray.reduce((acc, curr) => parseInt(curr) + parseInt(acc));
      }

      console.log(reviewTotal);

      let averageRatingVar;
      
      averageRatingVar = (reviewTotal/ratingsArray.length).toFixed(2);

      setAverageRating(averageRatingVar)

  }, []);

  const noProductReviews = (
    <div className="average-rating">
    Average Item Rating: No Ratings for This Product
    </div>
  );

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
          <CompetingSellers Seller={ReduxShopProducts?.id}></CompetingSellers>
        </div>
      </div>
      <div>
        <ProductReviewDetail product_id={shop_product_id} callback={updateProductReviews} />
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