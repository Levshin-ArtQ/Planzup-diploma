import React from 'react';
import { Card, Rate } from 'antd';
import './MasterInfo.css';

const MasterInfo = ({ master }) => {
  return (
    <Card className="master-info-card">
      <h2>{master.firstName} {master.lastName}</h2>
      <p>Рейтинг: <Rate disabled defaultValue={master.rating} /></p>
      <p>Специальность: {master.occupation}</p>
      <p>Количество услуг: {master.service_count}</p>
    </Card>
  );
};

export default MasterInfo;
