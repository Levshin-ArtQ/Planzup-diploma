// import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import MarketSizeChart from './MarketSizeChart';
import ClientPreferencesChart from './ClientPreferencesChart';

const StatisticsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="statistics" className="py-5 bg-light">
      <Container>
        <Row>
          <Col>
            <h2 className="text-center">{t('statistics.title')}</h2>
            <p>{t('statistics.description')}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <MarketSizeChart />
          </Col>
          <Col md={6}>
            <ClientPreferencesChart />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default StatisticsSection;
