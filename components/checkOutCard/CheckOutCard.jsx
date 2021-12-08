import React from "react";
import { Skeleton, Card, Button, Typography, Table } from "antd";
import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const { Meta } = Card;
const { Title, Text } = Typography;

const columns = [
  {
    title: "产品",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "价格",
    dataIndex: "amount",
    key: "amount",
  },
];

export const CheckOutCard = ({ loading, order, onCheckout }) => {
  const router = useRouter();
  const paymentData = order
    ? order.orderItems.map((i, index) => ({
        key: index,
        item: i.touristRoute.title,
        amount: (
          <>
            <Text delete>¥ {i.originalPrice} </Text>{" "}
            <Text type="danger" strong>
              ¥ {i.originalPrice * i.discountPresent}
            </Text>
          </>
        ),
      }))
    : [];

  return (
    <Card
      style={{ width: 600, marginTop: 50 }}
      actions={[
        order && order.state === "Completed" ? (
          <Button
            type="primary"
            onClick={() => {
              router.push("/");
            }}
            loading={loading}
          >
            <HomeOutlined />
            回到首页
          </Button>
        ) : (
          <Button type="primary" danger onClick={onCheckout} loading={loading}>
            <CheckCircleOutlined />
            支付
          </Button>
        ),
      ]}
    >
      <Skeleton loading={loading} active>
        <Meta
          title={
            <Title level={2}>
              {order && order.state === "Completed" ? "支付成功" : "总计"}
            </Title>
          }
          description={
            <Table
              columns={columns}
              dataSource={paymentData}
              showHeader={false}
              size="small"
              bordered={false}
              pagination={false}
            />
          }
        />
      </Skeleton>
    </Card>
  );
};
