// import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Fade from 'react-reveal/Fade';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="py-100 bg-dark text-white text-center fade-in">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} md={12}>
            <Fade bottom>
            <h1>{t('hero.title')}🗓️✨</h1>
            <h4 className="mt-4">{t('hero.description')}</h4>
            <Button variant="primary" size="lg" className="mt-4">
              {t('hero.button')}
            </Button>
            </Fade>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
