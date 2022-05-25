import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types";
import axios from "axios";
import authHeader from "../../features/authentication/AuthHeader";


// Change URL for testing vs. production
const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = "http://localhost:9005/";


// createEntityAdapter gives us several premade reducer functions for manipulating state
const userProfileAdapter = createEntityAdapter<User>();

// Create slice that will manage the state of some type of object
const userUpdateProfileSlice = createSlice({
    name: "userUpdateProfile",
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
            .addCase(updateUser.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = "failed";
            });
    }
});

// Wrapping reducers in actions
export const { homeRedirect } = userUpdateProfileSlice.actions;
export default userUpdateProfileSlice.reducer;


export const updateUser = createAsyncThunk("userUpdateProfile/updateUser", async (user: User) => {
    return await axios.patch(
        API_URL + "updateProfile",
        {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            location: user.location,
            imageURL: user.imageURL,
            aboutMe: user.aboutMe,
            // accountType : user.accountType
        
            
        },
        { headers: authHeader() }
    );
});
