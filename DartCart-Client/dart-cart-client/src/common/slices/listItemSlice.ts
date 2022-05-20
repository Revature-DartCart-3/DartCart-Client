import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../features/authentication/AuthHeader";
import { ShopProduct, Product } from "../models";

const MOCK_SERVER = "http://localhost:9005/";

// const productAdapter = createEntityAdapter<Product>();
const listItemAdapter = createEntityAdapter<ShopProduct>();

const products: Product[] = [];

const intitialState = listItemAdapter.getInitialState({
    status: "idle",
    products
});

const listItemSlice = createSlice({
    name: "listItem",
    initialState: intitialState,
    reducers: {
        addedShopProduct: listItemAdapter.addOne,
        fetchProducts(listItemSliceState, action) {
            listItemSliceState.products = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                action.payload.forEach((Product) => {
                    state.products[Product.id] = Product;
                });
                state.status = "idle";
            });
    }
});

export const { selectAll: selectShopProducts, selectById: selectShopProductById } = listItemAdapter.getSelectors(
    (state: any) => state.ShopProducts
);

export const selectProducts = (state) => state.products.products;

export const getAllProducts = createAsyncThunk("listItem/getAllProducts", async () => {
    const response = await axios.get(MOCK_SERVER + "products", { headers: authHeader() });
    return response.data;
});

export const createShopProduct = createAsyncThunk("listItem/createShopProduct", async (shopProduct: ShopProduct) => {
    return await axios.post(
        MOCK_SERVER + "shop_products",
        {
            id: shopProduct.shop_product_id,
            shop: shopProduct.shop,
            product: shopProduct.product,
            quantity: shopProduct.quantity,
            price: shopProduct.price,
            discount: shopProduct.discount
        },
        { headers: authHeader() }
    );
});

export default listItemSlice.reducer;
