import React from "react";
import styles from "./UserLayout.module.css";
import Link from "next/link";
import { CaretDownOutlined } from "@ant-design/icons";
import { Layout, Menu, Dropdown, Button } from "antd";
const { Header, Footer, Content } = Layout;

export const UserLayout = (props) => {
  const menu = (
    <Menu>
      <Menu.Item>中文</Menu.Item>
      <Menu.Item>English</Menu.Item>
    </Menu>
  );

  return (
    <Layout className={styles["user-layout-container"]}>
      <Header className={styles["header"]}>
        <div className={styles["lang"]}>
          <Dropdown overlay={menu}>
            <Button>
              {" "}
              选择语言 <CaretDownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content className={styles["content"]}>
        <div className={styles["top"]}>
          <div className={styles["content-header"]}>
            <Link href="/">
              <div className={styles["title-wrapper"]}>
                <img alt="logo" className={styles["logo"]} src="/assets/logo.svg" />
                <span className={styles["title"]}>React 旅游网</span>
              </div>
            </Link>
          </div>
          <div className={styles["desc"]}>
            Next + React + Hook + Antd + Redux + ReactRedux +ReduxToolkit
          </div>
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>这是一个Footer</Footer>
    </Layout>
  );
};
