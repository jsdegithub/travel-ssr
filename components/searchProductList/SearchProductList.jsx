import React from "react";
import { List, Space, Tag, Typography } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Text } = Typography;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const SearchProductList = ({ searchProductList, pagination, onPageChange }) => {
  const listData =
    searchProductList === null
      ? []
      : searchProductList.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          tags: (
            <>
              {p.departureCity && <Tag color="#f50">{p.departureCity}出发</Tag>}
              {p.travelDays && <Tag color="#108ee9">{p.travelDays} 天 </Tag>}
              {p.discountPresent && <Tag color="#87d068">超低折扣</Tag>}
              {p.tripType && <Tag color="#2db7f5">{p.tripType}</Tag>}
            </>
          ),
          imgSrc: p.touristRoutePictures[0].url,
          price: p.price,
          originalPrice: p.originalPrice,
          discountPresent: p.discountPresent,
          rating: p.rating,
        }));
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={
        pagination
          ? {
              current: pagination.currentPage,
              pageSize: pagination.pageSize,
              total: pagination.totalCount,
              onChange: (page) => onPageChange && onPageChange(page, pagination.pageSize),
            }
          : false
      }
      dataSource={listData}
      footer={
        pagination && (
          <div>
            搜索总路线: <Text strong>{pagination.totalCount}</Text> 条
          </div>
        )
      }
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          ]}
          extra={<img width={272} alt="logo" src={item.imgSrc} />}
        >
          <List.Item.Meta
            title={
              <>
                {item.discountPresent ? (
                  <>
                    <Text style={{ fontSize: 20, fontWeight: 400 }} delete>
                      ¥ {item.originalPrice}
                    </Text>
                    <Text type="danger" style={{ fontSize: 20, fontWeight: 400 }}>
                      {" "}
                      ¥ {item.price}
                    </Text>
                  </>
                ) : (
                  <Text style={{ fontSize: 20, fontWeight: 400 }}>¥ {item.price}</Text>
                )}
                <Link
                  href={`/productDetail?id=${item.id}`}
                  as={`/productDetail/${item.id}`}
                >
                  {item.title}
                </Link>
              </>
            }
            description={item.tags}
          />
          {item.description}
        </List.Item>
      )}
    />
  );
};
