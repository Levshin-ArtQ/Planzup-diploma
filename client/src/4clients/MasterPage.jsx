import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Button, Modal, List } from 'antd';
import MasterInfo from './components/MasterInfo';
import MasterServices from './components/MasterServices';
import MasterSchedule from './components/MasterSchedule';

const { Title } = Typography;

const MasterPage = () => {
  const [master, setMaster] = useState({});
  const [services, setServices] = useState([]);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Загрузка данных с сервера
    const fetchedMaster = {
      firstName: "Иван",
      lastName: "Иванов",
      rating: 4.5,
      occupation: "Парикмахер",
      service_count: 10,
    };

    const fetchedServices = [
      { name: "Стрижка", price: 1000, duration: 60 },
      { name: "Окрашивание", price: 2000, duration: 120 }
    ];

    const fetchedSchedule = [
      { start: "2024-06-20T09:00:00", end: "2024-06-20T10:00:00", type: "available" },
      { start: "2024-06-20T10:00:00", end: "2024-06-20T11:00:00", type: "busy" },
      { start: "2024-06-21T09:00:00", end: "2024-06-21T10:00:00", type: "available" },
      { start: "2024-06-21T10:00:00", end: "2024-06-21T11:00:00", type: "busy" },
      { start: "2024-06-22T09:00:00", end: "2024-06-22T10:00:00", type: "available" },
      { start: "2024-06-22T10:00:00", end: "2024-06-22T11:00:00", type: "busy" },
      { start: "2024-06-23T09:00:00", end: "2024-06-23T10:00:00", type: "available" },
      { start: "2024-06-23T10:00:00", end: "2024-06-23T11:00:00", type: "busy" },
      { start: "2024-06-24T09:00:00", end: "2024-06-24T10:00:00", type: "available" },
      { start: "2024-06-24T10:00:00", end: "2024-06-24T11:00:00", type: "busy" },
    ];

    setMaster(fetchedMaster);
    setServices(fetchedServices);
    setSchedule(fetchedSchedule);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={2} style={{ textAlign: 'center' }}>Мастер: {master.firstName} {master.lastName}</Title>
        </Col>

        <Col span={24}>
          <MasterInfo master={master} />
        </Col>

        <Col span={24}>
          <Title level={3} style={{ textAlign: 'center' }}>Услуги</Title>
          <MasterServices services={services} />
        </Col>

        <Col span={24}>
          <Title level={3} style={{ textAlign: 'center' }}>Расписание</Title>
          <MasterSchedule schedule={schedule} />
        </Col>
      </Row>
    </div>
  );
};

export default MasterPage;
