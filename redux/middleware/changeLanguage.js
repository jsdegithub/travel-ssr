import i18n from "i18next";

export const changeLanguage = (store) => (next) => (action) => {
  if (action.type === "changeLanguage") {
    i18n.changeLanguage(action.payload);
  }
  next(action);
};
