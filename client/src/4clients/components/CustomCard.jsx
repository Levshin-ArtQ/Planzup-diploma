import React from 'react';
import { Card } from 'antd';
import './CustomCard.css';

const CustomCard = ({ title, subtitle, description, image, onClick }) => (
  <div className="custom-card" onClick={onClick}>
    <div className="custom-card-image" style={{ backgroundImage: `url(${image})` }}></div>
    <div className="custom-card-content">
      <h3 className="custom-card-title">{title}</h3>
      <h4 className="custom-card-subtitle">{subtitle}</h4>
      <p className="custom-card-description">{description}</p>
    </div>
  </div>
);

export default CustomCard;
