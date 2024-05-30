// import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-5 fade-in">
      <Container>
        <Row className="text-center-mobile">
          <Col>
            <h2 className="text-center mb-4">{t('features.title')}</h2>
            <p>{t('features.description')}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={3} className="d-flex flex-column mb-4 mb-md-0">
            <h3>{t('features.feature1.title')}</h3>
            <p>{t('features.feature1.description')}</p>
            <Button variant="primary" size="md" className="mt-auto">
              {t('features.feature1.button')}
            </Button>
          </Col>
          <Col xs={6} md={3} className="d-flex flex-column mb-4 mb-md-0">
            <h3>{t('features.feature2.title')}</h3>
            <p>{t('features.feature2.description')}</p>
            <Button variant="primary" size="md" className="mt-auto">
              {t('features.feature2.button')}
            </Button>
          </Col>
          <Col xs={6} md={3} className="d-flex flex-column mb-4 mb-md-0">
            <h3>{t('features.feature3.title')}</h3>
            <p>{t('features.feature3.description')}</p>
            <Button variant="primary" size="md" className="mt-auto">
              {t('features.feature3.button')}
            </Button>
          </Col>
          <Col xs={6} md={3} className="d-flex flex-column mb-4 mb-md-0">
            <h3>{t('features.feature4.title')}</h3>
            <p>{t('features.feature4.description')}</p>
            <Button variant="primary" size="md" className="mt-auto">
              {t('features.feature4.button')}
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesSection;

