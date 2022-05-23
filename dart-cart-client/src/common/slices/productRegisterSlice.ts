import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../types";
import axios from "axios";
import authHeader from "../../features/authentication/AuthHeader";

// Change URL for testing vs. production
const API_URL = process.env.REACT_APP_API_URL;

// createEntityAdapter gives us several premade reducer functions for manipulating state
// const productRegisterAdapter = createEntityAdapter<Product>();

// Create slice that will manage the state of some type of object
const productRegisterSlice = createSlice({
    name: "productRegister",
    initialState: {
        status: "idle"
    },
    reducers: {
        homeRedirect(state, action) {
            state.status = "idle";
        }
    },
    // Extra reducers to handle the promise produced by createAsyncThunk
    extraReducers: (builder) => {
        builder
            .addCase(saveProduct.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(saveProduct.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(saveProduct.rejected, (state, action) => {
                state.status = "failed";
            });
    }
});

// Wrapping reducers in actions
export default productRegisterSlice.reducer;

// Async thunks
export const saveProduct = createAsyncThunk("productRegister/createProduct", async (product : Product) => {
    const response = await axios.post(API_URL + "products", {
        id: product.id,
        name: product.name,
        description: product.description,
        imageURL: product.imageURL
    },
    { headers: authHeader() } 
    );
    return response.status;
});
