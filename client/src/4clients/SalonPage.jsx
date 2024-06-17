import React, { useEffect, useState } from 'react';
import { Row, Col, Typography } from 'antd';
import CarouselImages from './components/CarouselImages';
import SalonInfo from './components/SalonInfo';
import UpcomingAppointments from './components/UpcomingAppointments';
import PriceList from './components/PriceList';
import MasterCards from './components/MasterCards';

const { Title } = Typography;

const SalonPage = () => {
  const [salon, setSalon] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [masters, setMasters] = useState([]);

  useEffect(() => {
    // Загрузка данных с сервера
    const fetchedSalon = {
      name: "Салон красоты",
      slogan: "Лучший салон в городе",
      description: "Описание салона...",
      address: "ул. Примерная, 1",
      phone: "+7 123 456 7890",
      email: "info@salon.com",
      website: "https://salon.com",
      images: [
        "https://via.placeholder.com/800x400",
        "https://via.placeholder.com/800x400",
        "https://via.placeholder.com/800x400"
      ]
    };

    const fetchedAppointments = [
      { date: "2024-06-20", master: "Иван Иванов", service: "Стрижка" },
      { date: "2024-06-21", master: "Петр Петров", service: "Маникюр" }
    ];

    const fetchedServices = [
      { name: "Стрижка", price: 1000, duration: 60 },
      { name: "Маникюр", price: 500, duration: 30 }
    ];

    const fetchedMasters = [
      { firstName: "Иван", lastName: "Иванов", rating: 4.5, services: ["Стрижка"] },
      { firstName: "Петр", lastName: "Петров", rating: 4.7, services: ["Маникюр"] }
    ];

    setSalon(fetchedSalon);
    setAppointments(fetchedAppointments);
    setServices(fetchedServices);
    setMasters(fetchedMasters);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <CarouselImages images={salon.images || []} />

      <div style={{ marginBottom: '40px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>О салоне</Title>
        <SalonInfo salon={salon} />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Ближайшие записи</Title>
        <UpcomingAppointments appointments={appointments} />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Прайс-лист</Title>
        <PriceList services={services} />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Наши мастера</Title>
        <MasterCards masters={masters} />
      </div>
    </div>
  );
};

export default SalonPage;
