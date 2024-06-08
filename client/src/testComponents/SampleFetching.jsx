import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useApi from '../hooks/useApi';
import axios from 'axios';
import PrettyJson from '../devutils/PrettyJson';
import PushNotificationButton from './PushNotificationButton';
import useFromAPI from '../hooks/fromAPI';

const SampleFetching = () => {
  const { data, error, loading, fetchData, contextHolder } = useFromAPI(); 
  const [answer, setAnswer ] = useState();
  const [request , setRequest] = useState();
  const [requestType , setRequestType] = useState();

  const getSample = async (key) => {
    try {
      const res = await axios.get(`/api/${key}`, {method: requestType});
      if (res.status === 200) {
        setAnswer(res.data);
      }
    } catch (err) {
      setAnswer(err);
    }
  };

  useEffect(() => {
    // Загрузка данных
    fetchData(`${request}`, {method: "get"});
  }, [request]);
  return (
    <div>
      <PushNotificationButton style={{width:'100px', height:'30px'}}/>
      {contextHolder}
      <input type="text" onChange={(e) => setRequest(e.target.value)}/>
      http query type options <br />
      <select onChange={(e) => setRequestType(e.target.value)}>
        <option value="get">get</option>
        <option value="post">post</option>
        <option value="put">put</option>
      </select>
      <h2>axios answer</h2>
      <PrettyJson json={answer} />
      <button onClick={() => getSample(request)}>Get Sample</button>
      <h2>useapi answer</h2>
      {loading ? <div>loading</div> : <div>{error ? <PrettyJson json={error} /> : <PrettyJson json={data} />}</div>}
      

    </div>
  );
};

SampleFetching.propTypes = {};

export default SampleFetching;