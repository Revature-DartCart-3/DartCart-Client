import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../features/authentication/AuthHeader";
import { RootState } from "../types";

// Change URL for testing vs. production
const API_URL = process.env.REACT_APP_API_URL;

// Create a slice that will manage the state of the SecurityToken
const authenticationSlice = createSlice({
    name: "authentication",
    initialState: {
        status: "idle",
        token: localStorage.getItem("accessToken"),
        user: localStorage.getItem("user"),
        seller: localStorage.getItem("seller"),
        shop: localStorage.getItem("shop")
    },
    reducers: {
        updateToken(authenticationSliceState, action) {
            authenticationSliceState.token = action.payload;
        },
        updateUser(authenticationSliceState, action) {
            authenticationSliceState.user = action.payload;
        },
        updateSeller(authenticationSliceState, action) {
            authenticationSliceState.seller = action.payload;
        },
        updateShop(authenticationSliceState, action) {
            authenticationSliceState.shop = action.payload;
        },
        logout(authenticationSliceState, action) {
            authenticationSliceState.token = null;
            authenticationSliceState.user = null;
            authenticationSliceState.status = "idle";
            authenticationSliceState.seller = null;
            authenticationSliceState.shop = null;

            localStorage.removeItem("user");
            localStorage.removeItem("username");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("seller");
            localStorage.removeItem("shop");
        },
        homeRedirect(authenticationSliceState, action) {
            authenticationSliceState.status = "loading";
        },
    },
    // Extra reducers to handle the promise created by createAsyncThunk
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (authenticationSliceState, action) => {
                authenticationSliceState.status = "loading";
            })
            .addCase(loginUser.fulfilled, (authenticationSliceState, action) => {
                authenticationSliceState.token = localStorage.getItem("accessToken");
                authenticationSliceState.user = localStorage.getItem("user");

                if (authenticationSliceState.user) authenticationSliceState.status = "success";
                else authenticationSliceState.status = "failure";
            })
            .addCase(loginUser.rejected, (authenticationSliceState, action) => {
                authenticationSliceState.status = "failure";
            })
            .addCase(fetchSeller.pending, (authenticationState, action) => {
                authenticationState.status = "loading";
            })
            .addCase(fetchSeller.fulfilled, (authenticationState, action) => {
                authenticationState.seller = localStorage.getItem("seller");

                if (authenticationState.seller) authenticationState.status = "success";
                else authenticationState.status = "failure";
            })
            .addCase(fetchSeller.rejected, (authenticationState, action) => {
                authenticationState.status = "failure";
            })
            .addCase(fetchShop.pending, (authenticationState, action) => {
                authenticationState.status = "loading";
            })
            .addCase(fetchShop.fulfilled, (authenticationState, action) => {
                authenticationState.shop = localStorage.getItem("shop");

                if (authenticationState.shop) authenticationState.status = "success";
                else authenticationState.status = "failure";
            })
            .addCase(fetchShop.rejected, (authenticationState, action) => {
                authenticationState.status = "failure";
            });
    }
});

// Selectors
export const selectStatus = createSelector(
    (state: RootState) => state.authentication,
    (authentication) => authentication.status
);

export const selectUser = (state) => state.authentication.user;

export const selectSeller = (state) => state.authentication.seller;

export const selectShop = (state) => state.authentication.shop;

export const selectToken = createSelector(
    (state: RootState) => state.authentication,
    (authentication) => authentication.token
);

// Async functionality
export const loginUser = createAsyncThunk(
    "authentication/login",
    async (user: { username: string; password: string }) => {
        return axios
            .post(API_URL + "login", {
                username: user.username,
                password: user.password
            })
            .then((response) => {
                if (response.headers) {
                    localStorage.setItem("username", response.data.username);
                    localStorage.setItem("accessToken", response.headers.authorization);
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
            })
            .catch((error) => {
                localStorage.removeItem("user");
                localStorage.removeItem("username");
                localStorage.removeItem("accessToken");
            });
    }
);

export const fetchSeller = createAsyncThunk("authentication/fetchSeller", async (id: number) => {
    return axios.get(`${API_URL}sellers/${id}`, { headers: authHeader() }).then((response) => {
        localStorage.setItem("seller", JSON.stringify(response.data));
    });
});

export const fetchShop = createAsyncThunk("authentication/fetchShop", async (id: number) => {
    return axios.get(`${API_URL}shops/${id}`, { headers: authHeader() }).then((response) => {
        localStorage.setItem("shop", JSON.stringify(response.data));
    });
});

// Wrapping reducers in actions
export const { updateToken, updateUser, updateSeller, homeRedirect, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
