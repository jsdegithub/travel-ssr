import styles from "./ProductImage.module.css";
import React from "react";
import { Typography } from "antd";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const ProductImage = ({ id, size, imageSrc, price, title }) => {
  return (
    <Link href={`/productDetail?id=${id}`} as={`/productDetail/${id}`}>
      <div className={styles["img-wrapper"]}>
        {size === "large" ? (
          <LazyLoadImage src={imageSrc} effect="blur" height={285} width={485} />
        ) : (
          <LazyLoadImage src={imageSrc} effect="blur" height={120} width={240} />
        )}
        <div>
          <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
          <Typography.Text type="danger" strong>
            ¥ {price} 起
          </Typography.Text>
        </div>
      </div>
    </Link>
  );
};
