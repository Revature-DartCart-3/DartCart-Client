import { Product } from "../../common/models";
import { ShopProductCard } from "../product-details/ShopProductCard";
import "./display.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchShopProducts,
  getStatus,
  selectShopProducts,
  clearSlice,
} from "../../common/slices/shopProductSlice";
import Featured_Products from "../Featured_Products";
import authHeader from '../authentication/AuthHeader';
import FeaturedProduct from '../../Models/featured_product';
import axios from 'axios';

const MOCK_SERVER = process.env.REACT_APP_API_URL;

const Display = () => {
  const dispatch = useDispatch();
  const ReduxShopProducts: Product[] = useSelector(selectShopProducts);
  const status = useSelector(getStatus);
  const [anyThing, setanyThing] = useState<any>([]);

  const fetchData = () => {
    axios.get(MOCK_SERVER + "featured_products", {
        headers: authHeader(),
        // params: { name },
    }).then((data) => {
        let d = data.data.slice(0, 5);

        return setanyThing(d)
    });

};

useEffect(fetchData, []);
    useEffect(() => {
        // console.log(anyThing);
    }, [anyThing]);

  useEffect(() => {
    if (status === "idle") dispatch(fetchShopProducts("")); // places return value into REDUX global state
  }, []);

  return (
    <>
    <h1>Featured Products</h1>
      <div className="ProductCardContainer" >
      
      {anyThing.map(elem => {
            return <div className='card-group'><FeaturedProduct
                key={elem.id} price={elem.price} discount={elem.discount}
                productName={elem.product.name} id={elem.product.id} discprice={elem.price}
                imageUrl={elem.product.imageURL} /></div>
               
        })}
      </div>

      <div className="ProductCardContainer" >
        {status === "success" ? (
          (ReduxShopProducts.length &&
            ReduxShopProducts.map((Product, i) => {
                return <div><ShopProductCard Product={Product}></ShopProductCard></div>;
            })) || (
            <>
              <h1 style={{ color: "white" }}>No Items Found</h1>
            </>
          )
        ) : (
          <div
            className="text-light fs-1 p-5 text-uppercase"
            style={{ textAlign: "center" }}
          >
            Fetching Products...
          </div>
        )}
      </div>
    </>
  );
};

export default Display;
