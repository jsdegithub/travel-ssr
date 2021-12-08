import "../styles/globals.css";
import "antd/dist/antd.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../i18n/config";
import axios from "axios";
import { Provider } from "react-redux";
import store from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getShoppingCartProductListActionCreator } from "../redux/reducer/shoppingCart/reducer";

axios.defaults.headers["x-icode"] = "46A0A6ADED08D5A9";
// axios.defaults.baseURL = "/api";

const MiddleWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.login.jwt);

  useEffect(() => {
    if (jwt !== null) {
      dispatch(getShoppingCartProductListActionCreator(jwt));
    }
  }, [jwt]);

  return <div>{children}</div>;
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store.store}>
      <PersistGate persistor={store.persistedStore}>
        <MiddleWrapper>
          <Component {...pageProps} />
        </MiddleWrapper>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
