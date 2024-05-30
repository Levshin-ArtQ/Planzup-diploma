import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './App.css';
import { Button } from 'antd';
import './ErrorPage.css';


const ErrorPage = () => {
  // retreive error type
  const errorType = window.location.pathname.split('/')[1]
   
  return (
    <div className='error-page'>
      <h1 className='error-title'>Что-то пошло не так</h1>
      <h2 className='error-code'>{errorType}</h2>
      if (errorType === 404) <h3>Страница не найдена</h3>
      if (errorType === 403) <h3>У вас нет доступа к этой странице</h3>
      if (errorType === 500) <h3>Сервер не отвечает, мы уже работаем над этой проблемой</h3>

      <Link to="/" className='error-link'>Вернуться на главную страницу</Link>


      
    </div>
  );
};

ErrorPage.propTypes = {};

export default ErrorPage;