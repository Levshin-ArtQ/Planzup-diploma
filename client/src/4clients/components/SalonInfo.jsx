import React from 'react';
import { Card } from 'antd';

const SalonInfo = ({ salon }) => (
  <Card title={salon.name} bordered={false}>
    <p>{salon.slogan}</p>
    <p>{salon.description}</p>
    <p>Адрес: {salon.address}</p>
    <p>Телефон: {salon.phone}</p>
    <p>Email: {salon.email}</p>
    <p>Веб-сайт: <a href={salon.website}>{salon.website}</a></p>
  </Card>
);

export default SalonInfo;
