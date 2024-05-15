import React, { useEffect } from 'react';
import useApi from '../../hooks/useApi';
import axios from 'axios';


const BookingMonth = () => {
  const { data, error, loading, fetchData } = useApi();
  const { data: data2, error: error2, loading: loading2, fetchData: fetchData2 } = useApi();

  const [reservations, setReservations] = React.useState([]);

  useEffect(() => {
    // Загрузка данных
    fetchData(`/api/messages`);
    fetchData2(`/api/messages`);
  }, []);

  return (
    <div>
      
    </div>
  );
};

BookingMonth.propTypes = {};

export default BookingMonth;