import React from "react";
import Link from "next/link";
import { List, Rate, Space, Tag, Typography } from "antd";
import { LikeOutlined, StarOutlined } from "@ant-design/icons";
import { LazyLoadImage } from "react-lazy-load-image-component";

const { Text } = Typography;

const listData = (productList) =>
  productList.map((p) => ({
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

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const ProductList = ({ data, paging, onPageChange }) => {
  const products = listData(data);
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={
        paging
          ? {
              current: paging.currentPage,
              onChange: (page) => onPageChange && onPageChange(page, paging.pageSize),
              pageSize: paging.pageSize,
              total: paging.totalCount,
            }
          : false
      }
      dataSource={products}
      footer={
        paging && (
          <div>
            搜索总路线: <Text strong>{paging.totalCount}</Text> 条
          </div>
        )
      }
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <>
              <Rate defaultValue={3} />
              <Text strong className="ant-rate-text">
                {item.rating}
              </Text>
            </>,
          ]}
          extra={
            <LazyLoadImage
              width={272}
              height={172}
              alt="image"
              src={item.imgSrc}
              effect="blur"
            />
          }
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
