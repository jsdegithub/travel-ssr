import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  error: null,
  recommendProductList: [],
};

export const getRecommendProductList = createAsyncThunk(
  "recommendProduct/getRecommendProductList",
  async () => {
    const { data } = await axios.get("http://123.56.149.216:8080/api/productCollections");
    return data;
  }
);

export const recommendProductSlice = createSlice({
  name: "recommendProduct",
  initialState,
  extraReducers: {
    [getRecommendProductList.pending]: (state, action) => {
      state.loading = true;
    },
    [getRecommendProductList.fulfilled]: (state, action) => {
      state.loading = false;
      state.recommendProductList = action.payload;
    },
    [getRecommendProductList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
