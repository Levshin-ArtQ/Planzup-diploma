import React, { useState, useEffect } from 'react';
// import useCloudStorage from '../hooks/useCloudStorage';
import useCloudStorage from '../../hooks/useCloudStorage';

const Experimental = () => {
    const fetchData = async () => {
        const res = await fetch("http://localhost:4000/");
        console.log("res" + res);
      };
    
      useEffect(() => {
        fetchData();
      }, []);
    const { setItem, getItem } = useCloudStorage();
    const [answer, setAnswer] = useState('undefined')
    const setSign = () => {
        setItem('PlanzUpSign', 17);
    }
    const getSign = () => {
        setAnswer(getItem('PlanzUpSign'));
    }
    
    return (
        <div>
            <div className="answer">res</div> 
            <button className="save_item" onClick={setSign}>save sign</button>
            <button className="save_item" onClick={getSign}>get sign</button>
            <div className="answer">{answer}</div>
            
        </div>
    );
};

export default Experimental;