import React, { useState } from 'react';
import { Card, Button, Modal, Form, Input, Tag, Select } from 'antd';

const { Meta } = Card;
const { Option } = Select;

const ClientCard = ({ client, onUpdate }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      onUpdate({ ...client, ...values });
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getColorForStatus = (status) => {
    switch (status) {
      case 'VIP':
        return 'gold';
      case 'regular':
        return 'blue';
      case 'new':
        return 'green';
      case 'banned':
        return 'red';
      case 'deleted':
        return 'gray';
      default:
        return 'blue';
    }
  };

  return (
    <>
      <Card
        style={{ width: 300, margin: '10px', borderColor: getColorForStatus(client.status) }}
        actions={[
          <Button type="primary" onClick={showModal}>
            Редактировать
          </Button>,
        ]}
      >
        <Meta
          title={`${client.firstName} ${client.lastName}`}
          description={client.description}
        />
        <div style={{ marginTop: '10px' }}>
          <Tag color={getColorForStatus(client.status)}>{client.status}</Tag>
          <div>Баллы лояльности: {client.loyaltyPoints}</div>
          <div>Email: {client.email}</div>
          <div>Телефон: {client.phone}</div>
          <div>Предпочтения: {client.preferences.join(', ')}</div>
        </div>
      </Card>
      <Modal title="Редактировать клиента" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" initialValues={client}>
          <Form.Item name="firstName" label="Имя" rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Фамилия">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Описание">
            <Input />
          </Form.Item>
          <Form.Item name="preferences" label="Предпочтения">
            <Select mode="tags" style={{ width: '100%' }}>
              <Option value="Preference1">Preference1</Option>
              <Option value="Preference2">Preference2</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ClientCard;
