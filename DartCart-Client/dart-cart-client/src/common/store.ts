import { configureStore } from "@reduxjs/toolkit";
import userRegisterReducer from "./slices/userRegisterSlice";
import userUpdateProfileReducer from "./slices/userProfileSlice";
import sellerRegisterReducer from "./slices/sellerRegisterSlice";
import SPSlice from "./slices/shopProductSlice";
import SSlice from "./slices/shopSlice";
import CPSlice from "./slices/competitorsSlice";
import invoiceReducer from "./slices/invoiceSlice";
import authenticationReducer from "./slices/authSlice";
import listItemReducer from "./slices/listItemSlice";
import cartSlice from "./slices/cartSlice";
import shippingSlice from "./slices/shippingSlice";
import WLSlice from "./slices/wishlistSlice"
import PRSlice from "./slices/productReviewSlice";
// Here we configure the store object that redux uses for storing data
// Each slice's reducer is added as a reducer here
const store = configureStore({
  reducer: {

    userRegister: userRegisterReducer,
    userUpdate: userUpdateProfileReducer,
    sellerRegister: sellerRegisterReducer,
    authentication: authenticationReducer,
    ShopProducts: SPSlice,
    Shops: SSlice,
    CompetitorProducts: CPSlice,
    cart: cartSlice,
    shipping: shippingSlice,
    invoices: invoiceReducer,
    products: listItemReducer,
    wishlist: WLSlice,
    ProductReviews: PRSlice
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
