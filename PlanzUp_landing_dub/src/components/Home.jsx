import React from 'react';
import { Button, Row, Col } from 'antd';
import heroImage from '../assets/hero.jpg'; // добавьте подходящее изображение в папку assets

const Home = () => (
  <div className="home">
    <Row align="middle" style={{ minHeight: '100vh', textAlign: 'center' }}>
      <Col span={12}>
        <h1>PlanzUp — ваш цифровой ассистент в сфере красоты</h1>
        <h3>Автоматизируйте запись клиентов и выведите бизнес на новый уровень</h3>
        <p>PlanzUp — инновационная платформа для онлайн-записи в салонах красоты. Упрощает процесс записи, повышает клиентскую лояльность и увеличивает доходы. PlanzUp — ключ к успешному и современному бизнесу.</p>
        <Button type="primary" size="large">Зарегистрируйтесь бесплатно</Button>
      </Col>
      <Col span={12}>
        <img src={heroImage} alt="Beauty Service" style={{ width: '100%', borderRadius: '8px' }} />
      </Col>
    </Row>
  </div>
);

export default Home;