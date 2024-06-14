import React, { useState } from 'react';
import { Form, DatePicker, Button } from 'antd';
// import 'antd/dist/reset.css';  // Импорт CSS стилей Ant Design

const DatePickerExample = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Selected Date:', values.date.format('YYYY-MM-DD'));
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="date"
        label="Выберите дату"
        rules={[{ required: true, message: 'Пожалуйста, выберите дату' }]}
      >
        <DatePicker showTime/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DatePickerExample;
