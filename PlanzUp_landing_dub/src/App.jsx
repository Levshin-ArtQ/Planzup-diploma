// import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Navbar, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Advantages from './components/Advantages';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Integrations from './components/Integrations';
import Contact from './components/Contact';
import Support from './components/Support';
// import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="/">PlanzUp</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Menu mode="horizontal" theme="light" defaultSelectedKeys={['home']}>
                  <Menu.Item key="home"><Link to="/">Главная</Link></Menu.Item>
                  <Menu.Item key="about"><Link to="/about">О продукте</Link></Menu.Item>
                  <Menu.Item key="advantages"><Link to="/advantages">Преимущества</Link></Menu.Item>
                  <Menu.Item key="features"><Link to="/features">Функции</Link></Menu.Item>
                  <Menu.Item key="testimonials"><Link to="/testimonials">Отзывы</Link></Menu.Item>
                  <Menu.Item key="integrations"><Link to="/integrations">Интеграции</Link></Menu.Item>
                  <Menu.Item key="contact"><Link to="/contact">Контакты</Link></Menu.Item>
                  <Menu.Item key="support"><Link to="/support">Поддержка</Link></Menu.Item>
                </Menu>
              </Navbar.Collapse>
              <Button type="primary">Записаться</Button>
            </Container>
          </Navbar>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: '16px' }}>
          <Routes>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/advantages" component={Advantages} />
            <Route path="/features" component={Features} />
            <Route path="/testimonials" component={Testimonials} />
            <Route path="/integrations" component={Integrations} />
            <Route path="/contact" component={Contact} />
            <Route path="/support" component={Support} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>PlanzUp ©2023</Footer>
      </Layout>
    </Router>
  );
}

export default App;
