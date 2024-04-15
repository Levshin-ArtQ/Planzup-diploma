import { React, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import './LoginPage.css'
import AuthService from '../services/auth.service';
import WebApp from '@twa-dev/sdk';
const RegisterPage = () => {
  const navigate = useNavigate();
  const { previous } = useParams();
  const [message, setMessage] = useState('');
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    AuthService.login(values.username, values.password).then(
      () => { 
        previous ? navigate(previous) : navigate('/');
        console.log('Пользователь авторизован успешно')
      },
      error => {
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
    <div className='login_wrapper'>
      <div>{WebApp?.initData}</div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="nickname"
          rules={[
            {
              required: true,
              message: 'Как к вам обращаться?',
              // type: 'email',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Ваше имя" />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
              type: 'email',
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Ваше имя" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
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
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item> 

        <div>{message}</div>
      </Form>
    </div>
  );
};
export default RegisterPage; 