import React from 'react';
import { Row, Col } from 'antd';
import CustomCard from './CustomCard';

const PriceList = ({ services }) => (
  <Row gutter={[16, 16]}>
    {services.map(service => (
      <Col xs={24} sm={12} md={8} lg={6} key={service.UID}>
        <CustomCard
          title={service.name}
          subtitle={`Цена: ${service.price} руб.`}
          description={`Продолжительность: ${service.duration} мин.`}
          image="https://via.placeholder.com/150"
          onClick={() => alert(`Вы выбрали услугу ${service.name}`)}
        />
      </Col>
    ))}
  </Row>
);

export default PriceList;
