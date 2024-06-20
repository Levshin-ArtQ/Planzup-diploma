import React from "react";
import { Form, Input, Button } from "antd";

const GeneralSettings = (settings) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values from form: ", values);

    // Обработайте отправку данных
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Имя"
        initialValue={settings?.data?.name}
        // rules={[{ required: true, message: 'Пожалуйста, введите ваше имя' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="username"
        label="Логин"
        initialValue={settings?.data?.username}
        rules={[
          {
            length: 5,
            message: "Новое логин должен содержать не менее пяти символов",
          },
        ]}
        // rules={[{ required: true, message: 'Пожалуйста, введите ваш логин' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        initialValue={settings?.data?.email}
        rules={[{ type: "email", message: "Некорректный email" }]}
        // rules={[{ required: true, message: 'Пожалуйста, введите ваш email' }]}
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
