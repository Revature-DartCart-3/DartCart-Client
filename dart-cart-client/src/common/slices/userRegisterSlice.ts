import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types";
import axios from "axios";

// Change URL for testing vs. production
const API_URL = process.env.REACT_APP_API_URL;

// createEntityAdapter gives us several premade reducer functions for manipulating state
const userRegisterAdapter = createEntityAdapter<User>();

// Create slice that will manage the state of some type of object
const userRegisterSlice = createSlice({
    name: "userRegister",
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
            .addCase(saveUser.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(saveUser.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(saveUser.rejected, (state, action) => {
                state.status = "failed";
            });
    }
});

// Wrapping reducers in actions
export const { homeRedirect } = userRegisterSlice.actions;
export default userRegisterSlice.reducer;

// Async thunks
export const saveUser = createAsyncThunk("userRegister/createUser", async (user: User) => {
    return await axios.post(API_URL + "register", {
        id: user.id,
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        location: user.location,
        imageURL: user.imageURL,
        // accountType : user.accountType,
        registrationDate: user.registrationDate
    });
});
