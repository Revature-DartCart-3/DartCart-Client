import {
    createSlice,
    createSelector,
    createEntityAdapter,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import authHeader from "../../features/authentication/AuthHeader";
  import { RootState, Shop } from "../types";
  
  const MOCK_SERVER = process.env.REACT_APP_API_URL;
  
  const SAdapter = createEntityAdapter<Shop>(); // Entity is mapped to our Model. Create Entity Adapter provides REDUCERS
  
  export const fetchShops = createAsyncThunk(
    "Shops/fetchShops",
    async (name: string) => {
      const response = await axios.get(MOCK_SERVER + "my-shops", {
        headers: authHeader()
      });
      return response.data;
    }
  );
  
  const intitialState = SAdapter.getInitialState({
    status: "idle",
    searchString: "",
    items: new Array(),
  });
  
  const SSlice = createSlice({
    name: "Shops",
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
        .addCase(fetchShops.pending, (state, action) => {
          state.status = "Loading";
        })
        .addCase(fetchShops.fulfilled, (state, action) => {
          const newShops = new Array();
          state.ids = []
          state.entities = {}
          action.payload.forEach((Shop) => {
            state.ids.push(Shop.id);
            state.entities[Shop.id] = Shop;
            newShops[Shop.id] = Shop;
          });
          state.items = newShops;
          state.status = "success";
        });
    },
  });
  
  export const { updatedSearchString, clearSlice } = SSlice.actions;
  
  export const {
    selectAll: selectShops,
    selectById: selectShopById,
  } = SAdapter.getSelectors((state: any) => state.Shops);
  
  export const getSearchString = createSelector(
    (state: RootState) => state.Shops.searchString,
    (search) => {
      return search;
    }
  );
  
  export const getStatus = createSelector(
    (state: RootState) => state.Shops.status,
    (status) => {
      return status;
    }
  );
  
  export const selectFilteredShops = createSelector(
    (state: RootState) => state.Shops,
    (state: RootState) => state.Shops.searchString,
    (shops, searchString) => {
      const items = new Array();
      for (var key in shops.entities) {
        items.push(shops.entities[key]);
      }
  
      let re = new RegExp(searchString, "i");
  
      return items.filter((s) => s.shop.name.match(re)?.length > 0);
    }
  );
  
  export default SSlice.reducer;
  