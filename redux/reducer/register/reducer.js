const initialState = {
  loading: false,
  error: null,
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "registerStart":
      return { ...state, laoding: true };
    case "registerSuccess":
      return { ...state, laoding: false };
    case "registerFailed":
      return { ...state, laoding: false, error: action.payload };
    default:
      return state;
  }
};
