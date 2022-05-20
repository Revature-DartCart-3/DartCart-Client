import {
  createSlice,
  createSelector,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../features/authentication/AuthHeader";
import { RootState } from "../types";
import { WishListItem } from "../../common/types";

const MOCK_SERVER = process.env.REACT_APP_API_URL;

const WLAdapter = createEntityAdapter<WishListItem>(); // Entity is mapped to our Model. Create Entity Adapter provides REDUCERS

export const fetchWishList = createAsyncThunk(
  "wishlist/fetchWishList",
  async () => {
    const response = await axios.get(`${MOCK_SERVER}myWishList`, {
      headers: authHeader(),
    });
    return response.data;
  }
);

export const deleteFromWishList = createAsyncThunk(
  "wishlist/removeItemFromWishList",
  async (id: number) => {
    const response = await axios.post(`${MOCK_SERVER}removeFromWishList`, {
      productId: id
    },
    { headers: authHeader() });
    return response;
  }
);

const intitialState = WLAdapter.getInitialState({
  status: "idle",
  items: new Array(),
});

const WLSlice = createSlice({
  name: "WishList",
  initialState: intitialState,
  reducers: {
    clearSlice(state, action) {
      state.status = "idle";
      state.items = [];
      state.entities = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWishList.pending, (state, action) => {
      state.status = "Loading";
    }).
    addCase(fetchWishList.fulfilled, (state, action) => {
      const newWishListItems = new Array();
      state.ids = [];
      state.entities = {};
      action.payload.forEach((WishListItem) => {
        state.ids.push(WishListItem.wishListId);
        state.entities[WishListItem.wishListId] = WishListItem;
        newWishListItems[WishListItem.wishListId] = WishListItem;
      });
      state.items = newWishListItems;
      state.status = "success";
    });
  },
});

export const {} = WLSlice.actions;

export const {
  selectAll: selectAllWishListItems,
  selectById: selectWishListItemById,
} = WLAdapter.getSelectors((state: any) => state.wishlist);

export const selectStatus = createSelector(
  (state: RootState) => state.wishlist,
  (status) =>  {
    return status;
  }
  );
  
  export default WLSlice.reducer;