import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { languageReducer } from "./reducer/language/reducer";
import { registerReducer } from "./reducer/register/reducer";
import { loginSlice } from "./reducer/login/slice";
import { shoppingCartReducer } from "./reducer/shoppingCart/reducer";
import { recommendProductSlice } from "./reducer/recommendProduct/slice";
import { productDetailSlice } from "./reducer/productDetail/slice";
import { placeOrderReducer } from "./reducer/placeOrder/reducer";
import { searchProductSlice } from "./reducer/searchProduct/slice";

import { changeLanguage } from "./middleware/changeLanguage";

const rootReducer = combineReducers({
  language: languageReducer,
  register: registerReducer,
  login: loginSlice.reducer,
  shoppingCart: shoppingCartReducer,
  recommendProduct: recommendProductSlice.reducer,
  productDetail: productDetailSlice.reducer,
  placeOrder: placeOrderReducer,
  searchProduct: searchProductSlice.reducer,
});
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["login"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, changeLanguage)
);
const persistedStore = persistStore(store);

export default {
  store,
  persistedStore,
};
