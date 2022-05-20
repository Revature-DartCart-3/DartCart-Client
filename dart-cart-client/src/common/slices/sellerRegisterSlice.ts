import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { Seller, Shop } from "../types";
import axios from "axios";
import authHeader from "../../features/authentication/AuthHeader";

// Change URL for testing vs. production
const API_URL = process.env.REACT_APP_API_URL;

// createEntityAdapter gives us several premade reducer functions for manipulating state
const sellerRegisterAdapter = createEntityAdapter<Seller>();

// Create slice that will manage the state of some type of object
const sellerRegisterSlice = createSlice({
    name: "sellerRegister",
    initialState: {
        status: "idle"
    },
    reducers: {
        shopRedirect(state, action) {
            state.status = "idle";
        }
    },
    // Extra reducers to handle the promise produced by createAsyncThunk
    extraReducers: (builder) => {
        builder.addCase(saveSellerandShop.pending, (state, action) => {
            state.status = "loading";
        });
    }
});

// Wrapping reducers in actions
export const { shopRedirect } = sellerRegisterSlice.actions;
export default sellerRegisterSlice.reducer;

// Selectors
export const { selectAll: selectSellers, selectById: selectSellerById } = sellerRegisterAdapter.getSelectors(
    (state: any) => state.users
);

// Async thunks
export const saveSellerandShop = createAsyncThunk("sellerRegister/saveSellerandShop", async (shop: Shop) => {
    return await axios.post(
        API_URL + "signup",
        {
            id: shop.id,
            location: shop.location,
            seller: shop.seller
        },
        { headers: authHeader() }
    );
});
