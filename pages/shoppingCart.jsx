import styles from "../styles/ShoppingCartPage.module.css";
import { MainLayout } from "../layouts";
import { Spin, Row, Col, Affix } from "antd";
import { ProductList, PaymentCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { deleteShoppingCartProductActionCreator } from "../redux/reducer/shoppingCart/reducer";
import { checkoutActionCreator } from "../redux/reducer/shoppingCart/reducer";
import { useRouter } from "next/router";

export const ShoppingCart = () => {
  const loading = useSelector((state) => state.shoppingCart.loading);
  const error = useSelector((state) => state.shoppingCart.error);
  const shoppingCartProduct = useSelector(
    (state) => state.shoppingCart.shoppingCartProductList
  );

  const router = useRouter();
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.login.jwt);

  if (loading) {
    return (
      <Spin
        size={"large"}
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }
  if (error) {
    return <div>ShoppingCart-State-Error: {error}</div>;
  }
  return (
    <MainLayout>
      <Row>
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            <ProductList data={shoppingCartProduct.map((i) => i.touristRoute)} />
          </div>
        </Col>
        <Col span={8}>
          <Affix>
            <div className={styles["payment-card-container"]}>
              <PaymentCard
                loading={loading}
                originalPrice={shoppingCartProduct
                  .map((i) => i.originalPrice)
                  .reduce((a, b) => a + b, 0)} //必须填写initialValue=0,否则数组为空时会报错
                price={shoppingCartProduct
                  .map(
                    (i) => i.originalPrice * (i.discountPresent ? i.discountPresent : 1)
                  )
                  .reduce((a, b) => a + b, 0)}
                onCheckout={() => {
                  if (shoppingCartProduct.length === 0) return;
                  dispatch(checkoutActionCreator(jwt));
                  router.push("/placeOrder");
                }}
                onShoppingCartClear={() => {
                  if (shoppingCartProduct.length === 0) return;
                  dispatch(
                    deleteShoppingCartProductActionCreator({
                      jwt,
                      productIds: shoppingCartProduct.map((i) => i.id),
                    })
                  );
                }}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default ShoppingCart;
