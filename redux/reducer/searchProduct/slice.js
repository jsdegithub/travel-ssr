import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  searchProductList: null,
  pagination: null,
};

export const searchProduct = createAsyncThunk(
  "productSearch/searchProduct",
  async (params) => {
    let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`;
    if (params.keyword) {
      url += `&keyword=${params.keyword}`;
    }
    const res = await axios.get(url);
    return {
      data: res.data,
      pagination: JSON.parse(res.headers["x-pagination"]),
    };
  }
);

export const searchProductSlice = createSlice({
  name: "productSearch",
  initialState,
  extraReducers: {
    [searchProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [searchProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.searchProductList = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    [searchProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
