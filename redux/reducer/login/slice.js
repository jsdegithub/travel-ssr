import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  jwt: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginStart: (state, action) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.jwt = action.payload;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // ===============================
    logout: (state, action) => {
      state.jwt = null;
    },
  },
  extraReducers: {},
});
