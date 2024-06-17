import React from 'react';
import { Row, Col } from 'antd';
import CustomCard from './CustomCard';

const UpcomingAppointments = ({ appointments }) => (
  <Row gutter={[16, 16]}>
    {appointments.map(appointment => (
      <Col xs={24} sm={12} md={8} lg={6} key={appointment.date}>
        <CustomCard
          title={`Запись на ${appointment.date}`}
          subtitle={`Мастер: ${appointment.master}`}
          description={`Услуга: ${appointment.service}`}
          image="https://via.placeholder.com/150"
          onClick={() => alert(`Вы выбрали запись на ${appointment.date}`)}
        />
      </Col>
    ))}
  </Row>
);

export default UpcomingAppointments;
