import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const PricingSection = () => {
  const { t } = useTranslation();

  const plans = [
    {
      title: t('pricing.basicPlan.title'),
      price: '500 ₽',
      features: [
        t('pricing.basicPlan.feature1'),
        t('pricing.basicPlan.feature2'),
        t('pricing.basicPlan.feature3'),
      ],
    },
    {
      title: t('pricing.standardPlan.title'),
      price: '1000 ₽',
      features: [
        t('pricing.standardPlan.feature1'),
        t('pricing.standardPlan.feature2'),
        t('pricing.standardPlan.feature3'),
        t('pricing.standardPlan.feature4'),
      ],
    },
    {
      title: t('pricing.premiumPlan.title'),
      price: '2000 ₽',
      features: [
        t('pricing.premiumPlan.feature1'),
        t('pricing.premiumPlan.feature2'),
        t('pricing.premiumPlan.feature3'),
        t('pricing.premiumPlan.feature4'),
        t('pricing.premiumPlan.feature5'),
      ],
    },
    {
      title: t('pricing.enterprisePlan.title'),
      price: '5000 ₽',
      features: [
        t('pricing.enterprisePlan.feature1'),
        t('pricing.enterprisePlan.feature2'),
        t('pricing.enterprisePlan.feature3'),
        t('pricing.enterprisePlan.feature4'),
        t('pricing.enterprisePlan.feature5'),
        t('pricing.enterprisePlan.feature6'),
      ],
    },
  ];

  return (
    <section id="pricing" className="py-5">
      <Container>
        <h2 className="text-center mb-5">{t('pricing.title')}</h2>
        <p className="text-center mb-5">{t('pricing.description')}</p>
        <Row className="justify-content-center d-flex">
          {plans.map((plan, index) => (
            <Col md={6} lg={3} key={index} className="mb-4">
              <Card>
                <Card.Header className="text-center">
                  <h4>{plan.title}</h4>
                </Card.Header>
                <Card.Body className="text-center">
                  <h3>{plan.price}</h3>
                  <ul className="list-unstyled">
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  <Button variant="primary">{t('pricing.choosePlan')}</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default PricingSection;
