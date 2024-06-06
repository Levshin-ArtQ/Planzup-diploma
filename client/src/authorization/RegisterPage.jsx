import { React, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Tabs, message } from "antd";
import "./LoginPage.css";
import AuthService from "../services/auth.service";
import WebApp from "@twa-dev/sdk";
const RegisterPage = () => {
  const navigate = useNavigate();
  const { previous } = useParams();
  const [message, setMessage] = useState("");
  // const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values, userType) => {
    userType = userType === "клиент" ? "client" : userType === "мастер" ? "master" : "manager";
    console.log("Received values of form: ", values);
    AuthService.register(values.username, values.email, values.password, userType).then(
      () => {
        AuthService.login(values.username, values.password);
        previous ? navigate(previous) : navigate("/login");
        // messageApi.open({
        //   type: "success",
        //   content: "Регистрация прошла успешно!",
        // });
        console.log("Пользователь авторизован успешно");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
        setMessage(resMessage);
      }
    );
  };
  return (
    <div className="login_wrapper">
      
    <h1>Зарегистрироваться </h1>
    <Tabs 
      defaultActiveKey="клиент"
      type="card"
      items={['клиент', 'мастер', 'менеджер'].map((key, userType) => {
        const id = key;
        return {
          label: `Как ${id}`,
          key: id,
          children: (
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={(event) => onFinish(event, id)}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Как к вам обращаться?",
                  // type: 'email',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Ваше имя"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите вашу почту!",
                  type: "email",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Ваша почта"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите ваш пароль!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
    
            <Form.Item style={{ marginLeft: "auto" }}>
              <Button
                style={{ marginRight: "4px" }}
                size="large"
                zoom={2}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Зарегистрироваться
              </Button>
              или <Link to="/login">Войти</Link>
            </Form.Item>
    
            <div>{message}</div>
          </Form>
          )
        }
      })}></Tabs>
      
    </div>
  );
};
export default RegisterPage;
