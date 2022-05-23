import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import axios from 'axios'

import { CartItem, CheckoutProps, User } from '../types'
import authHeader from "../../features/authentication/AuthHeader";
import { RootState } from '../store';
import { act } from 'react-dom/test-utils';

const API_URL = process.env.REACT_APP_API_URL;

const cartAdapater = createEntityAdapter<CartItem>();

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    const username = localStorage.getItem("username");
    const response = await axios.get(API_URL + "carts/" + username, { headers: authHeader() });

    return response.data;
});

export const addToCart = createAsyncThunk('cart/addToCart', async (shop_product_id: number) => {
    const username = localStorage.getItem("username")
    const response = await axios.post(API_URL + "carts", {
        quantity: 1,
        saved: false,
        customer: {
            username: username
        },
        shopProduct: {
            id: shop_product_id
        }
    }, { headers: authHeader() })

    return response.data;
});

export const updateCart = createAsyncThunk('cart/updateCart', async (cartItem: CartItem) => {
    const response = await axios.put(API_URL + "carts/" + cartItem.id, {
        quantity: cartItem.quantity
    }, { headers: authHeader() })

    return response.data;
});

export const addInvoice = createAsyncThunk(
    "checkout/addInvoice",
    async ({ user, shippingAddress, currentCart }: CheckoutProps) => {
        const response = await axios.post(API_URL + "checkout", {
            id: user.id,
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            location: shippingAddress,
            registrationDate: user.registrationDate,
            itemList: currentCart
        }, {
            headers: authHeader()
        });
        return response.data;
    }
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState: cartAdapater.getInitialState({
        status: "idle",
        total: 0
    }),
    reducers: {
        updateCartItem(state, action) {
            if (action.payload.changes.quantity == 0) {
                cartAdapater.removeOne(state, action.payload.id);
            } else {
                cartAdapater.updateOne(state, action);
            }
        },
        clearCart(state) {
            cartAdapater.removeMany(state, state.ids)
        },
        updateTotal(state, action) {
            state.total = (action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                cartAdapater.addMany(state, action.payload);
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                cartAdapater.addOne(state, action.payload);
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                cartAdapater.setOne(state, action.payload)
            })
            .addCase(addInvoice.fulfilled, (state) => {
                cartAdapater.removeAll(state)
                state.status = "fulfilled";
            })
            .addCase(addInvoice.rejected, (state) => {
                state.status = "rejected";
            })
    }
});

export const { clearCart, updateCartItem, updateTotal } = cartSlice.actions;
export default cartSlice.reducer;

export const { selectAll: selectAllCartItems, selectById: selectCartItemById } = cartAdapater.getSelectors((state: RootState) => state.cart)

export const selectStatus = createSelector(
    (state: RootState) => state.cart,
    (cart) => cart.status
);

export const selectTotal = createSelector (
    (state: RootState) => state.cart,
    (cart) => cart.total
);
