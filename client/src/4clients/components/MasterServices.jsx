import React from 'react';
import { List, Card, Button } from 'antd';
import './MasterServices.css';

const MasterServices = ({ services }) => {
  return (
    <List
      grid={{ gutter: 16, column: 2 }}
      dataSource={services}
      renderItem={service => (
        <List.Item>
          <Card title={service.name}>
            <p>Цена: {service.price} руб.</p>
            <p>Длительность: {service.duration} мин.</p>
            <Button className="book-button">Записаться</Button>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default MasterServices;
