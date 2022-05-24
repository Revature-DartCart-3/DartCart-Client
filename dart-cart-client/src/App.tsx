import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "./features/authentication/Login";
import { ResetPassword } from "./features/authentication/ResetPassword";
import UserRegister from "./features/user-register/UserRegister";
import ProductRegister from "./features/product-register/ProductRegister";
import AddInventory from "./features/shop-product-add/AddInventory";
import Display from "./features/display/Display";
import PreviousOrders from "./features/previous-orders/previous-orders";
import SellerRegister from "./features/seller-register/SellerRegister";
import Error404Page from "./components/Error";
import { Provider } from "react-redux";
import ShopProductDisplay from "./features/product-details/ShopProductDisplay";
import ProductReviewLayout from "./features/product-reviews/layouts/ProductReviewLayout";
import store from "./common/store";
import Header from "./features/layout/Header";
import Footer from "./features/layout/Footer";
import Cart from "./features/cart/Cart";
import "./mainstyle.css";
import "./App.css";
import Checkout from "./features/checkout/CheckoutDisplay";
import ListItem from "./features/list-item/ListItem";
import ShopPage from "./features/shop-page/ShopPage";
import SellerHomepage from "./features/seller-homepage/SellerHomepage";
import Product from "./Models/Product";

import UserProfile from "./features/userprofile/UserProfile";
import useLocalStorage from "use-local-storage";

import WishList from "./features/wishlist/WishList";
import AdminPage from "./features/admin/AdminPage";

function App() {

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App" data-theme={theme}>
          <Header />
          <Routes>
            <Route path="/" element={<Display />}></Route>
            <Route
              path="/sellers/:seller_homepage"
              element={<SellerHomepage />}
              ></Route>
            <Route path="/shops/:shop_id" element={<ShopPage />}></Route>
            <Route path="/shops/:shop_id/list" element={<ListItem />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/register" element={<UserRegister />}></Route>
            <Route path="/product-register" element={<ProductRegister />}></Route>
            <Route path="/shop-product-add" element={<AddInventory />}></Route>
            <Route path="/signup" element={<SellerRegister />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/ResetPassword" element={<ResetPassword />}></Route>
            <Route path="/orders" element={<PreviousOrders />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/display" element={<Display />}></Route>
            <Route path="/userprofile" element={<UserProfile />}></Route>
            <Route path="/admin" element={<AdminPage />} />
            <Route
              path="/shop-product/:shop_product_id"
              element={<ShopProductDisplay />}
              ></Route>
            <Route path="/wishlist" element={<WishList/>}></Route>
            <Route
              path="/FeatureProduct/:product_id"
              element={<Product />}
              ></Route>
            <Route
              path="/product-review/:product_id"
              element={<ProductReviewLayout />}
              ></Route>
            <Route path="/*" element={<Error404Page />}></Route>
          </Routes>
          <Footer />
          <input onChange={switchTheme} type="checkbox" name="theme" checked={theme === 'dark'} />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
