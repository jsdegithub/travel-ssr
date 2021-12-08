const initialState = {
  currentLanguage: "zh",
  languageList: [
    {
      code: "zh",
      name: "中文",
    },
    {
      code: "en",
      name: "English",
    },
  ],
};

export const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "changeLanguage":
      return { ...state, currentLanguage: action.payload };
    default:
      return state;
  }
};
