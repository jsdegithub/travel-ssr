import React, { useState, useEffect } from "react";
import { Layout, Typography, Input, Dropdown, Menu, Button } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import styles from "./Header.module.css";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { loginSlice } from "../../redux/reducer/login/slice";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

export const Header = () => {
  const { t } = useTranslation();

  const currentLanguage = useSelector((state) => state.language.currentLanguage);
  const languageList = useSelector((state) => state.language.languageList);
  const jwt = useSelector((state) => state.login.jwt);
  const shoppingCartProductList = useSelector(
    (state) => state.shoppingCart.shoppingCartProductList
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (jwt !== null) {
      const { username } = jwt_decode(jwt);
      setUsername(username);
      // 不能在这里dispatch，否则会死循环
    }
  }, [jwt]);

  const changeLanguage = (e) => {
    dispatch({
      type: "changeLanguage",
      payload: e.key,
    });
  };

  return (
    <div className={styles["app-header"]}>
      <div className={styles["top-header"]}>
        <div className={styles.inner}>
          <Typography.Text>{t("header.slogan")}</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu onClick={changeLanguage}>
                {languageList.map((i) => (
                  <Menu.Item key={i.code}>{i.name}</Menu.Item>
                ))}
              </Menu>
            }
            icon={<GlobalOutlined />}
          >
            {currentLanguage === "zh" ? "中文" : "English"}
          </Dropdown.Button>

          {jwt === null ? (
            <Button.Group className={styles["button-group"]}>
              <Button onClick={() => router.push("/register")}>
                {t("header.register")}
              </Button>
              <Button onClick={() => router.push("/login")}>{t("header.signin")}</Button>
            </Button.Group>
          ) : (
            <Button.Group className={styles["button-group"]}>
              <span>
                {t("header.welcome")}
                <Typography.Text
                  strong
                  style={{
                    marginLeft: 3,
                  }}
                >
                  {username}
                </Typography.Text>
              </span>
              <Button
                onClick={() => router.push("/shoppingCart")}
                style={{
                  marginLeft: 10,
                }}
                loading={false}
              >
                {t("header.shoppingCart")}({shoppingCartProductList.length})
              </Button>
              <Button onClick={() => dispatch(loginSlice.actions.logout())}>
                {t("header.signOut")}
              </Button>
            </Button.Group>
          )}
        </div>
      </div>
      <Layout.Header className={styles["main-header"]}>
        <span className={styles["title-wrapper"]} onClick={() => router.push("/")}>
          <img src="/assets/logo.svg" alt="logo" className={styles["App-logo"]} />
          <Typography.Title level={3} className={styles.title}>
            {t("header.title")}
          </Typography.Title>
        </span>
        <Input.Search
          className={styles["search-input"]}
          placeholder={"请输入旅游目的地、主题、或关键字"}
          onSearch={(keyword) =>
            router.push(`/searchProduct?keyword=${keyword}`, `/searchProduct/${keyword}`)
          }
        />
      </Layout.Header>
      <Menu mode={"horizontal"} className={styles["main-menu"]}>
        <Menu.Item key="1">{t("header.home_page")}</Menu.Item>
        <Menu.Item key="2">{t("header.weekend")}</Menu.Item>
        <Menu.Item key="3">{t("header.group")}</Menu.Item>
        <Menu.Item key="4"> {t("header.backpack")} </Menu.Item>
        <Menu.Item key="5"> {t("header.private")} </Menu.Item>
        <Menu.Item key="6"> {t("header.cruise")} </Menu.Item>
        <Menu.Item key="7"> {t("header.hotel")} </Menu.Item>
        <Menu.Item key="8"> {t("header.local")} </Menu.Item>
        <Menu.Item key="9"> {t("header.theme")} </Menu.Item>
        <Menu.Item key="10"> {t("header.custom")} </Menu.Item>
        <Menu.Item key="11"> {t("header.study")} </Menu.Item>
        <Menu.Item key="12"> {t("header.visa")} </Menu.Item>
        <Menu.Item key="13"> {t("header.enterprise")} </Menu.Item>
        <Menu.Item key="14"> {t("header.high_end")} </Menu.Item>
        <Menu.Item key="15"> {t("header.outdoor")} </Menu.Item>
        <Menu.Item key="16"> {t("header.insurance")} </Menu.Item>
      </Menu>
    </div>
  );
};
