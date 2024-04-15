import './BentoboxMenu.css'
import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'; // Импортирование иконки

const BentoboxMenu = () => {
  return (
    <div className="beauty-panel">
      <div className="favorite-item">
        <img src="favorite-cover.jpg" alt="Favorite" />
        Избранное
      </div>
      <div className="my-appointments">
        <img src="appointments-cover.jpg" alt="Appointments" />
        Мои записи
      </div>
      <div className="featured-articles">
        <img src="articles-cover.jpg" alt="Featured Articles" />
        Статьи от наших мастеров
      </div>
      <div className="masters-map">
        <img src="map-cover.jpg" alt="Masters Map" />
        Мастера на карте
      </div>
      <div className="new-appointment">
    
         Новая запись
      </div>
      <div className="theme-toggle">
        Переключатель темы
      </div>
    </div>
  );
}
// <FontAwesomeIcon icon={faCalendarPlus} size="2x" /> {/* Использование иконки Font Awesome */}

export default BentoboxMenu;