import React from 'react';
import { Row, Col } from 'antd';

const Support = () => (
  <div className="support" style={{ padding: '50px 0' }}>
    <h2 style={{ textAlign: 'center' }}>Данные в надежных руках</h2>
    <Row gutter={16} style={{ marginTop: '16px' }}>
      <Col span={12}>
        <p>PlanzUp обеспечивает круглосуточную поддержку и высокую защиту данных. Специалисты всегда готовы помочь с любыми вопросами и обеспечить бесперебойную работу платформы.</p>
      </Col>
      <Col span={12}>
        <img src="https://via.placeholder.com/600" alt="Support" style={{ width: '100%', borderRadius: '8px' }} />
      </Col>
    </Row>
  </div>
);

export default Support;
