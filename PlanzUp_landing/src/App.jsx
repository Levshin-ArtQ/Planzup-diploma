import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import BenefitsSection from './components/BenefitsSection';
import StatisticsSection from './components/StatisticsSection';
import PricingSection from './components/PricingSection';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const { t } = useTranslation();

  const handleLanguageChange = (language) => {
    i18next.changeLanguage(language);
  };

  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand href="#home">PlanzUp</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="#home">{t('navbar.home')}</Nav.Link>
                <Nav.Link href="#features">{t('navbar.features')}</Nav.Link>
                <Nav.Link href="#benefits">{t('navbar.benefits')}</Nav.Link>
                <Nav.Link href="#statistics">{t('navbar.statistics')}</Nav.Link>
                <Nav.Link href="#pricing">{t('navbar.pricing')}</Nav.Link>
                <Nav.Link href="#team">{t('navbar.team')}</Nav.Link>
                <NavDropdown title={t('navbar.language')} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => handleLanguageChange('en')}>English</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLanguageChange('ru')}>Русский</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <StatisticsSection />
        <PricingSection />
        <TeamSection />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
