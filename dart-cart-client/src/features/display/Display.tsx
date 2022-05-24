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
  const [featuredProducts, setFeaturedProducts] = useState<any>([]);

  const fetchData = () => {
    axios.get(MOCK_SERVER + "featured_products", {
        headers: authHeader(),
        // params: { name },
    }).then((data) => {
        let d = data.data.slice(0, 5);

        return setFeaturedProducts(d)
    });

};

useEffect(fetchData, []);

useEffect(() => {
  if (status === "idle") dispatch(fetchShopProducts("")); // places return value into REDUX global state
}, []);

  return (<>
    <h1 className="display-heading">Featured Products</h1>
    <div className="ProductCardContainer" >
      {featuredProducts.map(product => {
        return <div key={product.id}><ShopProductCard Product={product.product}/></div>
      })}
    </div>
      
    <h1>All Products</h1>
    <div className="ProductCardContainer" >
      {status === "success" ? (
        (ReduxShopProducts.length &&
          ReduxShopProducts.map((product) => {
            return <ShopProductCard key={product.id} Product={product}/>;
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
  </>);
};

export default Display;
