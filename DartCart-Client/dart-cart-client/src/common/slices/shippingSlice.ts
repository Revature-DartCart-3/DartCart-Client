import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState, IShipping } from "../types";

const shippingAdapter = createEntityAdapter<IShipping>();

export const shippingSlice = createSlice({
    name: 'shipping',
    initialState: shippingAdapter.getInitialState(),
    reducers: {
        updateShipping: shippingAdapter.updateOne,
        addShipping: shippingAdapter.addOne
    },
})

export const { addShipping } = shippingSlice.actions;
export const { updateShipping } = shippingSlice.actions;
export default shippingSlice.reducer;

export const { selectById: selectShipping} = shippingAdapter.getSelectors((state: RootState) => state.shipping)
