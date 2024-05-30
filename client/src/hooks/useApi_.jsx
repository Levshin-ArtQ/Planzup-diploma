import { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from '../services/auth-header';

const useApi_ = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios({
          url: url,
          headers: {
            ...authHeader()['x-access-token'],
          },
          params: {
            userId, // Добавление userId в параметры запроса, если это необходимо
          },
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useApi_;
