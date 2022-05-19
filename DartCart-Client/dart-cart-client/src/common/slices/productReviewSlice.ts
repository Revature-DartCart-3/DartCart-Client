import {
    createSlice,
    createSelector,
    createEntityAdapter,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import authHeader from "../../features/authentication/AuthHeader";
  import { RootState, ProductReview } from "../types";
  
  const MOCK_SERVER = process.env.REACT_APP_API_URL;
  
  const PRAdapter = createEntityAdapter<ProductReview>(); // Entity is mapped to our Model. Create Entity Adapter provides REDUCERS
  
  export const fetchProductReviews = createAsyncThunk(
    "ProductReviews/fetchProductReviews",
    async (name: string) => {
      const response = await axios.get(MOCK_SERVER + "product-reviews", {
        headers: authHeader()
      });
      return response.data;
    }
  );
  
  const intitialState = PRAdapter.getInitialState({
    status: "idle",
    searchString: "",
    items: new Array(),
  });
  
  const PRSlice = createSlice({
    name: "ProductReviews",
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
        .addCase(fetchProductReviews.pending, (state, action) => {
          state.status = "Loading";
        })
        .addCase(fetchProductReviews.fulfilled, (state, action) => {
          const newProductReviews = new Array();
          state.ids = []
          state.entities = {}
          action.payload.forEach((ProductReview) => {
            state.ids.push(ProductReview.id);
            state.entities[ProductReview.id] = ProductReview;
            newProductReviews[ProductReview.id] = ProductReview;
          });
          state.items = newProductReviews;
          state.status = "success";
        });
    },
  });
  
  export const { updatedSearchString, clearSlice } = PRSlice.actions;
  
  export const {
    selectAll: selectProductReviews,
    selectById: selectProductReviewById,
  } = PRAdapter.getSelectors((state: any) => state.ProductReviews);
  
  export const getSearchString = createSelector(
    (state: RootState) => state.ProductReviews.searchString,
    (search) => {
      return search;
    }
  );
  
  export const getStatus = createSelector(
    (state: RootState) => state.ProductReviews.status,
    (status) => {
      return status;
    }
  );
  
  export const selectFilteredProductReviews = createSelector(
    (state: RootState) => state.ProductReviews,
    (state: RootState) => state.ProductReviews.searchString,
    (productReviews, searchString) => {
      const items = new Array();
      for (var key in productReviews.entities) {
        items.push(productReviews.entities[key]);
      }
  
      let re = new RegExp(searchString, "i");
  
      return items.filter((s) => s.productReview.name.match(re)?.length > 0);
    }
  );
  
  export default PRSlice.reducer;
  