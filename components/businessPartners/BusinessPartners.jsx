import React from "react";
import { Row, Col, Typography, Divider } from "antd";
import styles from "./BusinessPartners.module.css";

const image1 = "/assets/images/microsoft-80658_640.png";
const image2 = "assets/images/icon-720944_640.png";
const image3 = "assets/images/follow-826033_640.png";
const image4 = "assets/images/facebook-807588_640.png";

import { LazyLoadImage } from "react-lazy-load-image-component";

const companies = [
  { src: image1, title: "Microsoft" },
  { src: image2, title: "Youtube" },
  { src: image3, title: "Ins" },
  { src: image4, title: "Facebook" },
];

export const BusinessPartners = (props) => {
  return (
    <div className={styles.content}>
      <Divider orientation="left">
        <Typography.Title level={3}>合作企业</Typography.Title>
      </Divider>
      <Row>
        {companies.map((c, index) => (
          <Col span={6} key={"bussiness-partner-" + index}>
            <LazyLoadImage
              alt="bussiness-partner"
              src={c.src}
              effect="blur"
              style={{
                width: "80%",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};
