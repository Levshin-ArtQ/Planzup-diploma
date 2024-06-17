import React from 'react';
import { Form, Input, Button } from 'antd';

const GeneralSettings = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values from form: ', values);
    // Обработайте отправку данных
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Имя"
        rules={[{ required: true, message: 'Пожалуйста, введите ваше имя' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="username"
        label="Логин"
        rules={[{ required: true, message: 'Пожалуйста, введите ваш логин' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Пожалуйста, введите ваш email' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить изменения
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GeneralSettings;
