import React from "react";
import styles from "./MainLayout.module.css";
import { Header, Footer } from "../../components";

export const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles["page-content"]}>{children}</div>
      <Footer />
    </>
  );
};
