import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { ShopProduct } from "../models";

const MOCK_SERVER =
  "https://6a03c0f8-707b-4c71-9de2-eba10f74363b.mock.pstmn.io";

const SPAdapter = createEntityAdapter<ShopProduct>(); // Entity is mapped to our Model. Create Entity Adapter provides REDUCERS

export const fetchShopProducts = createAsyncThunk(
  "ShopProducts/fetchShopProducts",
  async () => {
    const response = await axios.get(MOCK_SERVER + "/ShopProducts");
    return response.data;
  }
);

const intitialState = SPAdapter.getInitialState({
  status: "idle",
});

const SPSlice = createSlice({
  name: "ShopProducts",
  initialState: intitialState, //format is identical to getInitialState(), but we added a "status" field to the js Object
  reducers: {
    //addShopProducts: SPAdapter.addOne,///example reducer. Can't seem to get a selector without one reducer existing????
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopProducts.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(fetchShopProducts.fulfilled, (state, action) => {
        const newEntities = {};
        action.payload.forEach((ShopProduct) => {
          state.ids[ShopProduct.shop_product_id - 1] =
            ShopProduct.shop_product_id;
          newEntities[ShopProduct.shop_product_id] = ShopProduct;
        });
        state.entities = newEntities;
        state.status = "idle";
      });
  },
});

export const {
  selectAll: selectShopProducts,
  selectById: selectShopProductById,
} = SPAdapter.getSelectors((state: any) => state.ShopProducts); // state.ShopProduct is the NAME field of our slice

export default SPSlice.reducer; //exported to the REDUX STORE
//Creates a selectors to retrieve for ALL shopProducts or ShopProducts by ID