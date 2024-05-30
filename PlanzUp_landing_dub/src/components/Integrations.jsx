import React from 'react';
import { Row, Col } from 'antd';

const Integrations = () => (
  <div className="integrations" style={{ padding: '50px 0' }}>
    <h2 style={{ textAlign: 'center' }}>Оставайтесь на связи с клиентами — Telegram, ВКонтакте и PWA</h2>
    <Row gutter={16} style={{ marginTop: '16px' }}>
      <Col span={12}>
        <p>PlanzUp интегрируется с популярными мессенджерами, такими как Telegram и ВКонтакте, поддерживая контакт с клиентами в удобных для них каналах. Работает как PWA (Progressive Web App), поэтому PlanzUp можно пользоваться в браузере как сайтом-приложением или установить PlanzUp на главный экран смартфона или компьютера.</p>
      </Col>
      <Col span={12}>
        <img src="https://via.placeholder.com/600" alt="Integrations" style={{ width: '100%', borderRadius: '8px' }} />
      </Col>
    </Row>
  </div>
);

export default Integrations;
