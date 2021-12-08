import styles from "./ProductIntro.module.css";
import React from "react";
import { Typography, Carousel, Rate, Table } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";

const columns = [
  {
    title: "title",
    dataIndex: "title",
    key: "title",
    align: "left",
    width: 120,
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
    align: "center",
  },
];

export const ProductIntro = ({
  title,
  shortDescription,
  price,
  coupons,
  points,
  discount,
  rating,
  pictures,
}) => {
  const tableDataSource = [
    {
      key: 0,
      title: "路线名称",
      description: title,
    },
    {
      key: 1,
      title: "价格",
      description: (
        <>
          ¥{" "}
          <Typography.Text type="danger" strong>
            {price}
          </Typography.Text>
        </>
      ),
    },
    {
      key: 2,
      title: "限时抢购折扣",
      description: discount ? (
        <>
          ¥ <Typography.Text delete>{price}</Typography.Text>{" "}
          <Typography.Text type="danger" strong>
            ¥ {discount}
          </Typography.Text>
        </>
      ) : (
        "暂无折扣"
      ),
    },
    {
      key: 3,
      title: "领取优惠",
      description: coupons ? discount : "无优惠券可领",
    },
    {
      key: 4,
      title: "线路评价",
      description: (
        <>
          <Rate allowHalf defaultValue={+rating} />
          <Typography.Text style={{ marginLeft: 10 }}>{rating} 星</Typography.Text>
        </>
      ),
    },
  ];

  return (
    <div className={styles["intro-container"]}>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Typography.Text>{shortDescription}</Typography.Text>
      <div className={styles["intro-detail-content"]}>
        <Typography.Text style={{ marginLeft: 20 }}>
          ￥<span className={styles["intro-detail-strong-text"]}>{price}</span>/人起
        </Typography.Text>
        <Typography.Text style={{ marginLeft: 20 }}>
          <span className={styles["intro-detail-strong-text"]}>{rating}</span>分
        </Typography.Text>
      </div>
      <Carousel autoplay slidesToShow={3}>
        {pictures.map((i) => (
          <LazyLoadImage height={150} src={i} effect="blur" key={i} />
        ))}
      </Carousel>
      <Table
        columns={columns}
        dataSource={tableDataSource}
        size="small"
        bordered={false}
        pagination={false}
      ></Table>
    </div>
  );
};
