import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./LoginForm.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSlice } from "../../redux/reducer/login/slice";
import { useEffect } from "react";
import router from "next/router";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.login.loading);
  const jwt = useSelector((state) => state.login.jwt);

  useEffect(() => {
    if (jwt !== null) {
      router.push("/");
    }
  }, [jwt]);

  const onFinish = async (values) => {
    dispatch(loginSlice.actions.loginStart());
    try {
      const { data } = await axios.post("http://123.56.149.216:8080/auth/login", {
        email: values.username,
        password: values.password,
      });
      dispatch(loginSlice.actions.loginSuccess(data.token));
      message.info("登陆成功");
    } catch (e) {
      dispatch(loginSlice.actions.loginFailed(e.message));
      message.info(`登陆失败：${e.message}`);
    }
  };

  return (
    <Form
      name="normal_login"
      className={styles["login-form"]}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};
