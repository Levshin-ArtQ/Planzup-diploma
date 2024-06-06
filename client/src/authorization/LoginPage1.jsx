import { React, useState } from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './LoginPage.css'
import AuthService from '../services/auth.service';
const LoginPage = () => {
  const navigate = useNavigate();
  const { previous } = useParams();
  const [message, setMessage] = useState('');
  // const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    AuthService.login(values.username, values.password).then(
      () => { 
        // messageApi.open({
        //   type: 'success',
        //   content: 'Авторизация прошла успешно!',
        // })
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
      <Form
        name="normal_login"
        className="login-form"
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
              message: 'Введите логин',
              // type: 'email',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Имя пользователя" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Нужно ввести пароль',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>
        {/* 
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/">
            Забыл пароль
          </a>
        </Form.Item>
        */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{marginRight: '4px'}}>
            Войти
          </Button>
          или <Link to="/register">Зарегистрироваться</Link>
        </Form.Item>
        <div style={{color: 'red'}}>{message}</div>
      </Form>
    </div>
  );
};
export default LoginPage; 