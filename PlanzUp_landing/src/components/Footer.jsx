// import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-left">
            <p>&copy; 2024 PlanzUp. {t('footer.rights')}</p>
          </Col>
          <Col md={6} className="text-center text-md-right">
            <p>{t('footer.followUs')}</p>
            <a href="https://facebook.com" className="text-white mr-2">
              Facebook
            </a>
            <a href="https://twitter.com" className="text-white mr-2">
              Twitter
            </a>
            <a href="https://instagram.com" className="text-white">
              Instagram
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
