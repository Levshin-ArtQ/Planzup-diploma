import React, { useEffect, useState } from 'react';
import { Row, Col, Typography } from 'antd';
import CarouselImages from './components/CarouselImages';
import SalonInfo from './components/SalonInfo';
import UpcomingAppointments from './components/UpcomingAppointments';
import PriceList from './components/PriceList';
import MasterCards from './components/MasterCards';
import useApi from '../hooks/useApi';

const { Title } = Typography;

const SalonPage = (salonUID) => {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [masters, setMasters] = useState([]);
  const {
    data: fetchedSalon,
    error: errorSalon,
    loading: loadingSalon,
    fetchData: fetchSalon,
  } = useApi();

  useEffect(() => {
    fetchSalon('/api/test/salon/' + salonUID);
  }, [fetchSalon, salonUID]);

  useEffect(() => {
    // Загрузка данных с сервера
    setAppointments(fetchedSalon.masters.appointments);
    setServices(fetchedSalon.services);
    setMasters(fetchedSalon.masters);
  }, [fetchedSalon]);

  return (
    <div style={{ padding: '20px' }}>
      <CarouselImages images={fetchedSalon.images || []} />

      <div style={{ marginBottom: '40px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>О салоне</Title>
        <SalonInfo salon={fetchedSalon} />
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
