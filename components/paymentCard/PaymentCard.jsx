import React from "react";
import { Skeleton, Card, Button, Typography, Table } from "antd";
import { DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Title, Text } = Typography;

const columns = [
  {
    title: "项目",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "金额",
    dataIndex: "amount",
    key: "amount",
  },
];

export const PaymentCard = ({
  loading,
  originalPrice,
  price,
  onShoppingCartClear,
  onCheckout,
}) => {
  const paymentData = [
    {
      key: 1,
      item: "原价",
      amount: <Text delete>¥ {originalPrice}</Text>,
    },
    {
      key: 3,
      item: "现价",
      amount: (
        <Title type="danger" level={2}>
          ¥ {price}
        </Title>
      ),
    },
  ];

  return (
    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <Button
          type="primary"
          danger
          onClick={onCheckout}
          loading={loading}
          key="checkout"
        >
          <CheckCircleOutlined />
          下单支付
        </Button>,
        <Button onClick={onShoppingCartClear} loading={loading} key="clearCart">
          <DeleteOutlined />
          清空
        </Button>,
      ]}
    >
      <Skeleton loading={loading} active>
        <Meta
          title={<Title level={2}>总计</Title>}
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
