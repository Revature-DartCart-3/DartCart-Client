import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../features/authentication/AuthHeader";
import { ShopProduct } from "../models";

const MOCK_SERVER = process.env.REACT_APP_API_URL;

const CPAdapter = createEntityAdapter<ShopProduct>(); // Entity is mapped to our Model. Create Entity Adapter provides REDUCERS

//

export const fetchCompetitorProducts = createAsyncThunk(
  "CompetitorProducts/fetchCompetitorProducts",
  async (shopProductId: number) => {
    const response = await axios.get(MOCK_SERVER + "sellers/" + shopProductId, {
      headers: authHeader(),
    });
    return response.data;
  }
);

const intitialState = CPAdapter.getInitialState({
  status: "idle",
});

const CPSlice = createSlice({
  name: "CompetitorProducts",
  initialState: intitialState, //format is identical to getInitialState(), but we added a "status" field to the js Object
  reducers: {
    //addCompetitorProducts: CPAdapter.addOne,///example reducer. Can't seem to get a selector without one reducer existing????
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompetitorProducts.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(fetchCompetitorProducts.fulfilled, (state, action) => {
        const newEntities = {};
        var i = 0;
        state.ids = [];
        if (action.payload) {
          action.payload.forEach((CompetitorProduct) => {
            state.ids[i] = i;
            newEntities[i++] = CompetitorProduct;
          });
          state.entities = newEntities;
          state.status = "idle";
        }
        else {
          state.entities = {};
          state.status = "idle";
        }
      })
      .addCase(fetchCompetitorProducts.rejected, (state) => {
        state.entities = {};
        state.status = "idle";
      });
  },
});

export const {
  selectAll: selectCompetitorProducts,
  selectById: selectCompetitorProductById,
} = CPAdapter.getSelectors((state: any) => state.CompetitorProducts); // state.CompetitorProduct is the NAME field of our slice

export default CPSlice.reducer; //exported to the REDUX STORE
//Creates a selectors to retrieve for ALL shopProducts or CompetitorProducts by ID
