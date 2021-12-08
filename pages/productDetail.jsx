import styles from "../styles/ProductDetail.module.css";
import {
  Spin,
  Button,
  message,
  Row,
  Col,
  DatePicker,
  Anchor,
  Menu,
  Divider,
  Typography,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { MainLayout } from "../layouts";
import { ProductIntro, ProductComments } from "../components";
import { commentMockData } from "../mockData/mockup";
import { getProductDetail } from "../redux/reducer/productDetail/slice";
import { addShoppingCartProductActionCreator } from "../redux/reducer/shoppingCart/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

const { RangePicker } = DatePicker;
const { Link } = Anchor;

export const ProductDetail = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const productDetail = useSelector((state) => state.productDetail.productDetail);
  const shoppingCartLoading = useSelector((state) => state.shoppingCart.loading);
  const shoppingCartError = useSelector((state) => state.shoppingCart.error);
  const jwt = useSelector((state) => state.login.jwt);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    dispatch(getProductDetail(id));
  }, []);

  if (shoppingCartError) {
    message.info(`shoppingCartStateError: ${shoppingCartError}`);
  }
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
    return <div>getProductDetailError: {error}</div>;
  }
  return (
    <MainLayout>
      <div className={styles["product-intro-container"]}>
        <Row>
          <Col span={13}>
            <ProductIntro
              title={productDetail.title}
              shortDescription={productDetail.description}
              price={productDetail.originalPrice}
              coupons={productDetail.coupons}
              points={productDetail.points}
              discount={productDetail.price}
              rating={productDetail.rating}
              pictures={productDetail.touristRoutePictures.map((p) => p.url)}
            />
          </Col>
          <Col span={11}>
            <Button
              style={{
                marginTop: 50,
                marginBottom: 30,
                display: "block",
              }}
              type="primary"
              danger
              loading={shoppingCartLoading}
              onClick={() => dispatch(addShoppingCartProductActionCreator({ jwt, id }))}
            >
              <ShoppingCartOutlined />
              加入购物车
            </Button>
            <RangePicker
              open
              style={{
                marginTop: 20,
              }}
            />
          </Col>
        </Row>
      </div>
      <div className={styles["product-detail-anchor"]}>
        <Anchor>
          <Menu mode="horizontal" className={styles["anchor-menu"]}>
            <Menu.Item key="1">
              <Link href="#feature" title="产品特色"></Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link href="#fees" title="费用"></Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link href="#notes" title="预定须知"></Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link href="#comments" title="用户评价"></Link>
            </Menu.Item>
          </Menu>
        </Anchor>
      </div>
      <div id="feature" className={styles["product-detail-container"]}>
        <Divider orientation="center">
          <Typography.Title level={3}>产品特色</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: productDetail.features }}
          style={{ margin: 50 }}
        ></div>
      </div>
      <div id="fees" className={styles["product-detail-container"]}>
        <Divider orientation="center">
          <Typography.Title level={3}>费用</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: productDetail.fees }}
          style={{ margin: 50 }}
        ></div>
      </div>
      <div id="notes" className={styles["product-detail-container"]}>
        <Divider orientation="center">
          <Typography.Title level={3}>预定须知</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: productDetail.notes }}
          style={{ margin: 50 }}
        ></div>
      </div>
      <div id="comments" className={styles["product-detail-container"]}>
        <Divider orientation="center">
          <Typography.Title level={3}>用户评价</Typography.Title>
        </Divider>
        {commentMockData.map((i) => (
          <div key={i.key} style={{ margin: 40 }}>
            <ProductComments
              author={i.author}
              avatar={i.avatar}
              commentContent={i.content}
              createDate={i.createDate}
            />
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
