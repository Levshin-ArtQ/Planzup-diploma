
import React from 'react';
import { Row, Col } from 'antd';
import CustomCard from './CustomCard';

const MasterCards = ({ masters }) => (
  <Row gutter={[16, 16]}>
    {masters.map(master => (
      <Col xs={24} sm={12} md={8} lg={6} key={master.UID}>
        <CustomCard
          title={`${master.firstName} ${master.lastName}`}
          subtitle={`Рейтинг: ${master.rating}`}
          description={`Услуги: ${master.services.join(', ')}`}
          image="https://via.placeholder.com/150"
          onClick={() => alert(`Вы выбрали мастера ${master.firstName}`)}
        />
      </Col>
    ))}
  </Row>
);

export default MasterCards;
