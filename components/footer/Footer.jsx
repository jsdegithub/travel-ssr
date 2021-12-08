import { Layout, Typography } from "antd";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      <Typography.Title level={3}>{t("footer.detail")}</Typography.Title>
    </Layout.Footer>
  );
};
