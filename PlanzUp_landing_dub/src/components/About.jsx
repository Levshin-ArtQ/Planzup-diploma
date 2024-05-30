import React from 'react';
import { Row, Col } from 'antd';
import aboutImage from '../assets/about.jpg'; // добавьте подходящее изображение в папку assets

const About = () => (
  <div className="about" style={{ padding: '50px 0' }}>
    <h2 style={{ textAlign: 'center' }}>PlanzUp — революция в управлении салоном</h2>
    <Row gutter={16} style={{ marginTop: '16px' }}>
      <Col span={12}>
        <p>PlanzUp упрощает управление бизнесом, предлагая:</p>
        <ul>
          <li>Запись на курсы и абонементы: Позволяет клиентам планировать посещения заранее, создавая удобные абонементы.</li>
          <li>Учет временных предпочтений: Запоминает предпочтения клиентов и предлагает удобные варианты записи.</li>
          <li>Интеграция с мессенджерами: Работает через Telegram и ВКонтакте, поддерживая контакт с клиентами в привычных для них каналах.</li>
          <li>Автоматическое расписание: Легко создавать и управлять расписанием мастеров, указывая только основные предпочтения и цели.</li>
        </ul>
      </Col>
      <Col span={12}>
        <img src={aboutImage} alt="About Us" style={{ width: '100%', borderRadius: '8px' }} />
      </Col>
    </Row>
  </div>
);

export default About;
