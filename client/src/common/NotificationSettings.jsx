import React from 'react';
import { Form, Checkbox, Button } from 'antd';

const NotificationSettings = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values from form: ', values);
    // Обработайте отправку данных
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="prefers_email" valuePropName="checked">
        <Checkbox>Получать уведомления по Email</Checkbox>
      </Form.Item>
      <Form.Item name="prefers_telegram" valuePropName="checked">
        <Checkbox>Получать уведомления в Telegram</Checkbox>
      </Form.Item>
      <Form.Item name="prefers_push" valuePropName="checked">
        <Checkbox>Получать push-уведомления</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить изменения
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NotificationSettings;
