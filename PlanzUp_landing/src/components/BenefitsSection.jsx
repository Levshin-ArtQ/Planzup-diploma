// import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const BenefitsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="benefits" className="py-5 bg-light fade-in">
      <Container>
        <Row className="text-center-mobile">
          <Col>
            <h2 className="text-center">{t('benefits.title')}</h2>
            <p>{t('benefits.description')}</p>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h3>{t('benefits.benefit1.title')}</h3>
            <p>{t('benefits.benefit1.description')}</p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h3>{t('benefits.benefit2.title')}</h3>
            <p>{t('benefits.benefit2.description')}</p>
          </Col>
          <Col md={4}>
            <h3>{t('benefits.benefit3.title')}</h3>
            <p>{t('benefits.benefit3.description')}</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BenefitsSection;
