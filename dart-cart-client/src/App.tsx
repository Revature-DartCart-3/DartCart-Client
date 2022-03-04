
import "./App.css";
import { Login } from "./features/login/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./features/Home";
import UserRegister from "./features/user-register/UserRegister";
import SellerRegister from "./features/seller-register/SellerRegister";
import { Provider } from "react-redux";
import Display from "./features/display/Display";
import ShopProductDisplay from "./features/product-details/ShopProductDisplay";
import store from "./common/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<UserRegister />}></Route>
          <Route path="/signup" element={<SellerRegister />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/display" element={<Display />}></Route>
            <Route
              path="/shop/:product_id"
              element={<ShopProductDisplay />}
            ></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
