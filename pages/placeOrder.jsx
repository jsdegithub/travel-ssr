import React from "react";
import { PaymentForm, CheckOutCard } from "../components";
import { Row, Col } from "antd";
import { MainLayout } from "../layouts/mainLayout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrderActionCreator } from "../redux/reducer/placeOrder/reducer";

export const PlaceOrder = () => {
  const loading = useSelector((state) => state.placeOrder.loading);
  const currentOrder = useSelector((state) => state.placeOrder.currentOrder);
  const jwt = useSelector((state) => state.login.jwt);
  const dispatch = useDispatch();

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckOutCard
            loading={loading}
            order={currentOrder}
            onCheckout={() =>
              dispatch(
                placeOrderActionCreator({
                  jwt,
                  orderId: currentOrder.id,
                })
              )
            }
          />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default PlaceOrder;
