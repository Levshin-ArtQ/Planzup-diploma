import React from 'react';
import { Row, Col, Card } from 'antd';

const { Meta } = Card;

const features = [
  { title: 'Автоматическая запись', description: 'Сокращает время на администрирование, позволяя сосредоточиться на клиентах.', img: 'https://via.placeholder.com/300' },
  { title: 'Курсы и абонементы', description: 'Создание курсов услуг и продажа абонементов для удержания клиентов.', img: 'https://via.placeholder.com/300' },
  { title: 'Учет предпочтений', description: 'Запоминает временные предпочтения клиентов, предлагая наиболее удобные варианты записи.', img: 'https://via.placeholder.com/300' },
  { title: 'Мини-приложения', description: 'Работа через Telegram и ВКонтакте, общение с клиентами там, где они проводят время.', img: 'https://via.placeholder.com/300' },
];

const Features = () => (
  <div className="features" style={{ padding: '50px 0' }}>
    <h2 style={{ textAlign: 'center' }}>Функции, которые впечатляют</h2>
    <Row gutter={16} style={{ marginTop: '16px' }}>
      {features.map((feature, index) => (
        <Col span={8} key={index}>
          <Card
            hoverable
            cover={<img alt={feature.title} src={feature.img} />}
          >
            <Meta title={feature.title} description={feature.description} />
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default Features;
