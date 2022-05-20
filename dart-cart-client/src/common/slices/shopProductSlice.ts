import {
  createSlice,
  createSelector,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../features/authentication/AuthHeader";
import { Product } from "../models";
import { RootState, InventoryProduct } from "../types";

const MOCK_SERVER = process.env.REACT_APP_API_URL;

const SPAdapter = createEntityAdapter<Product>(); // Entity is mapped to our Model. Create Entity Adapter provides REDUCERS

export const fetchShopProducts = createAsyncThunk(
  "ShopProducts/fetchShopProducts",
  async (name: string) => {
    const response = await axios.get(MOCK_SERVER + "shop_products/search", {
      headers: authHeader(),
      params: { name },
    });
    return response.data;
  }
);

const intitialState = SPAdapter.getInitialState({
  status: "idle",
  searchString: "",
  items: new Array(),
});

const SPSlice = createSlice({
  name: "ShopProducts",
  initialState: intitialState, //format is identical to getInitialState(), but we added a "status" field to the js Object
  reducers: {
    clearSlice(state, action) {
      state.status = "idle";
      state.ids = [];
      state.entities = {};
    },
    updatedSearchString(state, action) {
      state.searchString = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopProducts.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(fetchShopProducts.fulfilled, (state, action) => {
        const newProducts = new Array();
        state.ids = []
        state.entities = {}
        action.payload.forEach((ShopProduct) => {
          state.ids.push(ShopProduct.id);
          state.entities[ShopProduct.id] = ShopProduct;
          newProducts[ShopProduct.id] = ShopProduct.product;
        });
        state.items = newProducts;
        state.status = "success";
      });
  },
});

export const { updatedSearchString, clearSlice } = SPSlice.actions;

export const {
  selectAll: selectShopProducts,
  selectById: selectShopProductById,
} = SPAdapter.getSelectors((state: any) => state.ShopProducts);

export const getSearchString = createSelector(
  (state: RootState) => state.ShopProducts.searchString,
  (search) => {
    return search;
  }
);

export const getStatus = createSelector(
  (state: RootState) => state.ShopProducts.status,
  (status) => {
    return status;
  }
);

export const selectFilteredProducts = createSelector(
  (state: RootState) => state.ShopProducts,
  (state: RootState) => state.ShopProducts.searchString,
  (products, searchString) => {
    const items = new Array();
    for (var key in products.entities) {
      items.push(products.entities[key]);
    }

    let re = new RegExp(searchString, "i");

    return items.filter((prod) => prod.product.name.match(re)?.length > 0);
  }
);

export const addInventory = createAsyncThunk("userRegister/createUser", async (ip : InventoryProduct) => {
  return await axios.post(MOCK_SERVER + "shop_products", {
      shop: { id: ip.shop_id },
      product: { id: ip.product_id },
      discount: ip.discount,
      price: ip.price,
      quantity: ip.quantity
  },
  { headers: authHeader() } 
  );
});

export default SPSlice.reducer;
