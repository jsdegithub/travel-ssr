import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  shoppingCartProductList: [],
};

export const getShoppingCartProductListActionCreator =
  (jwt) => async (dispatch, getState) => {
    dispatch({
      type: "getShoppingCartProductListStart",
    });
    try {
      const { data } = await axios.get("http://123.56.149.216:8080/api/shoppingCart", {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      });
      dispatch({
        type: "getShoppingCartProductListSuccess",
        payload: data.shoppingCartItems,
      });
    } catch (e) {
      dispatch({
        type: "getShoppingCartProductListFailed",
        payload: e.message,
      });
    }
  };

export const addShoppingCartProductActionCreator =
  (params) => async (dispatch, getState) => {
    dispatch({
      type: "addShoppingCartProductStart",
    });
    try {
      const { data } = await axios.post(
        "http://123.56.149.216:8080/api/shoppingCart/items",
        {
          touristRouteId: params.id,
        },
        {
          headers: {
            Authorization: `bearer ${params.jwt}`,
          },
        }
      );
      dispatch({
        type: "addShoppingCartProductSuccess",
        payload: data.shoppingCartItems,
      });
    } catch (e) {
      dispatch({
        type: "addShoppingCartProductFailed",
        payload: e.message,
      });
    }
  };

export const deleteShoppingCartProductActionCreator =
  (params) => async (dispatch, getState) => {
    dispatch({
      type: "deleteShoppingCartProductStart",
    });
    try {
      await axios.delete(`http://123.56.149.216:8080/api/shoppingCart/items/(${params.productIds.join(",")})`, {
        headers: {
          Authorization: `bearer ${params.jwt}`,
        },
      });
      dispatch({
        type: "deleteShoppingCartProductSuccess",
      });
    } catch (e) {
      dispatch({
        type: "deleteShoppingCartProductFailed",
        payload: e.message,
      });
    }
  };

export const checkoutActionCreator = (jwt) => async (dispatch, getState) => {
  dispatch({
    type: "checkoutStart",
  });
  try {
    const { data } = await axios.post(`http://123.56.149.216:8080/api/shoppingCart/checkout`, null, {
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    });
    dispatch({
      type: "checkoutSuccess",
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: "checkoutFailed",
      payload: e.message,
    });
  }
};

export const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "getShoppingCartProductListStart":
      return { ...state, loading: true };
    case "getShoppingCartProductListSuccess":
      return { ...state, loading: false, shoppingCartProductList: action.payload };
    case "getShoppingCartProductListFailed":
      return { ...state, loading: false, error: action.payload };
    case "addShoppingCartProductStart":
      return { ...state, loading: true };
    case "addShoppingCartProductSuccess":
      return { ...state, loading: false, shoppingCartProductList: action.payload };
    case "addShoppingCartProductFailed":
      return { ...state, loading: false, error: action.payload };
    case "deleteShoppingCartProductStart":
      return { ...state, loading: true };
    case "deleteShoppingCartProductSuccess":
      return { ...state, loading: false, shoppingCartProductList: [] };
    case "deleteShoppingCartProductFailed":
      return { ...state, loading: false, error: action.payload };
    case "checkoutStart":
      return { ...state, loading: true };
    case "checkoutSuccess":
      return { ...state, loading: false, shoppingCartProductList: [] };
    case "checkoutFailed":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
