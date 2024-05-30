import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import authHeader from '../services/auth-header';
const useApi = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  // limit timeout
  const timeout = 30000;
  

  const fetchData = async (endpoint, options = {}) => {
    
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios({
        ...options,
        url: endpoint,
        headers: {
          ...authHeader()['x-access-token'],
        },
        params: {
          ...options.params,
          userId, // Добавление userId в параметры запроса, если это необходимо
        },
      });
      setData(response.data);
      setError(null);
    } catch (err) {
      setData(null);
      if (err.response?.status === 401 && !error) {
        messageApi.open({
          type: 'error',
          content: 'Сессия истекла. Войдите заново.',
          duration: 10,
          onClose: () => {
            window.location.reload();
          },
        }) 
      }
      if (err.response?.status === 403 && !error) {
        messageApi.open({
          type: 'error',
          content: 'Доступ запрещен.',
          duration: 10,
        }) 
      }
      if (err.response?.status === 500 && !error) {
        messageApi.open({
          type: 'error',
          content: 'Сервер не отвечает. Попробуйте позже.',
          duration: 10,
        }) 
      }
      if (err.response?.status === 404 && !error) {
        messageApi.open({
          type: 'error',
          content: '404', // TODO: test message and set normal status of error
          duration: 10,
        }) 
      }
      setError(err);
    } finally {
      setLoading(false);
    }
    
  };

  return { data, error, loading, fetchData, contextHolder };
};

export default useApi;