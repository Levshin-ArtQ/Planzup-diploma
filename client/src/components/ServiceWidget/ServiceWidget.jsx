import React from 'react';
import './ServiceWidget.css';
import { Link } from 'react-router-dom';

const ServiceWidget = ({ object }) => {
  const { title, cost, duration, closest } = object;
  return (
    <div className="widget service_widget">
      <div className="section section1">
        <img src="" alt="" className="service_icon" />
      </div>
      <div className="section section2">
        <div className="about_service">
          <span className="service_title">{title}</span>
          <span className="cost">{cost}₽</span>
        </div>
        <div className="closest">
          ближайший сеанс: <a href="/booking">{closest}</a>
        </div>
        <div className="time">
          <div className="duration">{duration} мин</div>
          <Link to="/booking" className="book_button nav-link">Записаться</Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceWidget;
