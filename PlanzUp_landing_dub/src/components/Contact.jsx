import React from 'react';
import { Form, Input, Button } from 'antd';

const Contact = () => (
  <div className="contact" style={{ padding: '50px 0', textAlign: 'center' }}>
    <h2>Свяжитесь с нами</h2>
    <Form layout="vertical" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Form.Item label="Имя" name="name" rules={[{ required: true, message: 'Пожалуйста, введите ваше имя' }]}>
        <Input placeholder="Ваше имя" />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Пожалуйста, введите ваш email' }]}>
        <Input placeholder="Ваш email" />
      </Form.Item>
      <Form.Item label="Сообщение" name="message" rules={[{ required: true, message: 'Пожалуйста, введите ваше сообщение' }]}>
        <Input.TextArea rows={4} placeholder="Ваше сообщение" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Отправить</Button>
      </Form.Item>
    </Form>
    <div style={{ marginTop: '16px' }}>
      <p>Телефон: +7 (123) 456-78-90</p>
      <p>Email: support@planzup.com</p>
      <p>Адрес: ул. Примерная, д. 1, Москва, Россия</p>
    </div>
  </div>
);

export default Contact;
