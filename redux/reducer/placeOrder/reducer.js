import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  currentOrder: null,
};

export const placeOrderActionCreator = (params) => async (dispatch, getState) => {
  dispatch({
    type: "placeOrderStart",
  });
  try {
    const { data } = await axios.post(`http://123.56.149.216:8080/api/orders/${params.orderId}/placeOrder`, null, {
      headers: {
        Authorization: `bearer ${params.jwt}`,
      },
    });
    dispatch({
      type: "placeOrderSuccess",
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: "placeOrderFailed",
      payload: e.message,
    });
  }
};

export const placeOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "placeOrderStart":
      return { ...state, loading: true };
    case "placeOrderSuccess":
      return { ...state, loading: false, currentOrder: action.payload };
    case "placeOrderFailed":
      return { ...state, loading: false, error: action.payload };
    case "checkoutStart":
      return { ...state, loading: true };
    case "checkoutSuccess":
      return { ...state, loading: false, currentOrder: action.payload };
    case "checkoutFailed":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
