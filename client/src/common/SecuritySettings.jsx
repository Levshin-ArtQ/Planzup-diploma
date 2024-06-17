import React from 'react';
import { Form, Input, Button } from 'antd';

const SecuritySettings = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values from form: ', values);
    // Обработайте отправку данных
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="current_password"
        label="Текущий пароль"
        rules={[{ required: true, message: 'Пожалуйста, введите ваш текущий пароль' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="new_password"
        label="Новый пароль"
        rules={[{ required: true, message: 'Пожалуйста, введите новый пароль' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm_password"
        label="Подтвердите новый пароль"
        rules={[
          { required: true, message: 'Пожалуйста, подтвердите ваш новый пароль' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('new_password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Изменить пароль
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SecuritySettings;
